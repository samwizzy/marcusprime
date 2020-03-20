import * as Actions from '../actions';

const initialState = {
    data: [],
    tnc : {}
};

const tncReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_TNCS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_TNC:
        {
            return {
                ...state,
                tnc: action.payload
            };
        }
        case Actions.UPDATE_TNC:
        {
            return {
                ...state,
                tnc: action.payload
            };
        }
        case Actions.SAVE_TNC:
        {
            return {
                ...state,
                tnc: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default tncReducer;
