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
  creationTime: Date;
  creatorId: Types.ObjectId;
  comments: Comment[];
  likes: Like[];
}

const postSchema = new Schema<Post>(
  {
    text: String,
    imgSrc: String,
    creationTime: { type: Date, default: Date.now },
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
  { timestamps: true }
);

postSchema.index({ creationTime: -1, creatorId: 1 });

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;
