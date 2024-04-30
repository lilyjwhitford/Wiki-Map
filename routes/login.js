const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  // set a cookie as a string value
  res.cookie('user_id', req.params.id);

  // redirect to homepage
  res.redirect('/');
});

module.exports = router;
