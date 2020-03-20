import * as Actions from '../actions';

const initialState = {
    data: [],
    role: {}
}

const rolesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ROLES:
            return {
                data: action.payload
            };
        case Actions.ADD_ROLE:
            return {
                role: action.payload,
            };
        default:
            return state;
    }
};

export default rolesReducer;
