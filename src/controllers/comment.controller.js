import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params;
    if (!commentId || !isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is required or invalid");
    }
    try {
        const comment = await Comment.findById(commentId)
        if(comment?.owner.toString() !== req.user?._id.toString()){
            throw new ApiError(401, "You are not authorized to delete the comment!")
        }
        
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            throw new ApiError(500, "Unable to delete the comment");
        }
        return res
            .status(200)
            .json(
            new ApiResponse(200, deletedComment || "Comment deleted successfully")
            );
    } catch (error) {
        throw new ApiError(500, error?.message || "Unable to delete comment");        
    }

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
}