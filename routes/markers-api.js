/*
 * All routes for Marker Data are defined here
 * Since this file is loaded in server.js into api/maps/,
 *   these routes are mounted onto /api/maps/
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getMarkers, addMarker, deleteMarker, editMarker } = require('../db/queries/markers');
const { getSingleMap } = require('../db/queries/maps');

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
router.post('/:map_id/markers/:marker_id', (req, res) => {
  const markerID = req.params.marker_id;
  const updatedMarker = req.body;
  const userID = req.cookies.user_id;
  if (!userID) {
    return res.status(401).send('Must be logged in to edit marker');
  }
  editMarker(markerID, updatedMarker)
    .then(marker => {
      console.log("marker", marker);
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
  const userID = req.cookies.user_id;
  const markerData = req.body;
  markerData.map_id = req.params.map_id;
  if (!userID) {
    return res.status(401).send('Must be logged in to add marker');
  }
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
router.post('/:map_id/markers/:marker_id/delete', (req, res) => {
  const markerID = req.params.marker_id;
  const userID = req.cookies.user_id;
  if (!userID) {
    return res.status(401).send('<html><body><h3>Must be logged in to delete marker</h3></body></html>');
  }
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
        const templateVars = { lat: map.lat, long: map.long, zoom: 11, markers: map.markers };
        return res.send(templateVars);
      }
      return res.send("map not found");
    })
    .catch((err) => {
      return res.send(err.message);
    });
})


module.exports = router;
