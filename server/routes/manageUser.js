const express = require("express");
const route = express.Router()
const API = require("../controllers/post")


route.get("/", API.fetchAllPosts)
route.get("/:id", API.fetchPostById)
route.post("/", API.createPost)

module.exports = route;
