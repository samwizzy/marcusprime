import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    ptaRequests        : [],
};

const ptaReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PTA_REQUEST:
        {
            return {
                ...state,
                ptaRequests   : action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default ptaReducer;
