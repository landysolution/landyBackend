import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  invoiceId: { type: String, required: true },
  invoice_status: {
    type: String,
    enum: ["OPEN", "PAID", "EXPIRED", "CANCELLED"],
    default: "OPEN",
  },
  qr: { type: String, required: true },

  topup_ids: { type: String, required: true },
});

const InvoiceModel = mongoose.model("Invoice", invoiceSchema);
export default InvoiceModel;
