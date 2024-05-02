const db = require('../connection');

const addFavourite = (map_id, user_id) => {
  return db.query(`
  INSERT INTO map_favourites (user_id, map_id) VALUES
  ($1, $2) RETURNING *
  ;`, [map_id, user_id])
  .then(result => {
    console.log('addFavourite Result: ', result);
    return result.rows[0];
  })
  .catch(err => {
    console.error(err);
    throw new Error('Could not add to favourite')
  });
};

const deleteFavourite = (map_id, user_id) => {
  return db.query(`
  DELETE FROM map_favourites WHERE map_id = $1 AND user_id = $2
  ;`, [map_id, user_id])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.error(err);
    throw new Error('Could not delete map');
  });
};

const getFavouriteMaps = (map_id, user_id) => {
  return db.query(`
  SELECT * FROM map_favourites WHERE map_id = $1 AND user_id = $2
  `, [map_id, user_id])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    throw new Error('Could not retrieve map');
  });
};

// const checkFavouriteMap = (mapID, userID) => {
//   return db.query(`
//   SELECT * FROM map_favourites WHERE map_id = $1 AND user_id = $2
//   `, [mapID, userID])
//   .then(result => {
  //     if (result.rows.length === 0) {
//       return false;
//     } else {
//       return true;
//     }
//   });
// };

module.exports = { addFavourite, deleteFavourite, getFavouriteMaps };
