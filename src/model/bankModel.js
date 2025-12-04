import mongoose from "mongoose";
import { string } from "zod";
const bankSchema = new mongoose.Schema({
  bank_code: { type: String, required: true },
  account_number: { type: String, required: true },
  account_name: { type: String, required: true },
  id : {type: String, required : true}
});
const BankModel = mongoose.model("bank", bankSchema);
export default BankModel;
