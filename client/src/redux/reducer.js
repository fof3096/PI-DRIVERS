import { 
    GET_DRIVERS,
    GET_TEAMS,
    SHOW_ALL_DRIVER,
    SEARCH_BY_NAME,
    FILTER_BY_TEAM,
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DSC,
    ORDER_BY_BIRTHDATE_ASC,
    ORDER_BY_BIRTHDATE_DSC,
    ORDER_BY_ORIGIN_DB,
    ORDER_BY_ORIGIN_API,
    DELETE_FILTERS
} from "./actions";

const initialState = {
    allDrivers: [],
    driversCopy: [],
    actualDrivers: [],
    allTeams: []
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                actualDrivers: action.payload,
                driversCopy: action.payload
            };
        
        case GET_TEAMS:
            return {
                ...state,
                allTeams: action.payload
            };
        
        case SHOW_ALL_DRIVER:
            return {
                ...state,
                actualDrivers: state.allDrivers,
                driversCopy: state.allDrivers
            };
        
        case SEARCH_BY_NAME:
            return {
                ...state,
                actualDrivers: action.payload,
                driversCopy: action.payload
            };
            
        case FILTER_BY_TEAM:
            return {
                ...state,
                actualDrivers: action.payload
            };
        
        case ORDER_BY_NAME_ASC:
            return {
                ...state,
                actualDrivers: action.payload
            };
            
        case ORDER_BY_NAME_DSC:
            return {
                ...state,
                actualDrivers: action.payload
            };
            
        case ORDER_BY_BIRTHDATE_ASC:
            return {
                ...state,
                actualDrivers: action.payload
            };
            
        case ORDER_BY_BIRTHDATE_DSC:
            return {
                ...state,
                actualDrivers: action.payload
            };
        
        case ORDER_BY_ORIGIN_DB:
            return {
                ...state,
                actualDrivers: action.payload
            };
        
        case ORDER_BY_ORIGIN_API:
            return {
                ...state,
                actualDrivers: action.payload
            };

        case DELETE_FILTERS:
            return {
                ...state,
                actualDrivers: state.driversCopy
            };
    
        default:
            return {...state};
    }
}

export default rootReducer;