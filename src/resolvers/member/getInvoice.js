import axios from "axios";

const getInvocie = async (req, res) => {
  const { invoiceId } = req.body;

  try {
    const { data } = await axios.post(
      "https://quickqr.qpay.mn/v2/payment/check",
      {
        invoice_id: invoiceId, // <-- Body MUST be second argument
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.qpayToken}`,
          Accept: "application/json",
        },
      }
    );

    return res.json(data);

  } catch (err) {
    console.log("QPay error:", err.response?.data || err.message);
    return res.status(500).json(err.response?.data || err);
  }
};

export default getInvocie;
