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
  .then(mapsObj => {
    const templateVars = { mapsObj };
    console.log("templateVars-----", templateVars);
    res.render('maps_index', templateVars);
  })
});

// submitting a new map
// submitting new map on '/'??
router.post('/', (req, res) => {

});

// view form to create a new map
// route is maps/new
router.get('/new', (req, res) => {
  res.render('maps_new', { });
});

// view a single map with the id of map_id
router.get('/:map_id', (req, res) => {
  const mapID = req.params.map_id;
  getSingleMap(mapID)
  .then (map => {
    const templateVars = { map };
    res.render('map', templateVars);
  })
});

// edit an existing map with id of map_id
router.post('/:map_id', (req, res) => {

});

// delete an existing map with id of map_id
router.post('/:map_id/delete', (req, res) => {

});



module.exports = router;
