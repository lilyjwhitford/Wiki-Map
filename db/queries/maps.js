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
  SELECT *
  FROM maps
  JOIN users ON owner_id = users.id
  WHERE maps.id = $1;`;

  return db.query(queryString, queryParams)
    .then(results => {
      console.log(results);
      const mapObj = results.rows[0];
      return mapObj;
    })
    .catch((err) => {
      return err.message;
    }
    )
};

module.exports = { getAllMaps, getSingleMap };
