
import axios from "axios";
export const GetMembers =async (req,res) =>{
console.log(res,'res from front');
const {cafeId,search_text} = req.body
 try {
    const response = await axios.get(
      `/api/v2/cafe/${cafeId}/members/action/suggestMembers`,
      {
        baseURL: "https://api.icafecloud.com",
        headers: {
          Authorization: `Bearer ${process.env.NEXUS_KEY}`,
        },
        params: {
          search_text: search_text
        },
      }
    );
console.log(response.data);

    return res.json(response.data)
  } catch (err) {
    console.error("Error fetching members:", err.response?.data || err.message);
    return null;
  }


}