const crypto = require("crypto");
const fs = require('fs');

const userFile = __dirname + '../../../data/users.json';


module.exports.getRendomUser = (req, res) => {

  const rawData = fs.readFileSync(userFile);
  const users = JSON.parse(rawData);

  const shuffled = users.sort(() => 0.5 - Math.random()).slice(0, 1)[0];


  res.status(200).json({ status: true, data: shuffled });
}

module.exports.getAllUser = (req, res) => {

  const { limit } = req.query;

  const rawData = fs.readFileSync(userFile);
  const users = JSON.parse(rawData);

  res.status(200).json({ status: true, data: users.slice(0, limit) });
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

  res.status(200).json({ status: true, message: 'User save successful!' });
}

module.exports.updateUser = (req, res) => {

  const { id } = req.query;
  const data = req.body;

  const rawUData = fs.readFileSync(userFile);
  const users = JSON.parse(rawUData);

  const result = users.map(user => {

    if (user.id === id) {
      data?.gender ? user.gender = data.gender : null;
      data?.name ? user.name = data.name : null;
      data?.contact ? user.contact = data.contact : null;
      data?.address ? user.address = data.address : null;
      data?.photoUrl ? user.photoUrl = data.photoUrl : null;
    }

    return user;
  });

  fs.writeFileSync(userFile, JSON.stringify(result));

  res.status(200).json({ status: true, message: 'User update successful!' });
}

module.exports.updateBulkUser = (req, res) => { }

module.exports.deleteUser = (req, res) => { }