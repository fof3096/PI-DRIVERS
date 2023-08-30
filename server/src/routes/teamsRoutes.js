const axios = require("axios");
const { Router } = require("express");
const teamsRoutes = Router();
const { Team } = require('../db')


teamsRoutes.get("/",async (req,res)=>{
    try {
        const response = await axios.get("http://localhost:5000/drivers");
        const { data } = response;
        const noRepeat = new Set();

        await data.forEach(async (driver) =>{
            if (driver.teams) {
                let teams = driver.teams.split(",");
                await teams.forEach(team => noRepeat.add(team.trim()))
            }            
        })
        const toCreate = Array.from(noRepeat).map(team => {
            return {name: team}
        })
        await Team.bulkCreate(toCreate);
        band = true;
        res.json(Array.from(noRepeat));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = teamsRoutes;