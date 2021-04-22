const { getUsers } = require("./user.model");

module.exports = async function (_, res) {
  const users = await getUsers();

  res.send({
    status: "success",
    data: users,
  });
};
