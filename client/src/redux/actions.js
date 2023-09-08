export const GET_DRIVERS = "GET_DRIVERS";
export const GET_TEAMS = "GET_TEAMS";
export const SHOW_ALL_DRIVER = "SHOW_ALL_DRIVER";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const FILTER_BY_TEAM = "FILTER_BY_TEAM";
export const ORDER_BY_NAME_ASC = "ORDER_BY_NAME_ASC";
export const ORDER_BY_NAME_DSC = "ORDER_BY_NAME_DSC";
export const ORDER_BY_BIRTHDATE_ASC = "ORDER_BY_BIRTHDATE_ASC";
export const ORDER_BY_BIRTHDATE_DSC = "ORDER_BY_BIRTHDATE_DSC";
export const DELETE_FILTERS = "DELETE_FILTERS";

// LIBRERÍAS
import axios from 'axios';

export const getDrivers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/drivers");
            return dispatch({ // Sí no me equivoco ☝, el dispatch es una propiedad que viene por default en la store
                type: GET_DRIVERS,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getTeams = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/teams");
            return dispatch({ // Sí no me equivoco ☝, el dispatch es una propiedad que viene por default en la store
                type: GET_TEAMS,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const showAllDrivers = () => {
    return{
        type: SHOW_ALL_DRIVER,
        payload: ""
    }
}

export const searchByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
} 

export const filterByTeam = (teamSelected, drivers) => {
    return async (dispatch) => {
        try {
            const toPayload = drivers.filter((driver) => driver.teams.some((team) => team == teamSelected));
            return dispatch({
                type: FILTER_BY_TEAM,
                payload: toPayload
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const orderByNameAsc = (drivers) => {
    const result = [...drivers].sort((a, b)=> a.forename.localeCompare(b.forename));
    return{
        type: ORDER_BY_NAME_ASC,
        payload: result
    }
}

export const orderByNameDsc = (drivers) => {
    const result = [...drivers].sort((a, b) => b.forename.localeCompare(a.forename));
    return{
        type: ORDER_BY_NAME_DSC,
        payload: result
    }
}

export const orderByBirthDateAsc = (drivers) => {
    const result = [...drivers].sort((a, b) => new Date(b.birthDate).getTime() - new Date(a.birthDate).getTime());
    return{
        type: ORDER_BY_BIRTHDATE_ASC,
        payload: result
    }
}

export const orderByBirthDateDsc = (drivers) => {
    const result = [...drivers].sort((a, b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime());
    return{
        type: ORDER_BY_BIRTHDATE_DSC,
        payload: result
    }
}

export const deleteFilters = () => {
    return{
        type: DELETE_FILTERS,
        payload: ""
    }
}

export const createDriver = (newDriver) => {
    return async () => {
        try {
            const {data} = await axios.post(`http://localhost:3001/drivers`, newDriver);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
}