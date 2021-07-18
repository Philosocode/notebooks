const TestingContext = require("../../utils/testing-context.util");

let context;
beforeAll(async () => {
  context = await TestingContext.build();
});

beforeEach(async () => {
  // await context.reset(["user"]);
});

afterAll(async () => {
  return context.close();
});

it("passes", () => {
  expect(1).toBe(1);
});
