const request = require("supertest");
const db = require("../../util/database");
const { User, Post } = require("../../models");
const { createUserAndGetToken } = require("./tools");

let server;

const endPoints = {
  getPosts: () => "/api/posts"
};

describe("/posts", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    server = require("../../bin/www");
  });
  afterEach(async () => {
    server.close();
  });

  let token;

  const exec = async url => {
    token = await createUserAndGetToken();
    return request(server)
      .get(url)
      .set("authorization", "Bearer " + token);
  };

  it("should return 404 if there is no posts in the DB", async () => {
    const res = await exec(endPoints.getPosts());
    expect(res.status).toBe(404);
  });

  it("should return 200 if there is at least one post in the DB", async () => {
    await Post.create({ body: "test post" });
    const res = await exec(endPoints.getPosts());
    expect(res.status).toBe(200);
  });
});
