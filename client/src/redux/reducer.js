import { GET_DRIVERS, GET_TEAMS, SHOW_ALL_DRIVER, SEARCH_BY_NAME } from "./actions";

const initialState = {
    allDrivers: [],
    DriversCopy: [],
    actualDrivers: [],
    allTeams: []
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                actualDrivers: action.payload
            };
        
        case GET_TEAMS:
            return {
                ...state,
                allTeams: action.payload
            };
        
        case SHOW_ALL_DRIVER:
            return {
                ...state,
                actualDrivers: state.allDrivers
            };
        
        case SEARCH_BY_NAME:
            return {
                ...state,
                actualDrivers: action.payload
            };
    
        default:
            return {...state};
    }
}

export default rootReducer;