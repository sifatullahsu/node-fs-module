const crypto = require("crypto");
const fs = require('fs');
const path = require('path');

const userFile = path.join(process.cwd(), './data/users.json');

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

  if (!id) {
    return res.status(400).json({ status: false, message: `Query "id" not found!` });
  }

  const rawUData = fs.readFileSync(userFile);
  const users = JSON.parse(rawUData);

  let count = 0;

  const result = users.map(user => {

    if (user.id === id) {

      count += 1;

      data?.gender ? user.gender = data.gender : null;
      data?.name ? user.name = data.name : null;
      data?.contact ? user.contact = data.contact : null;
      data?.address ? user.address = data.address : null;
      data?.photoUrl ? user.photoUrl = data.photoUrl : null;
    }

    return user;
  });


  if (count > 0) {
    fs.writeFileSync(userFile, JSON.stringify(result));
    res.status(200).json({ status: true, message: 'User update successful!' });
  }
  else {
    res.status(400).json({ status: false, message: 'User id not valid!' });
  }
}

module.exports.updateBulkUser = (req, res) => {

  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ status: false, message: `Data should be an array of object with id!` });
  }

  const rawUData = fs.readFileSync(userFile);
  const users = JSON.parse(rawUData);

  let count = 0;

  const result = users.map(user => {
    const record = data?.filter(item => item.id === user.id);

    if (record.length > 0) {
      count += 1;

      record[0]?.gender ? user.gender = record[0].gender : null;
      record[0]?.name ? user.name = record[0].name : null;
      record[0]?.contact ? user.contact = record[0].contact : null;
      record[0]?.address ? user.address = record[0].address : null;
      record[0]?.photoUrl ? user.photoUrl = record[0].photoUrl : null;
    }

    return user;
  });


  if (count > 0) {
    fs.writeFileSync(userFile, JSON.stringify(result));

    const msg = `${count} user update successful!${data.length !== count ? ` ${data.length - count} user id not valid!` : ''}`;
    res.status(200).json({ status: true, message: msg });
  }
  else {
    res.status(400).json({ status: false, message: 'User id not valid!' });
  }
}

module.exports.deleteUser = (req, res) => {

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ status: false, message: `Query "id" not found!` });
  }

  const rawUData = fs.readFileSync(userFile);
  const users = JSON.parse(rawUData);

  const result = users.filter(user => user.id !== id);

  if (users.length > result.length) {
    fs.writeFileSync(userFile, JSON.stringify(result));
    res.status(200).json({ status: true, message: 'User delete successful!' });
  }
  else {
    res.status(400).json({ status: false, message: 'User id not valid!' });
  }
}