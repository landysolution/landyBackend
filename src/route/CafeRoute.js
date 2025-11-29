import express from "express";
import ProfileMW from "../middleware/ProfileMW.js";
import GetCafes from "../resolvers/cafe/GetCafes.js";
import GetPcs from "../resolvers/cafe/GetPcs.js";
import GetComments from "../resolvers/cafe/GetComments.js";
import PostComment from "../resolvers/cafe/PostComment.js";
import { GetMembers } from "../resolvers/cafe/GetMembers.js";
import Topup from "../resolvers/cafe/Topup.js";
const route = express.Router();

route.get("/", GetCafes);
route.get("/pcs/:id", GetPcs);
route.get("/comments/:id", GetComments);
route.post("/commentPost/:id", ProfileMW, PostComment);
route.get("/members", GetMembers);
route.get("/members", Topup);
export default route;
