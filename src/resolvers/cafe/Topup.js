import axios from "axios";
const Topup = async (req, res) => {
  const { member_account, cafeId } = req.query;
  try {
    const { data } = await axios.post(
      `/api/v2/cafe/${cafeId}/members/action/memberInfo`,
      { member_account },
      {
        baseURL: "https://api.icafecloud.com",
        headers: {
          Authorization: `Bearer ${process.env.NEXUS_KEY}`,
        },
      }
    );
  
    // if (data.data.member === null) {
    //   return res.status(404).json({ error: "User not found" });
    // }
    // const filtered = data.data.member.map((m) => ({
    //   member_account: m.member_account,
    //   member_id: m.member_id,
    //   member_balance: m.member_balance,
    //   member_phone: m.member_phone,
    // }));

    // return res.json(filtered);
    return res.json(data.data.member)
  } catch (err) {
    console.log(err);
  }
};
export default Topup;
