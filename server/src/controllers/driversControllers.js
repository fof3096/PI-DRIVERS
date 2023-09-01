const { Op } = require("sequelize");
const { Driver } = require('../db');

const searchDriver = (name) => {
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

module.exports = {
    searchDriver,
}