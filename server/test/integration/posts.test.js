const request = require("supertest");
const db = require("../../util/database");
const { Post } = require("../../models");
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

  it("should return 404 if there is no posts in the DB", async () => {
    const res = await request(server)
      .get(endPoints.getPosts())
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU5NjE2MTQyfQ.OEc73SKkNyHqm7D3YP3DNDh1JkX1K2YYL5uzE5vGxEY"
      );
    expect(res.status).toBe(404);
  });

  it("should return 200 if there is at least one post in the DB", async () => {
    const post = await Post.create({ body: "test post" });
    const res = await request(server)
      .get(endPoints.getPosts())
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTU5NjE2MTQyfQ.OEc73SKkNyHqm7D3YP3DNDh1JkX1K2YYL5uzE5vGxEY"
      );
    expect(res.status).toBe(200);
  });
});
