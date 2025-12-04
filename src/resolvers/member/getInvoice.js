import axios from "axios";
import InvoiceModel from "../../model/invoiceModel.js";

const getInvoice = async (req, res) => {
  const { userId } = req.body;

  try {
    // 1. Find existing invoice
    const invoice = await InvoiceModel.findOne({
      topup_ids: userId,
      invoice_status: "OPEN", // optional: only get open invoices
    });

    if (!invoice) {
      return res.status(404).json({ error: "No active invoice found" });
    }

    // 2. Call QPay API with correct headers
    const { data } = await axios.get(
      `https://quickqr.qpay.mn/v2/invoice/${invoice.invoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
          Accept: "application/json",
        },
      }
    );

    // 3. Return data to frontend
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch invoice from QPay" });
  }
};

export default getInvoice;
