
/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUserFavouriteAndOwnedMaps } = require('../db/queries/users.js');

router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;
  getUserFavouriteAndOwnedMaps(userId)
  .then(user => {
    if (!user) {
      return res.status(404).send(`No user with ID of ${userId}`);
    }
      const templateVars = { user }
      res.render('profile', templateVars)
    })
    .catch((err) => {
      return res.send(err.message);
    });
  });

module.exports = router;
