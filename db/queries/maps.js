const db = require('../connection');

const getAllMaps = () => {
  const queryString = `SELECT * FROM maps JOIN users owner_id = users.id;`;

  db.query(queryString)
  .then((results) => {
    let mapsObj = results.rows;
    return mapsObj;
  })
  .catch((err) => {
    return err.message
  })
};

const getSingleMap = (mapID) => {
  const queryParams = [mapID];
  const queryString = `
  SELECT * 
  FROM maps 
  JOIN users ON owner_id = users.id 
  WHERE maps.id = $1;`;

  db.query(queryString, queryParams)
  .then((results) => {
    let mapObj = results.rows[0];
    return mapObj;
  })
  .catch((err) => {
    return err.message
  }
)};

module.exports = { getAllMaps, getSingleMap };
