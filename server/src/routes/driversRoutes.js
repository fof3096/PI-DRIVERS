const { Router } = require("express");
const driversRoutes = Router();
const {
    getByQueryDrivers,
    getAllDrivers,
    getByIdDriver,
    postDrivers
} = require("../handlers/driversHandlers")

// GET 15 DRIVERS
driversRoutes.get("/", getByQueryDrivers)

// GET ALLDRIVERS
driversRoutes.get("/", getAllDrivers)

// GET DRIVER by ID
driversRoutes.get("/:idDriver", getByIdDriver)

// POST DRIVER
// TODO: Transformar el FORENAME y SURNAME  para que comiencen con MAYUSCULAS o usar validaciones por FORM
driversRoutes.post("/", postDrivers)

module.exports = driversRoutes;