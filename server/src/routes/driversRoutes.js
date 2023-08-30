const axios = require("axios");
const { Router } = require("express");
const driversRoutes = Router();
const { Driver, Driver_Team, Team } = require('../db')

// GET 15 DRIVERS
driversRoutes.get("/",async (req, res, next)=>{
    const { name } = req.query;
    if(name){
        try {
            const response = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`);
            const { data } = response;
            const driver = {
                id:data[0].id,
                forename:data[0].name?.forename,
                surname:data[0].name?.surname,
                description:data[0].description,
                image:data[0].image?.url,
                nationality:data[0].nationality,
                birthDate:data[0].dob,
            }
            res.json(driver);
        } catch (error) {
            res.status(400).json({error: "No se encontro a dicho corredor"});
        }
    }else{
        next();
    }
})

// GET ALLDRIVERS
driversRoutes.get("/",async (req, res)=>{
    try {
        const response = await axios.get("http://localhost:5000/drivers");
        const newDrivers = await Driver.findAll();
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
            const driverDB = await Driver.findOne({where : {id: id}});
            /* const teamsDB = await Driver_Team.findAll({where : {TeamId: id}});
            const teamsArray = await Promise.all(
                teamsDB.map(teamDB => {
                return Team.findOne({where : {id:teamDB.TeamId}})
                })
            ) */
            const getDriver = {
                id: driverDB.id,
                forename: driverDB.forename,
                surname: driverDB.surname,
                description: driverDB.description,
                image: driverDB.image,
                nationality: driverDB.nationality,
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