import Comment from "../models/commentModel.js";
import User from "../models/userModel.js"

export const createComment = async (req, res) => {
  try {
    const { post,content } = req.body;
    const user=req.params.id;
     const userinfo= await User.findById(user);
    const username=userinfo.name;
    const newComment = await Comment.create({ user,username,post, content});
    res.status(201).json({ message: "Comment Added Successfully ... ",comment:newComment});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComment = async (req, res) => {
  try {
    const postId=req.params.id
    const Allcomments = await Comment.find().sort({ createdAt: -1 });
    const postcomments = Allcomments.filter(u=>u.post==postId);
    if(postcomments.length==0) return res.json({message:"Not Comments Yet.."})
    res.json(postcomments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) return res.status(404).json({ message: "comment Not Found" });
    res.status(200).json({ message: "Updated Successfully", comment: comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment Not Found" });
    res.json({ message: "Comment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
