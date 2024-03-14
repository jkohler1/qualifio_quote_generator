const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

//import quote.js file
const quoteRouter = require('./quote');

//resolve cors policy
app.use(cors());
//allow use of route /quote
app.use('/quote', quoteRouter);

//start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
