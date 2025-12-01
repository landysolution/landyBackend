const TopUp = (req,res) =>{

 console.log("=== QPay Callback Received ===");
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.status(200).send("OK");
}
export default TopUp
