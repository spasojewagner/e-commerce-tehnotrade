import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  sku: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  brand: string;
  images: string[];
}

const productSchema = new Schema<IProduct>({
  sku:       { type: String, required: true, unique: true },
  name:      { type: String, required: true },
  description: String,
  price:     { type: Number, required: true },
  stock:     Number,
  categories:[String],
  brand:     String,
  images:    [String],
});

export const Product = model<IProduct>('Product', productSchema);
