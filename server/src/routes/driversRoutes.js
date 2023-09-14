const { Router } = require("express");
const driversRoutes = Router();
const {
    getByQueryDrivers,
    getAllDrivers,
    getByIdDriver,
    postDrivers,
    deleteDrivers
} = require("../handlers/driversHandlers")

// GET 15 DRIVERS
driversRoutes.get("/", getByQueryDrivers)

// GET ALLDRIVERS
driversRoutes.get("/", getAllDrivers)

// GET DRIVER by ID
driversRoutes.get("/:idDriver", getByIdDriver)

// POST DRIVER
driversRoutes.post("/", postDrivers)

// POST DRIVER
driversRoutes.delete("/", deleteDrivers)


module.exports = driversRoutes;