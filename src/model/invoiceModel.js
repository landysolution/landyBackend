import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  qr_code: { type: String, required: true },

  deeplink: { type: String, required: true },
  invoiceId: { type: String, required: true },
  invoice_status: {
    type: String,
    enum: ["OPEN", "PAID", "EXPIRED", "CANCELLED"],
    default: "OPEN",
  },

  topup_ids: { type: String, required: true },
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
export default InvoiceModel;
