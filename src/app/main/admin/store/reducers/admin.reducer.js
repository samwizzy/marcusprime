import * as Actions from '../actions';

const initialState = null;

const adminReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADMIN:
        {
            return {
                ...action.payload
            };
        }
        case Actions.GET_ADMIN_BY_EMAIL:
        {
            return {
                ...action.payload
            };
        }
        case Actions.DELETE_ADMIN:
        {
            return {
                ...action.payload
            };
        }
        case Actions.UPDATE_ADMIN:
        {
            return {
                ...action.payload
            };
        }
        case Actions.SAVE_ADMIN:
        {
            return {
                ...action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default adminReducer;
