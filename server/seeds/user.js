const { User } = require("../models");
const faker = require("faker");

exports.createSomeUser = num => {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push({
      name: faker.name.findName(),
      age: faker.random.number({ min: 1, max: 100 })
    });
  }
  User.bulkCreate(data)
    .then(() => {
      console.log("User seeds complete: " + num);
    })
    .catch(err => console.log(err.message));
};
