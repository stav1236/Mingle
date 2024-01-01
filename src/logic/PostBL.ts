import logger from "../common/config/logger";
import Post from "../data/models/Post";
import User from "../data/models/User";

export const createPost = async (req: any, res: any) => {
  const userId = req.userId;
  const text = req.body.text;
  const imgSrc = req?.file?.path?.replace("\\", "/");
  try {
    const creator = await User.findById(userId);
    if (creator) {
      const newPost = new Post({
        text,
        creatorId: userId,
        likes: [],
        comments: [],
        imgSrc,
      });

      await newPost.save();

      return res.status(200).json({ message: "Data saved successfully" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePostById = async (req: any, res: any) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (post && post.creatorId._id.toString() === req.userId) {
      await post?.deleteOne();
      return res.status(200).json(`Deleted post with id ${postId}`);
    }

    return res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    logger.error("faild delete post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editPost = async (req: any, res: any) => {
  try {
    const postId = req.params?.postId;
    const newText = req.params?.newText;

    const post = await Post.findById(postId);
    if (post && post.creatorId._id.toString() === req.userId) {
      post.text = newText;
      await post?.save();
      return res.status(200).json(`Update post with id ${postId}`);
    }

    return res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    logger.error("faild delete post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const likePost = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const postId = req.body.postId;

    const post = await Post.findById(postId);
    if (post) {
      const likes = [...post.likes];
      const index = likes.findIndex(
        (like) => like.userId._id.toString() === userId
      );
      if (index !== -1) {
        likes.splice(index, 1);
      } else {
        likes.push({ userId });
      }

      post.likes = likes;
      await post?.save();
      return res.status(200).json(`Update post with id ${postId}`);
    }

    return res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    logger.error("faild delete post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const commentPost = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const postId = req.body.postId;
    const text = req.body.text;

    const post = await Post.findById(postId);
    if (post) {
      const comments = [...post.comments];
      comments.unshift({ userId, text });

      post.comments = comments;
      await post?.save();
      return res.status(200).json(`Update post with id ${postId}`);
    }

    return res.status(500).json({ error: "Internal Server Error" });
  } catch (error) {
    logger.error("faild delete post", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFeedPosts = async (req: any, res: any) => {
  try {
    const creatorId = req.params.creatorId;
    const posts = await Post.find({ creatorId }).sort({ createdAt: -1 }).exec();
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error("Error getting posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMeadiaPosts = async (req: any, res: any) => {
  try {
    const creatorId = req?.userId;
    const posts = await Post.find({ creatorId: { $ne: creatorId } })
      .sort({ createdAt: -1 })
      .exec();
    return res.status(200).json({ posts });
  } catch (error) {
    logger.error("Error getting posts", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
