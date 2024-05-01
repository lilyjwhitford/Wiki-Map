// routes/login.js

const express = require("express");
const router = express.Router();

const users = {
  MapLover10: {
    username: "MapLover10",
    email: "pirate@gmail.com",
    password: "password",
  },
  TechGuru42: {
    username: "TechGuru42",
    email: "alice@yahoo.com",
    password: "password",
  },
  FoodieQueen: {
    username: "FoodieQueen",
    email: "bob@example.com",
    password: "password",
  },
  TravelJunkie: {
    username: "TravelJunkie",
    email: "charlie@travel.com",
    password: "password",
  },
  FitnessFanatic: {
    username: "FitnessFanatic",
    email: "dana@fitness.com",
    password: "password",
  },
};

function getUser(email, usersDatabase) {
  for (const username in usersDatabase) {
    if (usersDatabase[username].email === email) {
      return usersDatabase[username];
    }
  }
  return null;
}

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const user = getUser(email, users);
  if (!user) {
    return res.status(403).send("User not found.");
  }
  if (user.password !== password) {
    return res.status(403).send("Wrong password.");
  }
  res.cookie("user", user.username, { httpOnly: true });
  res.redirect("/maps");
});
// Update the GET route to check the cookie
router.get("/", (req, res) => {
  if (req.cookies.user) {
    res.redirect("/maps");
  } else {
    res.render("login");
  }
});

module.exports = router;
