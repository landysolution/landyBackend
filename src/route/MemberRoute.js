import GetMember from "../resolvers/member/GetMember.js";
import TopUp from "../resolvers/member/TopUp.js";
import express from "express";
import TopupMW from "../middleware/TopupMW.js";
import CallBack from "../resolvers/member/CallBack.js";
import getInvocie from "../resolvers/member/getInvoice.js";
const route = express.Router();

route.get("/", GetMember);
route.post("/topup", TopupMW, TopUp);
route.get("/notify", CallBack);
route.post("/check", getInvocie);
export default route;
