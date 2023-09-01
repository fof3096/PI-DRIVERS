const { Op } = require("sequelize");
const { Driver, Team, Driver_Team } = require('../db');

/* DATA BASE */
const searchDriverByForenameAndSurname = (name) => {
    return Driver.findAll({
        where: {
            [Op.or]: [
                {
                    forename:{
                        [Op.startsWith]: name
                    }
                },
                {
                    surname:{
                        [Op.startsWith]: name
                    }
                }
            ]
        }
    })
}
const searchRelationsDB = (driverID) => {
    return Driver_Team.findAll({where: {DriverId: driverID}})
}

const getTeamsDriverDB = (intermediateTable) => {
    return Promise.all(
        intermediateTable.map(async (relationsFound) => {
            // En base al ID TEAM de la tabla intermedia busca el nombre del equipo en la tabla TEAM
            const team = await Team.findOne({where : {id:relationsFound.TeamId}});
            return team.name;
        })
    )
}

module.exports = {
    searchDriverByForenameAndSurname,
    searchRelationsDB,
    getTeamsDriverDB,
}