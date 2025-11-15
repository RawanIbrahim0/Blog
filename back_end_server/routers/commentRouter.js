import express from "express";
import {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:id", createComment);
router.get("/:id", getComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
