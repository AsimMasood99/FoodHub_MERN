import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
  email: {
    type: String, 
    required: true 
  },
  date: {
    type: Date,
    required: true 
  },
  item: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  }, 
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number, 
    required: true
  }
})

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;