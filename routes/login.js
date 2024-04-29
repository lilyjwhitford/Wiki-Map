const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // send the user somewhere
  res.redirect('/');
});

module.exports = router;
