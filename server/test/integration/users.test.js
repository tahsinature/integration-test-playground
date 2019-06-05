const request = require("supertest");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const config = require("config");
const db = require("../../util/database");

// const { createSomeUser } = require("../../seeds/user");

let server;
const endPoints = {
  getAllUsers: () => "/api/users",
  createUser: () => "/api/users",
  getSingleUser: id => "/api/users/" + id,
  editUser: id => "/api/users/" + id,
  deleteUser: id => "/api/users/" + id
};

describe("/user", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    server = require("../../bin/www");
  });
  afterEach(async () => {
    await db.sync({ force: true });
    server.close();
  });
  describe("GET /", () => {
    it("should return all available users", async () => {
      const bulkData = [
        { name: "user1", age: 22 },
        { name: "user2", age: 15 },
        { name: "user3", age: 10 }
      ];
      User.bulkCreate(bulkData);
      const res = await request(server).get(endPoints.getAllUsers());
      expect(res.status).toBe(200);
      expect(res.body.result.length).toBe(3);
      expect(res.body.result.some(ele => ele.name === "user1")).toBeTruthy();
      expect(res.body.result).toMatchObject(bulkData);
    });
    it("should return 404 error if there is no users in DB", async () => {
      const res = await request(server).get(endPoints.getAllUsers());
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return 400 response if necessary data is not given", async () => {
      const res = await request(server)
        .post(endPoints.createUser())
        .send({ name: "a" });
      expect(res.status).toBe(400);
    });
    it("should create a user with given input", async () => {
      const userData = { name: "test", age: 1 };
      const res = await request(server)
        .post(endPoints.createUser())
        .send(userData);
      const users = await User.findAll({ raw: true });
      expect(res.status).toBe(200);
      expect(users.length).toBe(1);
      expect(users[0]).toMatchObject(userData);
      const decoded = jwt.verify(
        res.body.result.token,
        config.get("jwtPrivateKey")
      );
      expect(decoded.id).toBe(users[0].id);
    });
  });

  describe("GET /:id", () => {
    it("should return 404 error if there is no user by given id", async () => {
      const res = await request(server).get(endPoints.getSingleUser(2));
      expect(res.status).toBe(404);
    });

    it("should return a user by url param id", async () => {
      const data = { name: "user1", age: 22 };
      User.create(data);
      const res = await request(server).get(endPoints.getSingleUser(1));
      expect(res.status).toBe(200);
      expect(res.body.result).toMatchObject(data);
    });
  });

  describe("PUT /:id", () => {
    it("should return 404 error if there is no user by given id", async () => {
      const res = await request(server).get(endPoints.editUser(2));
      expect(res.status).toBe(404);
    });

    it("should return edited user by given data", async () => {
      const newData = { name: "new user", age: 1 };
      const editData = { name: "edited user", age: 2 };
      User.create(newData);
      const res = await request(server)
        .put(endPoints.editUser(1))
        .send(editData);
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /:id", () => {
    it("should return 404 error if there is no user by given id", async () => {
      const res = await request(server).get(endPoints.deleteUser(1));
      expect(res.status).toBe(404);
    });

    it("should return edited user by given data", async () => {
      const newData = { name: "new user", age: 1 };
      User.create(newData);
      const res = await request(server).delete(endPoints.deleteUser(1));
      const users = await User.findAll();
      expect(res.status).toBe(200);
      expect(users.length).toBe(0);
    });
  });
});
