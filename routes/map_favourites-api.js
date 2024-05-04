const express = require('express');
const router = express.Router();
const { addFavourite, deleteFavourite, getFavouriteMaps } = require('../db/queries/map_favourites');

// Get favourite map
router.get('/', (req, res) => {
  const mapID = req.params.map_id;
  const userID = req.cookies.user_id;
  if (!userID) {
    return res.status(401).send('<html><body><h3>Must be logged in to view favourite map</h3></body></html>');
  }
  getFavouriteMaps(userID, mapID)
  .then(maps => {
    res.json({ maps });
  })
  .catch(err => {
    console.log('Error: ',err);
    throw new Error('Failed to get maps');
  })
});

// Adds map
router.post('/:map_id', (req, res) => {
  const mapID = req.params.map_id;
  const userID = req.cookies.user_id;
  if (!userID) {
    return res.status(401).send('<html><body><h3>Must be logged in to add favourite map</h3></body></html>');
  }
  addFavourite(userID, mapID)
  .then(favouriteMap => {
    res.json({ favouriteMap });
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  })
});

// Deletes map
router.post('/:map_id/delete', (req, res) => {
  const mapID = req.params.map_id;
  const userID = req.cookies.user_id;

  if (!userID) {
    return res.status(401).send('<html><body><h3>Must be logged in to delete favourite map</h3></body></html>');
  }

  deleteFavourite(userID, mapID)
  .then(deleted_id => {
    console.log('deleted_id:', deleted_id);
    res.json({ deleted_id });
  })
  .catch(err => {
    res.json({ error: err.message })
  })
});

module.exports = router;
