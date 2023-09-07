// LIBRERIAS
const axios = require("axios");

// UTILS
const { prepareString, teamsToArray } = require("../utils/utils");

// CONTROLLERS
const { 
    searchDriverByForenameAndSurname,
    searchRelationsDB,
    getTeamsDriverDB,
    getAllDriversDB,
    searchDriverByIDDB,
    searchLastDriverDB,
    searchOrCreateDriverDB,
    createRelationsDB
} = require("../controllers/driversControllers");

const getByQueryDrivers = async (req, res, next) => {

    let { name } = req.query;
    if(name){
        name = prepareString(name);

        try {
            /*     DB     */
            // Trae todos los DRIVERS que coincidan con el "name"
            const driversFound = await searchDriverByForenameAndSurname(name);

            // Guarda los DRIVERS en "driversDB"
            const driversDB = await Promise.all(
                driversFound.map(async (driver)=>{
                    const relationsFound = await searchRelationsDB(driver.id);
                    const teamsDriver = await getTeamsDriverDB(relationsFound);

                    return {
                        id: driver.id,
                        forename: driver.forename,
                        surname: driver.surname,
                        description: driver.description,
                        image: driver.image,
                        nationality: driver.nationality,
                        teams: teamsDriver,
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
                        teamsArray = teamsToArray(driver.teams);
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
            
            // Calcula cuantos driversAPI faltan para completar los 15
            let flag = 15 - driversDB.length;

            // Acorta el tamaño del array driversAPI
            driversAPI.splice(flag);
            res.json([...driversDB, ...driversAPI]);
        } catch (error) {
            res.status(400).json({error: "No se encontraron dichos corredores"});
        }
    }else{
        next();
    }
}

const getAllDrivers = async (req, res)=>{
    try {
        /*     DB     */
        const driverDB = await getAllDriversDB();
        const driversDB = await Promise.all(
            driverDB.map(async (driver)=>{
                const relationsFound = await searchRelationsDB(driver.id);
                const teamsDriver = await getTeamsDriverDB(relationsFound);
                return {
                    id: driver.id,
                    forename: driver.forename,
                    surname: driver.surname,
                    description: driver.description,
                    image: driver.image,
                    nationality: driver.nationality,
                    teams: teamsDriver,
                    birthDate: driver.birthDate,
                }
            })
        )

        /*     API     */
        const response = await axios.get("http://localhost:5000/drivers");
        const driversAPI = response.data.map((driver)=>{
            let teamsArray = [];
            if (driver.teams) {
                teamsArray = teamsToArray(driver.teams);
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
        
        res.json([...driversDB, ...driversAPI]);
    } catch (error) {
        res.status(400).json({error: "No se encontraron Corredores"})
    }
}

const getByIdDriver = async (req, res)=>{
    const { idDriver } = req.params;
    if (idDriver.length > 5) {
        try {
            /*     DB     */
            const driverDB = await searchDriverByIDDB(idDriver);
            const relationsFound = await searchRelationsDB(idDriver);
            const teamsDriver = await getTeamsDriverDB(relationsFound);

            const getDriverDB = {
                id: driverDB.id,
                forename: driverDB.forename,
                surname: driverDB.surname,
                description: driverDB.description,
                image: driverDB.image,
                nationality: driverDB.nationality,
                teams: teamsDriver,
                birthDate: driverDB.birthDate,
            }
            res.json(getDriverDB);
        } catch (error) {
            res.status(400).json({error: "No se encontro al corredor"})
        }
    }else{
        try {
            /*     API     */
            const response = await axios.get(`http://localhost:5000/drivers/${idDriver}`);
            const { data } = response;

            let teamsArray = [];
            if (data.teams) {
                teamsArray = teamsToArray(data.teams);
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
}

const postDrivers = async (req, res)=>{
    let { 
        forename,
        surname,
        description,
        image,
        nationality,
        birthDate,
        teams 
    } = req.body;

    forename = prepareString(forename);
    surname = prepareString(surname);

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

            const response = await searchOrCreateDriverDB(driver);
            
            // Si el "findOrCreate" devuelve "false" significa que ya existe el driver
            if (response[1] === false) {
                res.send("Este Corredor ya existe");
            }else if(response[1] === true){

                const lastDriver = await searchLastDriverDB();

                await Promise.all(teams.map(async (teamName) => {
                    try {
                        await createRelationsDB(lastDriver.id, teamName);     
                    } catch (error) {
                        throw new Error("Error en la creacion del Conductor");
                    }
                }))

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
            res.status(400).json({error: "Error en la creacion del Conductor"});
        }
    }
}

module.exports = {
    getByQueryDrivers,
    getAllDrivers,
    getByIdDriver,
    postDrivers,
};