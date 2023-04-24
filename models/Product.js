import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
  imgUrl: { type: String, required: true },
  category: { type: String, required: true }, //quran, accessories, clothing
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isFeatured: { type: Boolean },
  isOnSale: { type: Boolean },
  salePrice: { type: Number },
  reviews: { type: [String], default: [] },
  likes: { type: [String], default: [] },
});
const Product =
  mongoose.models.Products || mongoose.model("Product", ProductSchema);
export default Product;
