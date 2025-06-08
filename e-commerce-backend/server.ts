import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import connectDB from './config/dataBase';
import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'
import cartRoutes from './routes/cartRoutes'
import adminFixRoutes from './scripts/adminFixRoutes';
import ordersRoutes from './routes/ordersRoutes'

//rekao  chatgpt  da stavim jbm mu sve 
import { EventEmitter } from 'events';
// Poviši globalni limit na 20 listener-a (ili koliko ti treba)
EventEmitter.defaultMaxListeners = 20;

dotenv.config();
// Try to load environment variables from different potential locations
const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../../.env'),
  path.resolve(process.cwd(), '../.env'),
];

//inicialization
const app = express();
const PORT = process.env.PORT || 4000;
// Try to load environment variables from different potential locations


app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET","POST","PUT","OPTIONS","DELETE"]
  
})); // Enable CORS


app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
// API Routes
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes );
app.use('/api/cart', cartRoutes)
app.use('/api/orders', ordersRoutes)

//fix route 
app.use('/api/admin', adminFixRoutes);

// Start server
const startServer = async () => {
  try {
    // Connect to database first
    await connectDB();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`
🚀 Server is running on port ${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
📱 Local: http://localhost:${PORT}
🗄️  Database: Connected to MongoDB
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();