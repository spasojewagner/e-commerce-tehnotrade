import mongoose from 'mongoose';
import { afterAll, beforeAll, beforeEach, inject } from 'vitest';

process.env.JWT_SECRET = 'test-secret';
process.env.NODE_ENV = 'test';

beforeAll(async () => {
  await mongoose.connect(inject('mongoUri'));
});

beforeEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
});
