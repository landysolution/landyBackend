import ReviewModel from "../../model/ReviewModel.js";
const GetComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await ReviewModel.find({ cafeId: Number(id) }).sort({
      createdAt: -1,
    }).select("content rating user -_id") 
      .populate("user").limit(20);

    return res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
export default GetComments;
