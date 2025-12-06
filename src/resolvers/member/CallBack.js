const CallBack = (req, res) => {
  console.log(" Callback received from QPay");

  const queryData = req.query;

  console.log("Full QPay query data:", queryData);

  return res.status(200).json("ok");
};

export default CallBack;
