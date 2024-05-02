const express = require('express');
const router = express.Router();
const { addFavourite, deleteFavourite, getFavouriteMaps } = require('../db/queries/map_favourites');

// Get favourite map
router.get('/', (req, res) => {
  const mapID = req.params.map_id;
  const userID = req.cookies.user_id;

  getFavouriteMaps(mapID, userID)
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

  addFavourite(mapID, userID)
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

  deleteFavourite(mapID, userID)
  .then(deleted_id => {
    res.json({ deleted_id });
  })
  .catch(err => {
    res.json({ success: false, error: err })
  })
});


module.exports = router;
