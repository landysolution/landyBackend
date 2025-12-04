import InvoiceModel from "../../model/invoiceModel.js";
import axios from "axios";
import { invoiceMock } from "../../mock/invoiceMock.js";
// --- TopUp Function ---
const TopUp = async (req, res) => {
  try {
    const { amount, topup_ids } = req.body;
    const existingOpenInvoice = await InvoiceModel.findOne({
      topup_ids,
      invoice_status: "OPEN",
    });
     if (existingInvoice) {
      return res.status(200).json(existingInvoice); 
    }

    // Call QPay API
    const response = await axios.post(
      "https://quickqr.qpay.mn/v2/invoice",
      {
        merchant_id: "ceb700d2-a8c6-4db1-a5ae-f7742124b457",
        amount: amount,
        currency: "MNT",
        mcc_code: "7994",
        callback_url:
          "https://unmanipulatable-pleasable-jamey.ngrok-free.dev/member/notify",
        description: "Member account top up",
        bank_accounts: [
          {
            account_bank_code: "050000",
            account_number: "5530268425",
            account_name: "Тэмүүлэн",
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
      id: response.data.id,
      amount: response.data.amount,
      qr_code: response.data.qr_code,
      invoice_status: response.data.invoice_status,
      topup_ids: topup_ids,
      invoiceId: response.data.id,
    });

    res.status(200).json(response.data);
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
