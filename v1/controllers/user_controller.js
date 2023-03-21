const crypto = require("crypto");
const fs = require('fs');

const userFile = __dirname + '../../../data/users.json';


module.exports.getRendomUser = (req, res) => {

  const rawData = fs.readFileSync(userFile);
  const users = JSON.parse(rawData);

  const shuffled = users.sort(() => 0.5 - Math.random()).slice(0, 1)[0];


  res.json(shuffled);
}

module.exports.getAllUser = (req, res) => {

  const { limit } = req.query;

  const rawData = fs.readFileSync(userFile);
  const users = JSON.parse(rawData);

  res.json(users.slice(0, limit));
}

module.exports.saveUser = (req, res) => {

  const id = crypto.randomBytes(12).toString("hex");

  const data = req.body;
  const validation = userValidation(data);

  if (validation) {
    return res.status(400).json({ status: false, message: `"${validation}" not found!` });
  }

  const rawUData = fs.readFileSync(userFile);
  const users = JSON.parse(rawUData);

  users.push(
    {
      id,
      gender: data.gender,
      name: data.name,
      contact: data.contact,
      address: data.address,
      photoUrl: data.photoUrl
    }
  );

  fs.writeFileSync(userFile, JSON.stringify(users));

  res.status(200).json({ status: true, message: 'Data save successful!' });
}

module.exports.updateUser = (req, res) => { }

module.exports.updateBulkUser = (req, res) => { }

module.exports.deleteUser = (req, res) => { }