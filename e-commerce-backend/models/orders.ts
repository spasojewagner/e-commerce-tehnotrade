import { Schema, model, Types, Document } from "mongoose";

interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  priceAtTime: number; // cena u momentu narudžbe
}

interface IShippingAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  note?: string;
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  totalAmount?: number; // opciono, može se kalkulisati
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtTime: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const shippingAddressSchema = new Schema<IShippingAddress>(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: 'Srbija' },
    phone: { type: String, trim: true },
    note: { type: String, trim: true }
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { 
      type: [orderItemSchema], 
      required: true, 
      validate: {
        validator: function(items: IOrderItem[]) {
          return items && items.length > 0;
        },
        message: 'Porudžbina mora imati najmanje jednu stavku'
      }
    },
    shippingAddress: { type: shippingAddressSchema, required: true },
    totalAmount: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual za kalkulaciju ukupne cene ako nije eksplicitno postavljena
orderSchema.virtual('calculatedTotal').get(function() {
  if (this.totalAmount) return this.totalAmount;
  
  return this.items.reduce((total, item) => {
    return total + (item.priceAtTime * item.quantity);
  }, 0);
});

// Index za optimizaciju pretrage
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });

export const Order = model<IOrder>("Order", orderSchema);