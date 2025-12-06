import InvoiceModel from "../../model/invoiceModel.js";
import { notifyUser } from "../../ws/wsServer.js";
const CallBack = async (req, res) => {
  try {
    const { invoiceId, token } = req.query;

    // Verify token first
    if (token !== process.env.QPAY_CALLBACK_SECRET) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Now safely find the invoice
    const invoice = await InvoiceModel.findOne({
      invoiceId,
      invoice_status: "OPEN",
    });
    if (!invoice)
      return res
        .status(404)
        .json({ error: "Invoice not found or already processed" });

    invoice.invoice_status = "PAID";
    await invoice.save();
    notifyUser(invoice.topup_ids, { invoiceId: invoice.invoiceId, status: "PAID" });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Callback error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export default CallBack;
