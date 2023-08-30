let initialState = {};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EJEMPLO:
            return action.payload;
    
        default:
            return {...state};
    }
}