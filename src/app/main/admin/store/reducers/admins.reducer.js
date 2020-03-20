import * as Actions from '../actions';

const initialState = {
    data      : [],
    admin: {},
    branch: [],
    searchText: '',
    roles: [],
    form    : {
        initials: '',
        firstName: '',
        lastName: '',
        displayName : '',
        email: '',
        adUserID: '',
        role : {id: ''},
        mobileNumber: '',
        telephoneNumber: '',
        jobTitle: '',
        department: '',
        branchCode: '',
        address: '',
    },
    composeDialog: false,
    composeEditDialog: false,
    options : null
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
        case Actions.GET_ROLES:
        {
            return {
                ...state,
                roles: action.payload
            };
        }
        case Actions.GET_BRANCHES:
        {
            return {
                ...state,
                branch: action.payload
            };
        }
        case Actions.OPEN_EDIT_USER_DIALOG:
            return {
                ...state,
                composeEditDialog: action.payload.status,
                admin: action.payload.data
            };
        case Actions.OPEN_COMPOSE_DIALOG:
            return {
                ...state,
                composeDialog: action.payload
            };
        case Actions.CLOSE_COMPOSE_DIALOG:
            return {
                ...state,
                composeDialog: action.payload,
                composeEditDialog: action.payload,
            };
        case Actions.SET_ORDERS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default adminsReducer;
