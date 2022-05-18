import * as mongoose from 'mongoose';
export const CarSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  brand: {
    type: String,
    required: true,
  },
  color: { type: String, required: true },
  model: { type: String },
});
