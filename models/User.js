import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  itemsInCart: { type: [String] }, //product id's go here
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
