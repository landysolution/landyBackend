import GetMember from "../resolvers/member/GetMember.js";
import TopUp from "../resolvers/member/TopUp.js";
import express from "express";
import TopupMW from "../middleware/TopupMW.js";
import CallBack from "../resolvers/member/CallBack.js";
import postBank from "../resolvers/member/postBank.js";
import getInvoice from '../resolvers/member/getInvoice.js'
const route = express.Router();

route.get("/", GetMember);
route.post("/topup", TopupMW, TopUp);
route.post("/notify", CallBack);
route.post("/bank", postBank);
route.post('/getInvoice',getInvoice)

export default route;
