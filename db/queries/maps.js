const db = require('../connection');

const getAllMaps = () => {
  return Promise.resolve('aw yeah')
};

const getSingleMap = (mapID) => {
  const queryParams = [mapID];
  const queryString = `
  SELECT * FROM maps JOIN users ON owner_id = users.id WHERE maps.id = $1;`;

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
