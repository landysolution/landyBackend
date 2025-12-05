import InvoiceModel from "../../model/invoiceModel.js";
import axios from "axios";

const TopUp = async (req, res) => {
  try {
    const { bank, topup_ids, amount } = req;

    // ---- 1. Find existing invoice ----
    const existing = await InvoiceModel.findOne({ topup_ids, amount });

    if (existing) {
      const now = Date.now();
      const created = new Date(existing.createdAt).getTime();

      const diffMinutes = (now - created) / (1000 * 60);

      // If invoice is still fresh (under 13 minutes) & not paid
      if (diffMinutes < 13 && existing.invoice_status !== "PAID") {
        return res.json({
          reused: true,
          message: "Using existing active invoice",
          invoice: existing,
        });
      }
    }

    // ---- 2. Create NEW invoice ----
    const response = await axios.post(
      "https://quickqr.qpay.mn/v2/invoice",
      {
        merchant_id: "ceb700d2-a8c6-4db1-a5ae-f7742124b457",
        amount,
        currency: "MNT",
        mcc_code: "7994",
        callback_url: `https://api.landy.mn/member/notify?invoiceId`,
        description: "Member account top up",
        bank_accounts: [
          {
            account_bank_code: bank.bank_code,
            account_number: bank.account_number,
            account_name: bank.account_name,
            is_default: false,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
        },
      }
    );

    const newInvoice = await InvoiceModel.create({
      amount: response.data.amount,
      invoice_status: response.data.invoice_status,
      topup_ids,
      invoiceId: response.data.id,
      qr: response.data.qr_code
    });

    return res.status(200).json(newInvoice);
  } catch (err) {
    if (err.response) {
      console.error("QPay Error:", err.response.data);
      return res.status(err.response.status).json(err.response.data);
    }

    console.error("Network Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export default TopUp;
