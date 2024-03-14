const express = require('express');
const app = express();
const port = 3000;

//import quote.js file
const quoteRouter = require('./quote');

//allow use of route /quote
app.use('/quote', quoteRouter);

//start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});