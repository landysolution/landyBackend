import UserModel from "../../model/UserModel.js";
import jwt from "jsonwebtoken";
const getUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ error: "Not logged in" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select(
      "username avatar steamId profileUrl"
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
export default getUser;
