const express = require('express');
const app = express();

const routes = require('./src/routes');

routes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('We are live on ' + PORT);
});