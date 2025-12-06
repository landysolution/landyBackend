const CallBack = (req, res) => {
  console.log(" Callback received from QPay");

  const raw = req.body;
  console.log("Raw body:", raw);

 
  console.log("Parsed callback:", data);

  // MUST RESPOND 200 or QPay will retry
  return res.status(200).json("ok");
};

export default CallBack;
