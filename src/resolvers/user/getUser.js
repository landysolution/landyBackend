// backend/controllers/getUser.js
import UserModel from "../../model/UserModel.js";
import jwt from "jsonwebtoken";

const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not logged in" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fetch user
    const user = await UserModel.findById(decoded.id).select(
      "username avatar steamId profileUrl"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user
    res.status(200).json(user);
  } catch (err) {
    console.error("Unexpected error in getUser:", err);
    // Show actual error in dev, generic in production
    res.status(500).json({
      error:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : err.message,
    });
  }
};

export default getUser;
