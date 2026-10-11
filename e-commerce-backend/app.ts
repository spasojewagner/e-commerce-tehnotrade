import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import ordersRoutes from './routes/ordersRoutes';
import adminFixRoutes from './scripts/adminFixRoutes';

/** The Express app without a database connection or a port, so tests can use it directly. */
export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', userRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/orders', ordersRoutes);
  app.use('/api/admin', adminFixRoutes);

  return app;
}
