const db = require('../connection');

const getMarkers = (map_id) => {
  const queryParams = [map_id];
  const queryString = `SELECT * FROM markers WHERE map_id = $1;`;

  return db.query(queryString, queryParams)
    .then(results => {
      console.log(results);
      return results.rows;
    })
    .catch((err) => {
      return err.message;
    });
};

const editMarker = (markerID, updatedMarker) => {
  const { lat, long, title, description, image_url } = updatedMarker;

  const queryParams = [lat, long, title, description, image_url, markerID];
  const queryString = `
    UPDATE markers
    SET lat = $1, long = $2, title = $3, description = $4, image_url = $5
    WHERE id = $6
    RETURNING id
    ;`;

  return db.query(queryString, queryParams)
    .then(results => {
      return results.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
}

const addMarker = (markerData) => {
  const { creator_id, map_id, lat, long, title, description, image_url } = markerData;

  const queryParams = [creator_id, map_id, lat, long, title, description, image_url];
  const queryString = `
    INSERT INTO markers (creator_id, map_id, lat, long, title, description, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    ;`;

  return db.query(queryString, queryParams)
    .then(results => {
      return results.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
};

const deleteMarker = (markerID) => {
  const queryParams = [markerID];
  const queryString = `DELETE FROM markers WHERE id = $1 RETURNING id;`;

  return db.query(queryString, queryParams)
    .then(results => {
      return results.rows[0];
    })
    .catch((err) => {
      return err.message;
    });
}



module.exports = { getMarkers, addMarker, deleteMarker, editMarker }

