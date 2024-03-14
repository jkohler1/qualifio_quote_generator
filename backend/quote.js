const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/',async (req, res) => {
  try {
    //get request to quotable API
    const response = await axios.get('https://api.quotable.io/quotes/random'); //await because axios return Promise
    
    //extraction the citation from de response
    const { content, author } = response.data[0]; //response.data is an array need to take the first elem
    //return response in JSON format
    res.json({ content, author });
  } catch (error) {
    //Throw error to frontend if error during the process
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de la citation' });
  }
});

module.exports = router;
