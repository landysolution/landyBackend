import ReviewModel from "../../model/ReviewModel.js";
import { updateCafeRating } from "../cache/updateCafeRating.js";
const PostComment = async (req, res) => {
  try {
    console.log(req.params.id);
    
    const { content, rating } = req.body;

    const newReview = new ReviewModel({
      content,
      rating,
      cafeId: req.params.id,
      user: req.user._id,
    });

    await newReview.save();
    // await updateCafeRating({
    //   rating: Number(rating),
    //   cafeId: req.params.id,
    // });


    const populatedReview = await ReviewModel.findById(newReview._id).populate(
      "user",
      "username avatar steamId profileUrl"
    );

    return res.status(200).json(populatedReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
 

};

export default PostComment;
