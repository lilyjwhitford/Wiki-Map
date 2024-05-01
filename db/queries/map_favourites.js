const db = require('../connection');

const addFavourite = option => {
  const { user_id, map_id } = option;

  return db.query(`
  INSERT INTO map_favourites (user_id, map_id) VALUES
  ($1, $2) RETURNING *
  ;`, [user_id, map_id])
  .then(result => {
    console.log('addFavourite Result: ', result);
    return result.rows[0];
  })
  .catch(err => {
    console.error(err);
    throw new Error('Could not add to favourite')
  });
};

const deleteFavourite = mapId => {
  return db.query(`
  DELETE FROM map_favourites WHERE map_id = $1
  ;`, [mapId])
  .then(result => {
    console.log('Succesfully deleted');
  })
  .catch(err => {
    console.error(err);
    throw new Error('Could not delete map');
  });
};

const checkFavouriteMap = (mapID, userID) => {
  return db.query(`
  SELECT * FROM map_favourites WHERE map_id = $1 AND user_id = $2
  `, [mapID, userID])
  .then(result => {
    if (result.rows.length === 0) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports = { addFavourite, deleteFavourite, checkFavouriteMap };
