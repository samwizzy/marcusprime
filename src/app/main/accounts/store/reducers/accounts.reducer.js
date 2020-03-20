import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    users                   : [],
    getUserProfile          : {},
    userProfileByUuid       : {},
    userActiveInvestments   : [],
    userAllInvestments      : [],
    userTransactions        : [],
    userWallets             : [],
    userMatureInvestments   : [],
    userWalletLogs          : [],
    userActivitiesLogs      : [],
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
        case Actions.OPEN_USER_PROFILE_BY_UUID:
        {
            return {
                userProfileByUuid   : action.payload,
            };
        }
        case Actions.GET_USER_ACTIVE_INVESTMENTS:
        {
            return {
                ...state,
                userActiveInvestments   : action.payload,
            };
        }
        case Actions.GET_USER_ALL_INVESTMENTS:
        {
            return {
                ...state,
                userAllInvestments   : action.payload,
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
        case Actions.GET_USER_MATURED_LOG:
        {
            return {
                ...state,
                userMatureInvestments   : action.payload,
            };
        }
        case Actions.GET_USER_WALLET_LOG:
        {
            return {
                ...state,
                userWalletLogs   : action.payload,
            };
        }
        case Actions.GET_USER_ACTIVITIES_LOG:
        {
            return {
                ...state,
                userActivitiesLogs   : action.payload,
            };
        }
        default:
        {
            return state;
        }
    }
};

export default accountsReducer;
