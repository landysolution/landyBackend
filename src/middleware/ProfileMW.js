import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";

const ProfileMW = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select(
      "username avatar steamId profileUrl"
    );

    if (!user) {
      return res.status(401).json({ error: "User not found" }); // FIX #2
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default ProfileMW;
