// LIBRERIAS
const axios = require("axios");

// MODELOS
/* const { Team } = require('../db'); */

// CONTROLLERS
const { createTeam } = require("../controllers/teamsControllers");

// HANDLER
const getAllTeams = async (req,res)=>{
    try {
        const response = await axios.get("http://localhost:5000/drivers");
        const { data } = response;
        const noRepeat = new Set();

        // Recorre cada "driver"
        data.forEach((driver) =>{
            // En caso de tener "teams" los convierte a array
            if (driver.teams) {
                let teams = driver.teams.split(",");
                // Recorre cada "team" y lo agrega al set "noRepeat"
                teams.forEach(team => noRepeat.add(team.trim()))
            }            
        })

        createTeam(noRepeat);
        /* await Promise.all(
            Array.from(noRepeat).map(async (team) => {
                await Team.findOrCreate({where : {name: team}})
            })
        ) */
        res.json(Array.from(noRepeat));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllTeams,
}