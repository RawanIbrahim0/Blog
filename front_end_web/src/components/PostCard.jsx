import { useState } from "react";
import api from "../services/api";

export default function PostCard({ post, onDelete, onEdit }) {

    const CURRENT_USER_ID = localStorage.getItem("userId");

    const [showEditModal, setShowEditModal] = useState(false);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newCommentContent, setNewCommentContent] = useState("");
    const [isLoadingComments, setIsLoadingComments] = useState(false);
    const [form, setForm] = useState({ content: post.content });
    const [commentError, setCommentError] = useState(null);

    const isPostOwner = post.user === CURRENT_USER_ID;

    function handleEdit(e) {
        e.preventDefault();
        onEdit(post._id, form);
        setShowEditModal(false);
    }

    const fetchComments = async (postId) => {
        setIsLoadingComments(true);
        setCommentError(null);
        try {
            const res = await api.get(`/comments/${postId}`);
            setComments(res.data);
        } catch (err) {
            setCommentError(err.response?.data?.message || "Failed to fetch comments");
            setComments([]);
        } finally {
            setIsLoadingComments(false);
        }
    };

    const handleCommentsClick = () => {
        setShowCommentsModal(true);
        fetchComments(post._id);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newCommentContent.trim()) return;

        try {
            const res = await api.post(`/comments/${CURRENT_USER_ID}`, {
                post: post._id,
                content: newCommentContent
            });

            fetchComments(post._id);
            setNewCommentContent("");
        } catch (err) {
            alert("خطأ في إضافة التعليق: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("هل أنت متأكد من حذف هذا التعليق؟")) return;
        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(c => c._id !== commentId));
        } catch (err) {
            alert("خطأ في حذف التعليق: " + (err.response?.data?.message || err.message));
        }
    };

    const handleEditComment = async (commentId, newContent) => {
        try {
            const res = await api.put(`/comments/${commentId}`, {
                content: newContent
            });
            await fetchComments(post._id)
            return true;
        } catch (err) {
            alert("خطأ في تعديل التعليق: " + (err.response?.data?.message || err.message));
            return false;
        }
    };

    return (
        <div className="flex flex-col gap-10 p-4 border rounded-2xl shadow-sm bg-gray-900 transition relative">

            <div className="flex justify-between items-end gap-4">
                <div className="flex gap-4">
                    <h3 className="text-lg font-semibold text-amber-300">Post by</h3>
                    <p className="text-amber-200 text-xl">{post.username}</p>
                </div>
                <p className="text-gray-400 text-sm">{post.createdAt}</p>
            </div>

            <p className="text-amber-100 text-lg">{post.content}</p>


            <div className="flex justify-between gap-2 mt-2">

                {isPostOwner && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="text-blue-600 border border-blue-600 px-2 py-1 rounded hover:bg-blue-50"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(post._id)}
                            className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-50"
                        >
                            Delete
                        </button>
                    </div>
                )}

                <button
                    onClick={handleCommentsClick}
                    className="text-amber-50 border border-yellow-700 bg-amber-600 px-2 py-1 rounded hover:bg-amber-200 hover:text-yellow-700"
                >
                    Comments
                </button>
            </div>


            {/* ---------------- Edit Modal ---------------- */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-amber-100 p-6 rounded-xl shadow-lg w-96">
                        <h2 className="text-lg text-black font-bold mb-4">Edit Post</h2>

                        <form onSubmit={handleEdit} className="space-y-4">

                            <textarea
                                value={form.content}
                                onChange={(e) => setForm({ content: e.target.value })}
                                className="w-full border rounded p-2 text-black"
                                rows={4}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-3 py-2 border text-black rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-green-600 text-black rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* ---------------- Comments Modal ---------------- */}
            {showCommentsModal && (
                <CommentsModal
                    comments={comments}
                    isLoading={isLoadingComments}
                    onClose={() => setShowCommentsModal(false)}
                    postId={post._id}
                    onDeleteComment={handleDeleteComment}
                    onEditComment={handleEditComment}
                    onAddComment={handleAddComment}
                    newCommentContent={newCommentContent}
                    setNewCommentContent={setNewCommentContent}
                    CURRENT_USER_ID={CURRENT_USER_ID}
                />
            )}

        </div>
    );
}


function CommentsModal({
    comments,
    isLoading,
    onClose,
    postId,
    onDeleteComment,
    onEditComment,
    onAddComment,
    newCommentContent,
    setNewCommentContent,
    CURRENT_USER_ID
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg h-3/4 flex flex-col">

                <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-700">
                    <h2 className="text-2xl text-amber-300 font-bold">Comments ({comments.length})</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                </div>


                <div className="flex-grow overflow-y-auto space-y-4 mb-4 p-2 custom-scrollbar">
                    {isLoading ? (
                        <p className="text-amber-200 text-center">Loading comments...</p>
                    ) : comments.length > 0 ? (
                        comments.map(comment => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                isUserComment={comment.user === CURRENT_USER_ID}
                                onDelete={onDeleteComment}
                                onEdit={onEditComment}
                            />
                        ))
                    ) : (
                        <p className="text-amber-200 text-center">No comments yet. Be the first!</p>
                    )}
                </div>

                <form onSubmit={onAddComment} className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-grow p-2 border rounded-lg bg-gray-700 text-white"
                            value={newCommentContent}
                            onChange={(e) => setNewCommentContent(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded-lg">
                            Post
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

function CommentItem({ comment, onDelete, onEdit, isUserComment }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const handleSaveEdit = async () => {
        if (editContent.trim() && editContent !== comment.content) {
            const success = await onEdit(comment._id, editContent);
            if (success) setIsEditing(false);
        } else {
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-gray-700 p-3 rounded-lg shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-semibold text-amber-300">
                    {comment.username || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">{comment.createdAt}</p>
            </div>

            {/* Edit mode */}
            {isEditing ? (
                <div className="space-y-2">
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border rounded bg-gray-600 text-white"
                        rows="2"
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-400 hover:text-white text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveEdit}
                            className="text-green-400 hover:text-green-300 text-sm"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-amber-100 text-md">{comment.content}</p>
            )}

            {isUserComment && !isEditing && (
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(comment._id)}
                        className="text-red-400 hover:text-red-300 text-xs"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

