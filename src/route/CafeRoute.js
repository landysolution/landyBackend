import express from "express";
import ProfileMW from "../middleware/ProfileMW.js";
import GetCafes from "../resolvers/cafe/GetCafes.js";
import GetPcs from "../resolvers/cafe/GetPcs.js";
import GetComments from "../resolvers/cafe/GetComments.js";
import PostComment from "../resolvers/cafe/PostComment.js";
import GetMember from "../resolvers/cafe/GetMember.js";
import TopUp from "../resolvers/cafe/Topup.js";
const route = express.Router();

route.get("/", GetCafes);
route.get("/pcs/:id", GetPcs);
route.get("/comments/:id", GetComments);
route.post("/commentPost/:id", ProfileMW, PostComment);
route.get("/members", GetMember);
route.post("/topup", TopUp);
export default route;
