const { Router } = require("express");
const router = Router();

const driversRoutes = require("./driversRoutes");
const teamsRoutes = require("./teamsRoutes");

router.use("/drivers", driversRoutes);
router.use("/teams", teamsRoutes);

module.exports = router;
