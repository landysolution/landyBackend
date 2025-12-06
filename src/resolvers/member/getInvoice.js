import InvoiceModel from "../../model/invoiceModel.js";

const getInvoice = async (req, res) => {
  try {
    const { user } = req.body;
    const userId = String(user);

    // 1. Find existing OPEN invoice for this user
    let invoice = await InvoiceModel.findOne({
      topup_ids: userId,
      invoice_status: "OPEN",
    });

    if (!invoice) {
      return res.json({ ok: false, message: "No active invoice" });
    }

    // 2. Check if invoice is expired (3 minutes)
    const now = Date.now();
    const created = invoice.createdAt.getTime();
    const diffMinutes = (now - created) / (1000 * 60);

    if (diffMinutes >= 3) {
      invoice.invoice_status = "EXPIRED";
      await invoice.save();
      return res.json({ ok: false, message: "Invoice expired" });
    }

    // 3. Return invoice from DB
    return res.json({ ok: true, invoice });
  } catch (err) {
    console.error("Get invoice error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export default getInvoice;
