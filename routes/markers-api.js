/*
 * All routes for Marker Data are defined here
 * Since this file is loaded in server.js into api/maps/:map_id/markers,
 *   these routes are mounted onto /api/maps/:map_id/markers
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// get a JSON of all the markers
router.get('/', (req, res) => {
  const query = `SELECT * FROM widgets`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Editing a marker
router.post('/:markers_id', (req, res) => {
 
});

// Add a marker
router.post('/', (req, res) => {
 
});

// Delete a marker
router.post('/delete', (req, res) => {
 
});


module.exports = router;
