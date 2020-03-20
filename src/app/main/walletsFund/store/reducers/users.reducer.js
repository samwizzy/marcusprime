import * as Actions from '../actions';

const initialState = {
    data: [],
    user: {},
};

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ACCOUNTS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_ACCOUNT:
        {
            return {
                ...state,
                user: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default usersReducer;
