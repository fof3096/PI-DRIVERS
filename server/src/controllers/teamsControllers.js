const { Team } = require('../db');

const createTeam = async (allTeams) => {
    try {
        await Promise.all(
            Array.from(allTeams).map(async (team) => {
                await Team.findOrCreate({where : {name: team}})
            })
        )
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createTeam,
}