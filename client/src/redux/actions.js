import axios from 'axios';
export const GET_DRIVERS = "GET_DRIVERS";
export const SHOW_ALL_DRIVER = "SHOW_ALL_DRIVER";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";

export const getDrivers = () => {
    return async (dispatch) => {
        try {
            axios.get("http://localhost:3001/teams")
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
