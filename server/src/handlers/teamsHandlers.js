const axios = require("axios");
const { Team } = require('../db');

const getAllTeams = async (req,res)=>{
    try {
        const response = await axios.get("http://localhost:5000/drivers");
        const { data } = response;
        const noRepeat = new Set();

        data.forEach((driver) =>{
            if (driver.teams) {
                let teams = driver.teams.split(",");
                teams.forEach(team => noRepeat.add(team.trim()))
            }            
        })
        await Promise.all(
            Array.from(noRepeat).map(async (team) => {
                await Team.findOrCreate({where : {name: team}})
            })
        )
        res.json(Array.from(noRepeat));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getAllTeams,
}