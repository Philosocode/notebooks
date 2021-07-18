const userModel = require("../user.model");
const TestingContext = require("../../utils/testing-context.util");

let context;
let db;
beforeAll(async () => {
  context = await TestingContext.build();
  db = context.db;
});

beforeEach(async () => {
  await db.raw(`DELETE FROM "user"`);
});

afterAll(async () => {
  return context.close();
});

describe("createUser", () => {
  it("creates a user with a valid email and password", async () => {
    const name = "Test";
    const email = "test@test.com";
    const password = "!hello@WORLD.";

    await userModel.createUser(name, email, password, db);

    const res = await db("user").where({ email }).first();

    expect(res.email).toBe(email);
  });
});