const { Team } = require('../db');

const createTeam = (allTeams) => {
    
    Promise.all(
        /* Si no usas await, el .map devolverá un array de promesas pendientes, que luego serán resueltas por el Promise.all. El resultado final será el mismo, pero estarás haciendo un paso innecesario  */
        allTeams.map(async (team) => {
            await Team.findOrCreate({where : {name: team}})
        })
    )
}

module.exports = {
    createTeam,
}