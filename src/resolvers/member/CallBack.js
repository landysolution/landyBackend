import InvoiceModel from "../../model/invoiceModel.js";

const CallBack = async (req, res) => {
  try {
    const { invoiceId, amount, topup_ids } = req.query;

    console.log("Callback received from QPay");
    console.log("Query data:", req.query);

    // Find the invoice
    const invoice = await InvoiceModel.findOne({
      topup_ids,
      amount,
      invoice_status: "OPEN",
    });

    if (!invoice) {
      console.log("No matching open invoice found");
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Update invoice status to PAID
    invoice.invoice_status = "PAID";
    await invoice.save(); // <-- Important: save the change

    console.log(`Invoice ${invoice.invoiceId} marked as PAID`);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Callback error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export default CallBack;
