const express = require("express");
const route = express.Router()
const API = require("../controllers/post")


route.get("/", API.fetchAllUsers)
route.get("/:id", API.fetchUserById)
route.post("/", API.createUser)
route.patch("/:id", API.updateScore)

module.exports = route;
