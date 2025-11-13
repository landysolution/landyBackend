import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  steamId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: { type: String },
  profileUrl: { type: String },
});
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
