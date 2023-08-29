const axios = require("axios");
const { Router } = require("express");
const driversRoutes = Router();
const { Driver } = require('../db')

// GET DRIVER
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
        const { data } = response;
        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// GET DRIVER by ID
driversRoutes.get("/:id",async (req, res)=>{
    const { id } = req.params;
    try {
        const response = await axios.get(`http://localhost:5000/drivers/${id}`);
        const { data } = response;
        const driver = {
            id:data.id,
            forename:data.name?.forename,
            surname:data.name?.surname,
            description:data.description,
            image:data.image?.url,
            nationality:data.nationality,
            birthDate:data.dob,
        }
        res.json(driver);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// POST DRIVER
driversRoutes.post("/",async (req, res)=>{
    const { forename, surname, description, image, nationality, birthDate } = req.body;
    if ( forename && surname && description && nationality && birthDate) {
        try {
            const driver = {
                forename,
                surname,
                description,
                nationality,
                birthDate,
            }
            image ? driver.image = image: null;

            const response = await Driver.create(driver);

            res.json(response)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
})

module.exports = driversRoutes;