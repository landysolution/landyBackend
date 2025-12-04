import BankModel from "../../model/bankModel.js";

const postBank = async (req, res) => {
  try {
    const { id, account_number, account_name, bank_code } = req.body;

    const newBank = await BankModel.create({
      id,
      account_number,
      account_name,
      bank_code,
    });

    return res.json({ message: "bank account created", data: newBank });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export default postBank;
