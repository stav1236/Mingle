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

postSchema.index({ updatedAt: -1, creatorId: 1 });

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;
