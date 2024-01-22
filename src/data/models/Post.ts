/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *         userId:
 *           type: string
 *           description: ID of the user who commented on the post
 *       example:
 *         text: "Great post!"
 *         userId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *
 *     Like:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user who liked the post
 *       example:
 *         userId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the post
 *         text:
 *           type: string
 *         imgSrc:
 *           type: string
 *           description: URL to the post image
 *         creatorId:
 *           type: string
 *           description: ID of the user who created the post
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         likes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Like'
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - creatorId
 *         - comments
 *         - likes
 *       example:
 *         _id: "5f4dcc3b5aa765d61d8327deb882cf99"
 *         text: "Awesome post!"
 *         imgSrc: "https://example.com/image.jpg"
 *         creatorId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *         comments: [
 *           {
 *             text: "Great post!",
 *             userId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *           }
 *         ]
 *         likes: [
 *           {
 *             userId: "5f4dcc3b5aa765d61d8327deb882cf99"
 *           }
 *         ]
 */

import mongoose, { Schema, Document, Types } from "mongoose";

export interface Comment {
  text: string;
  userId: Types.ObjectId;
}

export interface Like {
  userId: Types.ObjectId;
}

interface Post extends Document {
  _id: string;
  text?: string;
  imgSrc?: string;
  creatorId: Types.ObjectId;
  comments: Comment[];
  likes: Like[];
}

const postSchema = new Schema<Post>(
  {
    text: String,
    imgSrc: String,
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        text: String,
        userId: { type: Schema.Types.ObjectId, ref: "User" } as any,
      },
    ],
    likes: [{ userId: { type: Schema.Types.ObjectId, ref: "User" } as any }],
  },
  {
    timestamps: {
      currentTime: () => new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
  }
);

postSchema.index({ createdAt: -1, creatorId: 1 });

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;
