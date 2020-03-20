import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    users             : [],
    getUserProfile    : {},
    userInvestments       : [],
    userTransactions       : [],
    userWallets       : [],
};

const accountsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ACCOUNTS:
        {
            return {
                ...state,
                users   : action.payload,
            };
        }
        case Actions.OPEN_USER_PROFILE:
        {
            return {
                getUserProfile   : action.payload,
            };
        }
        case Actions.GET_USER_INVESTMENTS:
        {
            return {
                ...state,
                userInvestments   : action.payload,
            };
        }
        case Actions.GET_USER_TRANSACTIONS:
        {
            return {
                ...state,
                userTransactions   : action.payload,
            };
        }
        case Actions.GET_USER_WALLETS:
        {
            return {
                ...state,
                userWallets   : action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default accountsReducer;
