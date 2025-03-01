const express = require('express');
const bodyParser = require('body-parser');
const sessionTokenRoutes = require('./routes/sessionTokenRoutes');
require('dotenv').config();
require('./db');

const app = express();

app.use(bodyParser.json());
app.use('/token', sessionTokenRoutes);

const PORT = process.env.PORT || 1005;
app.listen(PORT, () => {
  console.log(`Session Token Microservice running on port ${PORT}`);
});
