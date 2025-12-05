import axios from "axios";
import InvoiceModel from "../../model/invoiceModel.js";

const getInvoice = async (req, res) => {
  try {
    const { user } = req.body;
    const userId = String(user);

    // ---- 1. Find existing OPEN invoice ----
    let invoice = await InvoiceModel.findOne({
      topup_ids: userId,
      invoice_status: "OPEN",
    });

    if (!invoice) {
      return res.json({ ok: false, message: "No active invoice" });
    }

    // ---- 2. Check if invoice is expired (3 minutes) ----
    const now = Date.now();
    const created = invoice.createdAt.getTime();
    const diffMinutes = (now - created) / (1000 * 60);

    if (diffMinutes >= 3) {
      invoice.invoice_status = "EXPIRED";
      await invoice.save();
      return res.json({ ok: false, message: "Invoice expired" });
    }

    // ---- 3. Fetch invoice info from QPay ----
    const { data } = await axios.get(
      `https://quickqr.qpay.mn/v2/invoice/${invoice.invoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.json({ ok: true, invoice: data });
  } catch (err) {
    console.error("QPay error:", err.response?.data || err.message);
    return res.status(500).json(err.response?.data || { error: err.message });
  }
};

export default getInvoice;
