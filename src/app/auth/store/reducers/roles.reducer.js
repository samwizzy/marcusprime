import * as Actions from '../actions';

const initialState = {
    data : []
};

const rolesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ROLES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default rolesReducer;
