const express = require('express');
const errorMiddleware = require('./middleware/errorMiddleware');

require('express-async-errors');
const v1Router = require('./routes');

const app = express();

app.use(express.json());
app.use('/v1', v1Router);

errorMiddleware(app);

module.exports = app;
