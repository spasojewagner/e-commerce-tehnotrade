import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../app';
import User from '../models/User';
import { Order } from '../models/orders';
import { Product } from '../models/products';

const app = createApp();
let counter = 0;

async function signUp(overrides: Record<string, unknown> = {}) {
  counter += 1;
  const agent = request.agent(app);
  const email = `user${counter}@example.test`;
  const res = await agent.post('/api/auth/register').send({
    email,
    name: 'Test',
    surname: `User${counter}`,
    phone: '+381 60 000 000',
    password: 'secret123',
    gender: 'male',
    terms: true,
    ...overrides,
  });
  expect(res.status).toBe(201);
  const user = await User.findOne({ email });
  return { agent, user: user! };
}

async function signUpAdmin() {
  const { user } = await signUp();
  await User.updateOne({ _id: user._id }, { role: 'admin' });
  const agent = request.agent(app);
  await agent.post('/api/auth/login').send({ email: user.email, password: 'secret123' }).expect(200);
  return { agent, user };
}

function product(overrides: Record<string, unknown> = {}) {
  counter += 1;
  return Product.create({ sku: `SKU-${counter}`, name: `Product ${counter}`, price: 100, stock: 10, brand: 'Acme', ...overrides });
}

const address = { street: 'Glavna 1', city: 'Čačak', postalCode: '32000' };

describe('accounts', () => {
  it('never lets a sign-up choose its own role', async () => {
    const { user } = await signUp({ role: 'admin' });
    expect(user.role).toBe('user');
  });

  it('keeps the user list and the data-repair endpoint for admins', async () => {
    const { agent } = await signUp();
    await agent.get('/api/users').expect(403);
    await request(app).put('/api/admin/fix-images').expect(401);
    await agent.put('/api/admin/fix-images').expect(403);

    const admin = await signUpAdmin();
    await admin.agent.get('/api/users').expect(200);
  });
});

describe('placing an order', () => {
  it('belongs to the signed-in user, uses database prices and takes stock', async () => {
    const { agent, user } = await signUp();
    const other = await signUp();
    const tv = await product({ price: 500, stock: 5 });
    const cable = await product({ price: 20, stock: 10 });

    const res = await agent
      .post('/api/orders')
      .send({
        userId: String(other.user._id), // ignored
        items: [
          { product: String(tv._id), quantity: 2, price: 1 }, // client prices are ignored
          { product: String(cable._id), quantity: 3 },
          { product: String(cable._id), quantity: 1 },
        ],
        shippingAddress: address,
      })
      .expect(201);

    expect(String(res.body.order.user._id)).toBe(String(user._id));
    expect(res.body.order.totalAmount).toBe(2 * 500 + 4 * 20);
    expect((await Product.findById(tv._id))!.stock).toBe(3);
    expect((await Product.findById(cable._id))!.stock).toBe(6);
  });

  it('takes nothing when one line is short', async () => {
    const { agent } = await signUp();
    const plenty = await product({ stock: 10 });
    const scarce = await product({ stock: 1, name: 'Last one' });

    const res = await agent
      .post('/api/orders')
      .send({ items: [{ product: String(plenty._id), quantity: 4 }, { product: String(scarce._id), quantity: 2 }], shippingAddress: address })
      .expect(400);

    expect(res.body.message).toContain('Last one');
    expect((await Product.findById(plenty._id))!.stock).toBe(10);
    expect(await Order.countDocuments()).toBe(0);
  });

  it('sells the last unit only once when two buyers order at the same time', async () => {
    const a = await signUp();
    const b = await signUp();
    const last = await product({ stock: 1 });
    const body = { items: [{ product: String(last._id), quantity: 1 }], shippingAddress: address };

    const results = await Promise.all([a.agent.post('/api/orders').send(body), b.agent.post('/api/orders').send(body)]);

    expect(results.map((r) => r.status).sort()).toEqual([201, 400]);
    expect((await Product.findById(last._id))!.stock).toBe(0);
  });

  it('requires sign-in', async () => {
    await request(app).post('/api/orders').send({}).expect(401);
  });
});

describe('order privacy', () => {
  it("hides other people's orders and lets admins see everything", async () => {
    const owner = await signUp();
    const stranger = await signUp();
    const admin = await signUpAdmin();
    const item = await product();
    const { body } = await owner.agent
      .post('/api/orders')
      .send({ items: [{ product: String(item._id), quantity: 1 }], shippingAddress: address })
      .expect(201);
    const orderId = body.order._id;

    await owner.agent.get(`/api/orders/${orderId}`).expect(200);
    await stranger.agent.get(`/api/orders/${orderId}`).expect(404);
    await stranger.agent.delete(`/api/orders/${orderId}`).expect(404);
    await stranger.agent.get(`/api/orders/user/${owner.user._id}`).expect(403);
    await stranger.agent.get('/api/orders/admin/all').expect(403);

    await admin.agent.get(`/api/orders/${orderId}`).expect(200);
    const all = await admin.agent.get('/api/orders/admin/all').expect(200);
    expect(all.body.orders).toHaveLength(1);
  });
});

describe('cancelling and deleting', () => {
  it('lets a buyer withdraw a pending order and puts the stock back', async () => {
    const { agent } = await signUp();
    const item = await product({ stock: 5 });
    const { body } = await agent
      .post('/api/orders')
      .send({ items: [{ product: String(item._id), quantity: 2 }], shippingAddress: address })
      .expect(201);

    await agent.delete(`/api/orders/${body.order._id}`).expect(200);
    expect((await Product.findById(item._id))!.stock).toBe(5);
  });

  it('stops a buyer from deleting an order that is already being processed', async () => {
    const { agent } = await signUp();
    const admin = await signUpAdmin();
    const item = await product();
    const { body } = await agent
      .post('/api/orders')
      .send({ items: [{ product: String(item._id), quantity: 1 }], shippingAddress: address })
      .expect(201);

    await admin.agent.put(`/api/orders/${body.order._id}/status`).send({ status: 'processing' }).expect(200);
    await agent.delete(`/api/orders/${body.order._id}`).expect(400);
  });

  it('returns stock when an admin cancels, and a cancelled order stays cancelled', async () => {
    const { agent } = await signUp();
    const admin = await signUpAdmin();
    const item = await product({ stock: 5 });
    const { body } = await agent
      .post('/api/orders')
      .send({ items: [{ product: String(item._id), quantity: 3 }], shippingAddress: address })
      .expect(201);
    const url = `/api/orders/${body.order._id}/status`;

    await agent.put(url).send({ status: 'cancelled' }).expect(403);
    await admin.agent.put(url).send({ status: 'cancelled' }).expect(200);
    expect((await Product.findById(item._id))!.stock).toBe(5);

    await admin.agent.put(url).send({ status: 'processing' }).expect(400);
    await admin.agent.put(url).send({ status: 'cancelled' }).expect(200);
    expect((await Product.findById(item._id))!.stock).toBe(5); // not returned twice
  });
});

describe('catalog', () => {
  it('lists products with filters and pagination', async () => {
    await product({ brand: 'Samsung', price: 300 });
    await product({ brand: 'Samsung', price: 900 });
    await product({ brand: 'LG', price: 400 });

    const res = await request(app).get('/api/products').query({ brand: 'Samsung', limit: 1 }).expect(200);

    expect(res.body.data).toHaveLength(1);
    expect(res.body.pagination.totalItems).toBe(2);
  });
});
