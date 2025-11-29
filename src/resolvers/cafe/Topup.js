const Topup = async (req, res) => {
  const { phone, cafeId } = req.query;
  try {
    const response = await axios.get(
      `/api/v2/cafe/${cafeId}/members/action/suggestMembers`,
      {
        baseURL: "https://api.icafecloud.com",
        headers: {
          Authorization: `Bearer ${process.env.NEXUS_KEY}`,
        },
        params: {
          search_text: phone,
          has_detail: 1,
        },
      }
    );
    return res.json(response.data);
  } catch (err) {
    console.log(err);
  }
};
export default Topup;
