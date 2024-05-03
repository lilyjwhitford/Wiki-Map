
const db = require('../connection');

const getAllMaps = () => {
  const queryString = `SELECT * FROM maps JOIN users ON owner_id = users.id;`;

  return db.query(queryString)
    .then(results => {
      const mapsObj = results.rows;
      return mapsObj;
    })
    .catch((err) => {
      return err.message;
    })
};

const getSingleMap = (mapID) => {
  const queryParams = [mapID];
  const queryString = `
  SELECT maps.*, users.username
  FROM maps
  JOIN users ON owner_id = users.id
  WHERE maps.id = $1
  GROUP BY maps.id, users.id`;

  const markerQueryString = `
  SELECT markers.*
  FROM markers
  JOIN maps ON maps.id = markers.map_id
  WHERE maps.id = $1
  GROUP BY markers.id;`;

  const mapQuery = db.query(queryString, queryParams);
  const markerQuery = db.query(markerQueryString, queryParams);

  const promiseArray = [mapQuery, markerQuery];

  return Promise.all(promiseArray)
    .then(results => {
      console.log(results);
      const map = results[0].rows[0];
      const markers = results[1].rows;
      const mapObj = { ...map, markers }
      return mapObj;
    })
    .catch((err) => {
      return err.message;
    }
    )
};

const createMap = (option) => {
  // deconstruct the parameter
  const { owner_id, title, lat, long, description, image_url } = option;

  return db.query(`
  INSERT INTO maps (owner_id, title, lat, long, description, image_url) VALUES
  ($1, $2, $3, $4, $5, $6) RETURNING *;
  `, [owner_id, title, lat, long, description, image_url])
    .then(result => {
      console.log('createMap Results: ', result);
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
      throw new Error('Failed to create new map');
    })
};

module.exports = { getAllMaps, getSingleMap, createMap };
