const express = require("express");
const { userRegister } = require("../controllers/auth.controller");

const Router = express.Router();

// POST register user
// GET  "http://localhost:9000/user/register"
// @desc  : user register

Router.post("/register", userRegister);

// POST login user
// GET  "http://localhost:9000/user/login"
// @desc  : user login

module.exports = Router;
