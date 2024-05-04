/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into /maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getAllMaps, getSingleMap, createMap } = require('../db/queries/maps');
const { getFavouriteMaps } = require('../db/queries/map_favourites');
const router = express.Router();

router.get("/", (req, res) => {
  getAllMaps()
    .then((maps) => {
      const templateVars = { maps };
      res.render("maps_index", templateVars);
    })
    .catch((err) => {
      res.send("maps not found");
    });
});

// submitting a new map
router.post("/", (req, res) => { });

router.post("/new", (req, res) => {
  const userId = req.cookies.user_id;
  if (!userId) {
    return res
      .status(401)
      .send(
        "<html><body><h3>You must be logged in to create a map.</body></html>"
      );
  }
  const newMap = req.body;
  newMap.owner_id = userId;

  createMap(newMap)
    .then(map => {
      console.log(map);
      res.redirect(`/maps/${map.id}`);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Failed to create a map');
    })

});

// view form to create a new map
router.get("/new", (req, res) => {
  // assign userId to the current session cookie
  const userId = req.cookies.user_id;
  // if there isnt a session cookie return 401
  if (!userId) {
    return res
      .status(401)
      .send(
        "<html><body><h3>You must be logged in to create a map.</body></html>"
      );
  }
  res.render("maps_new", {});
});

// view a single map with the id of map_id
router.get("/:map_id", (req, res) => {
  const mapID = req.params.map_id;
  const userID = req.cookies.user_id;
  Promise.all([getSingleMap(mapID), getFavouriteMaps(userID, mapID)])
    .then(([map, favouriteMap]) => {
      if (map) {
        const templateVars = { map, mapData: { lat: map.lat, long: map.long, zoom: 11, markers: map.markers}, favouriteMap };
        return res.render("map", templateVars);
      }
      return res.send("map not found");
    })
    .catch((err) => {
      return res.send(err.message);
    });
});

// check cookie to view maps
router.get("/maps", (req, res) => {
  let user = null;
  if (req.cookies.user) {
    user = { username: req.cookies.user };
  }
  res.render("maps_index", { user });
});

module.exports = router;
