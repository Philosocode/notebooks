const supertest = require("supertest");
const buildApp = require("./app");

const TestingContext = require("./utils/testing-context.util");

module.exports = function () {
  let context;
  let db;
  let api;

  beforeAll(async () => {
    context = await TestingContext.build();
    db = context.db;
    api = supertest(buildApp(db));

    global.api = api;
    global.db = db;
  });

  beforeEach(async () => {
    await db.seed.run();
  });

  afterAll(async () => {
    return context.close();
  });
};
