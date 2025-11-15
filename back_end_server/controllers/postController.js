import Post from "../models/postModel.js";
import User from "../models/userModel.js"

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user=req.params.id;
    const userinfo= await User.findById(user);
    const username=userinfo.name;
    const newPost = await Post.create({ user ,username, content});
    res.status(201).json({ message: "Post Added Successfully ... ",post:newPost});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "post Not Found" });
    res.status(200).json({ message: "Updated Successfully", post: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post Not Found" });
    res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
