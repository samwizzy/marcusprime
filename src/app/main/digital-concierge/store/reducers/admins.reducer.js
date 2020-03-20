import * as Actions from '../actions';

const initialState = {
    data: [],
    admin: {}
};

const adminsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADMINS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_ADMIN:
        {
            return {
                ...state,
                admin: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default adminsReducer;
