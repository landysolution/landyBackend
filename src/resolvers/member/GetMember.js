import axios from "axios";

const GetMember = async (req, res) => {
  const { member_account, cafeId } = req.query;

  try {
    const response = await axios.post(
      `/api/v2/cafe/${cafeId}/members/action/memberInfo`,
      { member_account },
      {
        baseURL: "https://api.icafecloud.com",
        headers: {
          Authorization: `Bearer ${process.env.NEXUS_KEY}`,
        },
      }
    );

    const member = response.data?.data?.member;

    // ❌ no user found
    if (!member) {
      return res.status(404).json({ error: "User not found" });
    }

  
    const filtered = {
      member_account: member.member_account,
      member_id: member.member_id,
      member_balance: member.member_balance,
      member_phone: member.member_phone,
      member_balance_bonus: member.member_balance_bonus ?? 0,
    };

    return res.json(filtered);

  } catch (err) {
    console.error("GetMember error:", err?.response?.data || err);
    return res.status(500).json({ error: "Server Error" });
  }
};

export default GetMember;
