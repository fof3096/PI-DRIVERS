const axios = require("axios");
const { Op } = require("sequelize");
const { Router } = require("express");
const driversRoutes = Router();
const { Driver, Driver_Team, Team } = require('../db')

// GET 15 DRIVERS
driversRoutes.get("/",async (req, res, next)=>{
    let { name } = req.query;

    function orderChar(string) { // FUNCIONA
        let perfect = string.toUpperCase().charAt(0);
        perfect = perfect + string.toLowerCase().slice(1);
        return perfect;
    }

    if(name){
        name = orderChar(name);

        try {
            /*     DB     */
            const allDriversDB = await Driver.findAll({
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
            });

            const driversDB = await Promise.all(
                allDriversDB.map(async (driver)=>{
                    const teamsDB = await Driver_Team.findAll({where: {DriverId: driver.id}});
                    
                    const teamsArray = await Promise.all(
                        teamsDB.map(async (teamDB) => {
                            const team = await Team.findOne({where : {id:teamDB.TeamId}});
                            return team.name;
                        })
                    )

                    return {
                        id: driver.id,
                        forename: driver.forename,
                        surname: driver.surname,
                        description: driver.description,
                        image: driver.image,
                        nationality: driver.nationality,
                        teams: teamsArray,
                        birthDate: driver.birthDate,
                    }
                })
            )
            /*     API     */
            const response = await axios.get("http://localhost:5000/drivers");
            let driversAPI = [];
            response.data.map((driver)=>{
                if (driver.name?.forename.startsWith(name) || driver.name?.surname.startsWith(name)) {
                    let teamsArray = [];
                    if (driver.teams) {
                        let teams =  driver.teams.split(",");
                        teamsArray = teams.map(team => team.trim());
                    }
                    driversAPI.push({
                        id:driver.id,
                        forename:driver.name?.forename,
                        surname:driver.name?.surname,
                        description:driver.description,
                        image:driver.image?.url,
                        nationality:driver.nationality,
                        teams:teamsArray,
                        birthDate:driver.dob,
                    })
                }
            })
            
            let flag = 15 - driversDB.length; // serian la cantidad que falta para llegar a 15

            driversAPI.splice(flag);
            res.json([...driversDB, ...driversAPI]);
        } catch (error) {
            res.status(400).json({error: "No se encontraron dichos corredores"});
        }
    }else{
        next();
    }
})

// GET ALLDRIVERS
driversRoutes.get("/",async (req, res)=>{
    try {
        //! Trae los DRIVERS de la API
        const response = await axios.get("http://localhost:5000/drivers");
        const drivers = response.data.map((driver)=>{
            let teamsArray = [];
            if (driver.teams) {
                let teams =  driver.teams.split(",");
                teamsArray = teams.map(team => team.trim());
            }
            return {
                id:driver.id,
                forename:driver.name?.forename,
                surname:driver.name?.surname,
                description:driver.description,
                image:driver.image?.url,
                nationality:driver.nationality,
                teams:teamsArray,
                birthDate:driver.dob,
            }
        })
        //! Trae los DRIVERS de la DB
        const driverDB = await Driver.findAll();
        const newDrivers = await Promise.all(
            driverDB.map(async (driver)=>{
                const teamsDB = await Driver_Team.findAll({where: {DriverId: driver.id}});
                const teamsArray = await Promise.all(
                    teamsDB.map(async (teamDB) => {
                    const team = await Team.findOne({where : {id:teamDB.TeamId}});
                    return team.name;
                    })
                )
            return {
                id: driver.id,
                forename: driver.forename,
                surname: driver.surname,
                description: driver.description,
                image: driver.image,
                nationality: driver.nationality,
                teams: teamsArray,
                birthDate: driver.birthDate,
            }
            })
        )
        
        res.json([...newDrivers, ...drivers]);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// GET DRIVER by ID
driversRoutes.get("/:id",async (req, res)=>{
    const { id } = req.params;
    if (id.length > 5) {
        try {
            const driverDB = await Driver.findOne({where: {id: id}});
            const teamsDB = await Driver_Team.findAll({where: {DriverId: id}});
            const teamsArray = await Promise.all(
                teamsDB.map(async (teamDB) => {
                const team = await Team.findOne({where : {id:teamDB.TeamId}});
                return team.name;
                })
            )
            const getDriver = {
                id: driverDB.id,
                forename: driverDB.forename,
                surname: driverDB.surname,
                description: driverDB.description,
                image: driverDB.image,
                nationality: driverDB.nationality,
                teams: teamsArray,
                birthDate: driverDB.birthDate,
            }
            res.json(getDriver);
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }else{
        try {
            const response = await axios.get(`http://localhost:5000/drivers/${id}`);
            const { data } = response;
            let teamsArray = [];
                if (data.teams) {
                    let teams =  data.teams.split(",");
                    teamsArray = teams.map(team => team.trim());
                }
            const driver = {
                id:data.id,
                forename:data.name?.forename,
                surname:data.name?.surname,
                description:data.description,
                image:data.image?.url,
                nationality:data.nationality,
                teams:teamsArray,
                birthDate:data.dob,
            }
            res.json(driver);
        } catch (error) {
            res.status(400).json({error: "No se encontro al corredor"})
        }
    }
})

// POST DRIVER
//TODO: Transformar el FORENAME y SURNAME  para que comiencen con MAYUSCULAS o usar validaciones por FORM
driversRoutes.post("/",async (req, res)=>{
    const { forename, surname, description, image, nationality, birthDate, teams } = req.body;
    if ( forename && surname && description && nationality && birthDate && teams ) {
        try {
            const driver = {
                forename,
                surname,
                description,
                nationality,
                birthDate,
            }
            image ? driver.image = image: null;
            const response = await Driver.findOrCreate({where: driver});
            
            if (response[1] === false) {
                res.json({
                    id:response[0].id,
                    forename: response[0].forename,
                    surname: response[0].surname,
                    description: response[0].description,
                    image: response[0].image,
                    nationality: response[0].nationality,
                    birthDate: response[0].birthDate,
                }) 
            }else if(response[1] === true){
                const lastDriver = await Driver.findOne({ order: [['createdAt', 'DESC']] });

                teams.map(async (team) => {
                    try {
                        await Driver_Team.create({ DriverId: lastDriver.id, TeamId: team })
                    } catch (error) {
                        throw new Error("Error en la creacion del Conductor");
                    }
                });

                res.json({
                    id:response[0].id,
                    forename: response[0].forename,
                    surname: response[0].surname,
                    description: response[0].description,
                    image: response[0].image,
                    nationality: response[0].nationality,
                    birthDate: response[0].birthDate,
                })  
            }
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
})

module.exports = driversRoutes;