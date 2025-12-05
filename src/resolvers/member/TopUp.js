import InvoiceModel from "../../model/invoiceModel.js";
import axios from "axios";

const TopUp = async (req, res) => {
  try {
    const { bank, topup_ids, amount } = req;

    // ---- 1. Find existing invoice ----
    const existing = await InvoiceModel.findOne({
      topup_ids,
      amount,
      invoice_status: { $ne: "PAID" }
    });

    if (existing) {
      const now = Date.now();
      const created = new Date(existing.createdAt).getTime();
      const diffMinutes = (now - created) / (1000 * 60);

      if (diffMinutes < 5) {
        return res.json({
          reused: true,
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
        callback_url: `https://api.landy.mn/member/notify`,
        description: `Top-up for user ${topup_ids}`,
        bank_accounts: [
          {
            account_bank_code: bank.bank_code,
            account_number: bank.account_number,
            account_name: bank.account_name,
          }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
        },
      }
    );

    // ---- 3. Save to DB ----
    const newInvoice = await InvoiceModel.create({
      amount,
      invoice_status: response.data.invoice_status,
      topup_ids,
      invoiceId: response.data.id,
      qr: response.data.qr_code,
    });

    return res.json(newInvoice);

  } catch (err) {
    console.log("QPay Error:", err.response?.data || err.message);
    return res.status(500).json(err.response?.data || err);
  }
};

export default TopUp;
