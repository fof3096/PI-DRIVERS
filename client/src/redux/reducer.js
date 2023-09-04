import { GET_DRIVERS } from "./actions";

const initialState = {
    allDrivers: [],
    DriversCopy: []
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_DRIVERS:
            return {
                ...state,
                allDrivers: action.payload,
                DriversCopy: action.payload
            };
    
        default:
            return {...state};
    }
}

export default rootReducer;