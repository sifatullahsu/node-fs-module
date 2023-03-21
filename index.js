require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userHandler = require('./v1/routes/user_handler');
const { errorHandler } = require('./middlewares/error_handler');


const app = express();


// middlewares
app.use(express.json());
app.use(cors());


// routes
app.use('/user', userHandler);


// default routes
app.get('/', (req, res) => {
  res.json({ status: true, msg: 'Server is running!' });
});

app.all('*', (req, res) => {
  res.json({ status: false, msg: 'No routes found!' });
});


// error handler
app.use(errorHandler);


// app listen
app.listen(5000, () => console.log('server running on 5000'));