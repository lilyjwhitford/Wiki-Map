const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserFavouriteAndOwnedMaps = (userId) => {
  const queryParams = [userId];

  const userQueryString = `
  SELECT users.*
  FROM users
  WHERE users.id = $1;`;

  const favouriteMapsQueryString = `
  SELECT map_favourites.*, maps.*
  FROM map_favourites
  JOIN maps ON map_id = maps.id
  WHERE user_id = $1;`;

  const ownedMapsQueryString = `
  SELECT maps.*
  FROM maps
  WHERE owner_id = $1;`;

  const userQuery = db.query(userQueryString, queryParams);
  const favouriteMapsQuery = db.query(favouriteMapsQueryString, queryParams);
  const ownedMapsQuery = db.query(ownedMapsQueryString, queryParams);

  const promiseArray = [userQuery, favouriteMapsQuery, ownedMapsQuery];

  return Promise.all(promiseArray)
  .then(results => {
    console.log(results);
      const user = results[0].rows[0];
      const favourites = results[1].rows;
      const owned = results[2].rows;
      const userObj = { ...user, favourites, owned }
      return userObj;
  })
  .catch((err) => {
    throw new Error('Could not retrieve user, user favs and user maps');
  });
};

module.exports = { getUsers, getUserFavouriteAndOwnedMaps };
