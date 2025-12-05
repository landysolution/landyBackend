import InvoiceModel from "../../model/invoiceModel.js";
import axios from "axios";

const TopUp = async (req, res) => {
  try {
    const { bank, topup_ids, amount } = req

    // ---- 1. Check for existing OPEN invoice ----
    let existing = await InvoiceModel.findOne({
      topup_ids,
      invoice_status: "OPEN",
    });

    if (existing) {
      const now = Date.now();
      const created = existing.createdAt.getTime();
      const diffMs = now - created;
      const diffMinutes = diffMs / (1000 * 60);

      if (diffMinutes < 5) {
        console.log(`[TopUp] Reusing existing invoice ${existing.invoiceId}`);
        return res.json({
          reused: true,
          invoice: existing,
        });
      } else {
        // Expired — mark as EXPIRED
        existing.invoice_status = "EXPIRED";
        await existing.save();
        console.log(`[TopUp] Expired old invoice ${existing.invoiceId}`);
        existing = null; // allow creating a new invoice
      }
    }

    // ---- 2. Create NEW invoice with QPay ----
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
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
        },
      }
    );

    // ---- 3. Save new invoice to DB ----
    const newInvoice = await InvoiceModel.create({
      amount,
      invoice_status: response.data.invoice_status || "OPEN",
      topup_ids,
      invoiceId: response.data.id,
      qr_code: response.data.qr_code,
    });

    console.log(`[TopUp] Created new invoice ${newInvoice.invoiceId}`);
    return res.json(newInvoice);

  } catch (err) {
    console.error("QPay TopUp Error:", err.response?.data || err.message);
    return res.status(500).json(err.response?.data || { error: err.message });
  }
};

export default TopUp;
