/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getAllMaps } = require('../db/queries/maps');
const router  = express.Router();

router.get('/', (req, res) => {
  getAllMaps()
  .then(maps => {
    const templateVars = { maps };
    res.render('maps', templateVars);
  })
});



module.exports = router;
