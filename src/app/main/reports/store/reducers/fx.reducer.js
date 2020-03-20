import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    getFxSales  : [],
    filteredGetFxSales: [],
    fxswitch: [],
    filteredFxswitch: [],
    isFiltering: false,
};

const fxReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_FX_SALES:
        {
            return {
                ...state,
                getFxSales   : action.payload,
            };
        }
        case Actions.GET_FX_SWITCH:
        {
            return {
                ...state,
                fxswitch: action.payload,
            };
        }
        case Actions.GET_FX_SWITCH_BY_DATE:
        {
            return {
                ...state,
                filteredFxswitch: action.payload,
                isFiltering: true
            };
        }
        case Actions.GET_FX_SALES_BY_DATE:
        {
            return {
                ...state,
                filteredGetFxSales: action.payload,
                isFiltering: true
            };
        }
        case Actions.UPDATE_FILTERING:
        {
            console.log("UPDATE_FILTERING")
            return {
                ...state,
                isFiltering: false
            };
        }
        default:
        {
            return state;
        }
    }
};

export default fxReducer;
