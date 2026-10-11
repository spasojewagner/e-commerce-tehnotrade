import 'dotenv/config';
import connectDB from './config/dataBase';
import { createApp } from './app';

const PORT = Number(process.env.PORT) || 4000;

async function start() {
  if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    console.error('JWT_SECRET must be set in production.');
    process.exit(1);
  }

  await connectDB();
  createApp().listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
}

start();
