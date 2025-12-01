import GetMember from "../resolvers/member/GetMember.js";
import TopUp from "../resolvers/member/TopUp.js";
import express from "express";
const route = express.Router();

route.get("/", GetMember);
route.post("/topup", TopUp);

export default route;
