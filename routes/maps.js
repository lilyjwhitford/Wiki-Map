/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getAllMaps, getSingleMap } = require('../db/queries/maps');
const router  = express.Router();

router.get('/', (req, res) => {
  getAllMaps()
  .then(maps => {
    const templateVars = { maps };
    res.render('maps_index', templateVars);
  })
  .catch((err) => {
    return err.message;
  })
});

// submitting a new map
router.post('/', (req, res) => {
  
});

// view form to create a new map
router.get('/new', (req, res) => {
  
});

// view a single map with the id of map_id
router.get('/:map_id', (req, res) => {
  const mapID = req.params.map_id;
  getSingleMap(mapID)
  .then(map => {
    const templateVars = { map };
    res.render('map', templateVars);
  })
  .catch((err) => {
    return err.message;
  })
});

// edit an existing map with id of map_id
router.post('/:map_id', (req, res) => {
  
});

// delete an existing map with id of map_id
router.post('/:map_id/delete', (req, res) => {
  
});



module.exports = router;
