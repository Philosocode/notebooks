const seedData = [
  {
    google_id: "yggdrasil",
    name: "Yggdrasil Learner",
    email: "yggdrasil@gmail.com",
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
