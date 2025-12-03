import { z } from "zod";

const TopupMW = (req, res, next) => {
  
  const schema = z.object({
    topup_ids: z.string().trim().min(1),
    amount: z.number().positive(),
  });

  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid input",
      details: result.error.errors,
    });
  }

  
  next();
};

export default TopupMW;
