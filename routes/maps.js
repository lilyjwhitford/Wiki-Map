/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getAllMaps, getSingleMap } = require('../db/queries/maps');
const router = express.Router();

router.get('/', (req, res) => {
  getAllMaps()
    .then(maps => {
      const templateVars = { maps };
      res.render('maps_index', templateVars);
    })
    .catch((err) => {
      res.send("maps not found");
    })
});

// submitting a new map
router.post('/', (req, res) => {

});

// view form to create a new map
// route is maps/new
router.get('/new', (req, res) => {
  // assign userId to the current session cookie
  const userId = req.cookies.user_id;
  // if there isnt a session cookie return 401
  if (!userId) {
    return res.status(401).send('<html><body><h3>You must be logged in to create a map.</body></html>')
  }
  res.render('maps_new', {});
});

// view a single map with the id of map_id
router.get('/:map_id', (req, res) => {
  const mapID = req.params.map_id;
  getSingleMap(mapID)
    .then(map => {
      if (map) {
        const templateVars = { map, mapData: { lat: map.lat, long: map.long, zoom: 13, markers: [] } };
        return res.render('map', templateVars);
      }
      return res.send("map not found");
    })
    .catch((err) => {
      return res.send(err.message);
    })
});

// edit an existing map with id of map_id
router.post('/:map_id', (req, res) => {

});

// delete an existing map with id of map_id
router.post('/:map_id/delete', (req, res) => {

});

module.exports = router;
