const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // clear user_id cookie
  res.clearCookie("user_id");

  // redirect back to homepage
  res.redirect('/');
});

module.exports = router;
