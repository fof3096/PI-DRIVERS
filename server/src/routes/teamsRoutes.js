/* const axios = require("axios"); */
const { Router } = require("express");
const teamsRoutes = Router();
/* const { Team } = require('../db') */
const {
    getAllTeams
} = require("../handlers/teamsHandlers")

teamsRoutes.get("/",getAllTeams)

module.exports = teamsRoutes;