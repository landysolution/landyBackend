import { z } from "zod";
import BankModel from "../model/bankModel.js";

const TopupMW = async (req, res, next) => {
  const schema = z.object({
    topup_ids: z.string().trim().min(1),
    amount: z.number().positive(),
    cafeId: z.number().positive(),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid input",
      details: result.error.errors,
    });
  }

  const { cafeId } = result.data;

  const bank = await BankModel.findOne({ id: cafeId });

  if (!bank) {
    return res.status(404).json({ error: "Bank account not found" });
  }

  req.bank = bank;
  req.cafeId = cafeId;
  req.topup_ids = topup_ids;

  next();
};

export default TopupMW;
