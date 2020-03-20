import * as Actions from '../actions';

const initialState = {
    data: [],
    doctype: {},
    composeDialog: false,
    mode: '',
    form: {}
};

const doctypesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DOCTYPES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_DOCTYPE:
        {
            return {
                ...state,
                doctype: action.payload
            };
        }
        case Actions.UPDATE_DOCTYPE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.ADD_DOCTYPE:
        {
            return {
                ...state,
                doctype: action.payload
            };
        }
        case Actions.DISABLE_DOCTYPE:
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
                mode: action.payload.mode,
                form: action.payload.form
            };
        }
        case Actions.OPEN_UPDATE_COMPOSE_DIALOG:
        {
            const doctype = state.data.find(doctype => doctype.id === action.payload.id)
            console.log(doctype, "Doctypes Reducer Output")
            return {
                ...state,
                composeDialog: action.payload.status,
                mode: action.payload.mode,
                doctype
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

export default doctypesReducer;
