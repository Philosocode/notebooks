jest.mock("../auth.util.js", () => ({
  verifyPassword: (password1, password2) => password1 === password2,
  createToken: () => "token",
}));

const testSetup = require("../../jest.setup");

testSetup();

describe("getUser Handler", () => {
  it("can login with a valid email and password", async () => {
    const result = await api
      .post("/api/v1/auth/login")
      .send({ email: "yggdrasil@gmail.com", password: "password" });

    expect(result.status).toBe(200);
  });
});
