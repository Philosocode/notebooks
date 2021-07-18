const seedData = [
  {
    name: "Yggdrasil Learner",
    email: "yggdrasil@gmail.com",
    password: "password",
    photo_url: "photo_url",
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert(seedData);
    });
};
