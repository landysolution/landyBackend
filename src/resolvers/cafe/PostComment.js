
import ReviewModel from "../../model/ReviewModel.js";

const PostComment = async (req, res) => {
  try {
    const cafeId = req.params.id;
    const { content } = req.body;

    // Validate input
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Comment content cannot be empty" });
    }

 

    const newReview = new ReviewModel({
      content,
      cafeId: cafeId,
      user: req.user._id,
    });

    await newReview.save();

    // Update Redis cache safely
    await updateCafeRating({ cafeId });

    // Populate user info
    const populatedReview = await ReviewModel.findById(newReview._id).populate(
      "user",
      "username avatar steamId profileUrl"
    );

    return res.status(200).json(populatedReview);

  } catch (err) {
    console.error("PostComment error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export default PostComment;
