/*
 * All routes for Marker Data are defined here
 * Since this file is loaded in server.js into api/maps/:map_id/markers,
 *   these routes are mounted onto /api/maps/:map_id/markers
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getMarkers, addMarker, deleteMarker, editMarker } = require('../db/queries/markers');
const { getSingleMap } = require('../db/queries/maps');

// any routes will come AFTER /api/maps/:map_id/markers/

// get a JSON/fetch marker for a specific map
router.get('/', (req, res) => {
  const map_id = req.params.map_id;

  getMarkers(map_id)
    .then(markers => {
      res.json({ markers })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// edit a marker
router.post('/:marker_id', (req, res) => {
  const markerID = req.params.markerID;
  const updatedMarker = req.body;

  editMarker(markerID, updatedMarker)
    .then(marker => {
      res.json({ marker })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// add a marker to a specific map
router.post('/:map_id/markers', (req, res) => {
  const markerData = req.body;
  markerData.map_id = req.params.map_id; // include map_id in req body?

  addMarker(markerData)
    .then(marker => {
      res.json({ marker })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// delete a marker form a specific map
router.post('/:marker_id/delete', (req, res) => {
  const markerID = req.body.id;

  deleteMarker(markerID)
    .then(marker => {
      res.json({ marker })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:map_id', (req, res) => {
  const mapID = req.params.map_id;
  getSingleMap(mapID)
    .then((map) => {
      if (map) {
        console.log("map----", map)
        const templateVars = { lat: map.lat, long: map.long, zoom: 11, markers: map.markers };
        console.log("templateVars------", templateVars);
        return res.send(templateVars);
      }
      return res.send("map not found");
    })
    .catch((err) => {
      return res.send(err.message);
    });
})


module.exports = router;
