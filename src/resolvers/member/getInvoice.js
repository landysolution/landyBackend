import axios from "axios";
import invoiceModel from '../../model/invoiceModel.js';

const getInvoice = async (req, res) => {
  try {
    const { user } = req.body;
    const userId = String(user);

    // 1. Check open invoice in DB
    const userInvoice = await invoiceModel.findOne({
      topup_ids: userId,
      invoice_status: "OPEN",
    });

    if (!userInvoice) {
      return res.json({ ok: false, message: "No active invoice" });
    }

    // 2. Fetch invoice info from QPay
    const { data } = await axios.get(
      `https://quickqr.qpay.mn/v2/invoice/${userInvoice.invoiceId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.json({ ok: true, invoice: data });
  } catch (err) {
    console.log("QPay error:", err.response?.data || err.message);
    return res.status(500).json(err.response?.data || { error: err.message });
  }
};

export default getInvoice;
