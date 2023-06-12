import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  itemsInCart: {
    type: [
      {
        itemId: { type: String, required: true },
        isSelectedForCheckOut: { type: Boolean, required: true },
      },
    ],
    maxlength: 10,
  }, //product id's go here
  itemsToCheckOut: {
    type: [
      {
        itemId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    maxlength: 10,
  },
  
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
