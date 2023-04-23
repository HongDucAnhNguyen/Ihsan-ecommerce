import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sales_price: { type: Number, required: true },
  reviews: { type: String, required: true },
  likes: { type: [String], default: [] },
});
const Products =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default Products;
