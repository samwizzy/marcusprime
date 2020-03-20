import * as Actions from '../actions';

const initialState = {
    data: []
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
        default:
        {
            return state;
        }
    }
};

export default adminsReducer;
