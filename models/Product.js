import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
  imgUrl: { type: String, required: true },
  category: { type: String, required: true }, //quran, accessories, clothing[Men, Women]
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  // maxQuantityPerPurchase: { type: Number, required: true }, //max number of products that a customer can order per purchase
  // availableStock: { type: Number, required: true }, //arbitrary number of items available in the store
  isFeatured: { type: Boolean },
  isOnSale: { type: Boolean },
  salePrice: { type: Number },
  clothingSizes: { type: [String] }, //if product is of type clothing
  reviews: { type: [String], default: [] },
  likes: { type: [String], default: [] },
});
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
