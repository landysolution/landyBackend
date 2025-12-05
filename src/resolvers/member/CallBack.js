const CallBack = (req, res) => {
  console.log("res from qpay");
const data = req.body
console.log("[QPay Callback] Received:", data);

  
  return res.status(200).json('ok')
};
export default CallBack;
