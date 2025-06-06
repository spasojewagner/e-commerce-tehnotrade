import mongoose, { Schema } from "mongoose";

// Interface za cart item
export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  addedAt: Date;
}

// Schema za cart item
const cartItemSchema = new Schema<ICartItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    addedAt: { type: Date, default: () => new Date() }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    terms: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    cart: {
      type: [cartItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;