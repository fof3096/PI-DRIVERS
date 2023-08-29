const axios = require("axios");
const { Router } = require("express");
const teamsRoutes = Router();
const { Team } = require('../db')

const noRepeat = new Set();

teamsRoutes.get("/",async (req,res)=>{
    try {
        const response = await axios.get("http://localhost:5000/drivers");
        const { data } = response;

        await data.forEach(async (driver) =>{
            if (driver.teams) {
                let teams = driver.teams.split(",");
                await teams.forEach(team => noRepeat.add({name: team.trim()}))
            }            
        })
        await Team.bulkCreate(Array.from(noRepeat));
        res.json(Array.from(noRepeat));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = teamsRoutes;