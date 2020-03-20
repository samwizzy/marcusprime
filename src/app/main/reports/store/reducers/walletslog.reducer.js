import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    data: [],
    filteredData: [],
    isFiltering: false,
    searchText: ''
};

const walletslogReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_WALLETS_LOG:
        {
            return {
                ...state,
                data: action.payload,
            };
        }
        case Actions.GET_WALLETS_LOG_BY_DATE:
        {
            return {
                ...state,
                filteredData: action.payload,
                isFiltering: true
            };
        }
        default:
        {
            return state;
        }
    }
};

export default walletslogReducer;
