const { User } = require("../models");
const faker = require("faker");

const data = [];
for (let i = 0; i < 10; i++) {
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
