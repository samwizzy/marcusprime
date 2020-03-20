import * as Actions from '../actions';

const initialState = {
    data: [],
    docdata: [],
    ptadoctype: {},
    composeDialog: false,
    status: {},
    form: {
        doctypeId: '',
        fxCatId: 1,
    }
};

const ptadoctypesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PTA_DOCTYPES:
        {
            console.log("i just hit the reducer for pta")
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_PTA_DOCTYPE:
        {
            return {
                ...state,
                ptadoctype: action.payload
            };
        }
        case Actions.GET_DOCTYPES:
        {
            return {
                ...state,
                docdata: action.payload
            };
        }
        case Actions.GET_PTA_DOCTYPE:
        {
            return {
                ...state,
                ptadoctype: action.payload
            };
        }
        case Actions.REMOVE_PTA_DOCTYPE:
        {
            return {
                ...state,
                ptadoctype: action.payload
            };
        }
        case Actions.UPDATE_PTA_DOCTYPE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.ADD_PTA_DOCTYPE:
        {
            return {
                ...state,
                status: action.payload
            };
        }
        case Actions.DISABLE_PTA_DOCTYPE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.OPEN_COMPOSE_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status,
            };
        }
        case Actions.CLOSE_COMPOSE_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status
            };
        }
        
        default:
        {
            return state;
        }
    }
};

export default ptadoctypesReducer;
