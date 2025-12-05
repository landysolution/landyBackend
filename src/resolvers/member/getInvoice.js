import axios from "axios";

const getInvocie = async (req, res) => {
  const { invoiceId } = req.body;
  try {
    const { data } = await axios.post(
      "https://quickqr.qpay.mn/v2/payment/check",{
Headers:{
   Authorization: `Bearer ${process.env.qpayToken}`,
}
      },
      {
        invoice_id: invoiceId,
      }
    );
    return res.json(data);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
export default getInvocie;
