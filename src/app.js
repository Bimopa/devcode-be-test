import Compression from 'compression';
import Cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

// const Compression = require('compression');
// const Cors = require('cors');
// const express = require('express');
// const morgan = require('morgan');

const app = express();
const port = process.env.MYSQL_PORT;

app.use(
  Cors(),
  express.json({
    limit: '10mb',
  }),
  express.urlencoded({
    limit: '10mb',
    extended: true,
  }),
  Compression(),
);

app.use(morgan('dev'));

app.use(require('./routes/activity'));
app.use(require('./routes/todo'));

app.use(function (error, req, res, next) {

  console.log(error);

  return res.status(500).json({
    message: 'Terjadi kesalahan saat mengolah data',
    status: false,
  });
});

app.use(function (req, res, next) {
  return res.send('404 Page not found!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
