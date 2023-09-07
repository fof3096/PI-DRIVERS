// LIBRERIAS
const axios = require("axios");

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
        // Busca el "team" en la DB y sí no encuentra lo crea
        const AllTeams = Array.from(noRepeat).sort();
        createTeam(AllTeams);

        res.json(AllTeams);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllTeams,
}