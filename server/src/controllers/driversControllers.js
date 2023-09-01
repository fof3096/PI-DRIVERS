const { Op } = require("sequelize");
const { Driver, Team, Driver_Team } = require('../db');

// DRIVERS
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

const getAllDriversDB = () => {
    return Driver.findAll();
}

const searchDriverByIDDB = (driverID) => {
    return Driver.findOne({where: {id: driverID}});
}

const searchLastDriverDB = () => {
    return Driver.findOne({ order: [['createdAt', 'DESC']] });
}

const searchOrCreateDriverDB = (newDriver) => {
    return Driver.findOrCreate({where: newDriver});
}

// DRIVER_TEAM
const searchRelationsDB = (driverID) => {
    return Driver_Team.findAll({where: {DriverId: driverID}});
}

const createRelationsDB = (driverID, teamID) => {
    return Driver_Team.create({ DriverId: driverID, TeamId: teamID });
}

// TEAM
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
    getAllDriversDB,
    searchDriverByIDDB,
    searchLastDriverDB,
    searchOrCreateDriverDB,
    searchRelationsDB,
    createRelationsDB,
    getTeamsDriverDB,
}