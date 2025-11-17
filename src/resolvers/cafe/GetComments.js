import ReviewModel from "../../model/ReviewModel.js";

const GetComments = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = 3;                           // comments per page
    const skip = (page - 1) * limit;

    const total = await ReviewModel.countDocuments({ cafeId: Number(id) });
    const totalPages = Math.ceil(total / limit);

    const comments = await ReviewModel.find({ cafeId: Number(id) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username avatar steamId profileUrl");

    return res.status(200).json({
      comments,
      page,
      totalPages,
      total,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default GetComments;
