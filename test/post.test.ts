import request from "supertest";
import mongoose from "mongoose";
import { Express } from "express";

import initApp from "../src/app";
import User from "../src/data/models/User";
import Post from "../src/data/models/Post";
import path from "path";

let app: Express;

const TEST_USERS = [
  {
    firstName: "firstName",
    lastName: "lastName",
    email: "test",
    password: "test",
    birthDate: Date.now(),
    gender: "זכר",
  },
  {
    firstName: "firstName",
    lastName: "lastName",
    email: "test1",
    password: "test",
    birthDate: Date.UTC(2001, 7, 11, 0, 0, 0),
    gender: "זכר",
  },
];
const TEST_POSTS = [
  {
    text: "post 1",
  },
  {
    text: "post 2",
  },
];

let accessToken: string, postId: string;
const userIds: string[] = [],
  postIds: string[] = [];

const saveTestUsers = async () => {
  try {
    await Promise.all(
      TEST_USERS.map(async (user) => {
        const testUser = new User(user);
        testUser.password =
          "$2b$10$l6s/qb7E3gAsMLtx97huiOzxBmIRm1Rrg50/Gi.JW0yJ1rM7TPORy"; // hashed password
        await testUser.save();
        userIds.push(testUser._id.toString());
      })
    );

    console.log("Test users saved successfully.");
  } catch (error) {
    console.error("Error saving test users:", error);
  }
};

const saveTestPosts = async () => {
  try {
    await Promise.all(
      TEST_POSTS.map(async (post, index) => {
        const testPost = new Post(post);
        testPost.creatorId = userIds[
          index
        ] as unknown as mongoose.Types.ObjectId;

        await testPost.save();
        postIds.push(testPost._id.toString());
      })
    );

    console.log("Test posts saved successfully.");
  } catch (error) {
    console.error("Error saving test posts:", error);
  }
};

beforeAll(async () => {
  app = await initApp();

  await User.deleteMany();
  await Post.deleteMany();

  await saveTestUsers();
  await saveTestPosts();

  const response = await request(app)
    .post("/api/auth/login")
    .send({ email: TEST_USERS[0].email, password: TEST_USERS[0].password });

  accessToken = response.body.accessToken;
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("GET api/posts/media", () => {
  it("should get all posts except self posts", async () => {
    const response = await request(app)
      .get("/api/posts/media")
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    expect(
      [...response.body.posts].every(
        (post: Post) => post?.creatorId?.toString() !== userIds[0]
      )
    ).toBeTruthy();
  });
});

describe("GET api/posts/feed/{creatorId}", () => {
  it("should get all post of specific user", async () => {
    const response = await request(app)
      .get(`/api/posts/feed/${userIds[1]}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    expect(
      [...response.body.posts].every(
        (post: Post) => post?.creatorId?.toString() === userIds[1]
      )
    ).toBeTruthy();
  });

  it("error while try get feed of bad user", async () => {
    const response = await request(app)
      .get(`/api/posts/feed/bad`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
});

describe("POST api/posts", () => {
  it("publish post with text", async () => {
    await request(app)
      .post(`/api/posts`)
      .send({ text: "post text" })
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);
  });
  it("publish post with image", async () => {
    const filePath = path.join(__dirname, "assets", "test.png");

    await request(app)
      .post(`/api/posts`)
      .attach("image", filePath)
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);
  });
});

describe("POST api/posts/like", () => {
  it("like post", async () => {
    const postId = postIds[0];
    await request(app)
      .post(`/api/posts/like`)
      .send({ postId })
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    const postDB = await Post.findById(postId);
    expect(
      postDB?.likes?.some((like) => like?.userId?.toString() === userIds[0])
    ).toBeTruthy();
  });
  it("un like post", async () => {
    const postId = postIds[0];

    await request(app)
      .post(`/api/posts/like`)
      .send({ postId })
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    const postDB = await Post.findById(postId);
    expect(
      postDB?.likes?.some((like) => like?.userId?.toString() === userIds[0])
    ).toBeFalsy();
  });
  it("like not exists post", async () => {
    await request(app)
      .post(`/api/posts/like`)
      .send({ postId: "no exist" })
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
});

describe("POST api/posts/comment", () => {
  it("comment on post", async () => {
    const postId = postIds[0];

    const text = "my comment";
    await request(app)
      .post(`/api/posts/comment`)
      .send({
        postId,
        text,
      })
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    const postDB = await Post.findById(postId);
    expect(
      postDB?.comments?.some(
        (comment) =>
          comment?.userId?.toString() === userIds[0] && comment?.text == text
      )
    ).toBeTruthy();
  });
  it("comment not exists post", async () => {
    await request(app)
      .post(`/api/posts/comment`)
      .send({
        postId: "non exist post",
        text: "my comment",
      })
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
});

describe("PUT api/posts/:postId/:newText", () => {
  it("edit post", async () => {
    const text = "my comment edited";
    await request(app)
      .put(`/api/posts/${postIds[0]}/${text}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    const postDB = await Post.findById(postIds[0]);
    expect(postDB?.text).toBe(text);
  });
  it("edit other user post", async () => {
    const text = "my comment edited";
    await request(app)
      .put(`/api/posts/${postIds[1]}/${text}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
  it("edit not exists post", async () => {
    const text = "my comment edited";
    await request(app)
      .put(`/api/posts/nonexits/${text}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
});

describe("DELETE api/posts/:postId", () => {
  it("delete post", async () => {
    await request(app)
      .delete(`/api/posts/${postIds[0]}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(200);

    const postDB = await Post.findById(postIds[0]);
    expect(postDB).toBeNull();
  });
  it("delete other user post", async () => {
    await request(app)
      .delete(`/api/posts/${postIds[1]}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
  it("delete not exists post", async () => {
    await request(app)
      .delete(`/api/posts/${postIds[0]}`)
      .set("Authorization", "Bearer " + accessToken)
      .expect(500);
  });
});
