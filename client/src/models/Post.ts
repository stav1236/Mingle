export interface Comment {
  text: string;
  userId: string;
}

export interface Like {
  userId: string;
}

export interface Post {
  _id: string;
  text?: string;
  imgSrc?: string;
  creatorId: string;
  comments: Comment[];
  likes: Like[];
  updatedAt: string;
  createdAt: string;
}
