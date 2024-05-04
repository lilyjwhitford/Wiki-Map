const db = require('../connection');

const addFavourite = (user_id, map_id) => {
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

const deleteFavourite = (user_id, map_id) => {
  return db.query(`
  DELETE FROM map_favourites WHERE user_id = $1 AND map_id = $2
  ;`, [user_id, map_id])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.error(err);
    throw new Error('Could not delete map');
  });
};

const getFavouriteMaps = (user_id, map_id) => {
  return db.query(`
  SELECT * FROM map_favourites WHERE user_id = $1 AND map_id = $2
  `, [user_id, map_id])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    throw new Error('Could not retrieve map');
  });
};

module.exports = { addFavourite, deleteFavourite, getFavouriteMaps };
