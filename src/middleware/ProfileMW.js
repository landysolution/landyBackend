import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";
const ProfileMW = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) res.status(401).json({ error: "Not logged in" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select(
      "username avatar steamId profileUrl"
    );
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
export default ProfileMW;
