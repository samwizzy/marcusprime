import * as Actions from '../actions';

const initialState = {
    data: [],
    walletFund: {},
    composeDialog: false,
    mode: '',
    form: {}
};

const doctypesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.WALLET_FUND:
        {
            return {
                ...state,
                walletFund: action.payload
            };
        }
        case Actions.OPEN_COMPOSE_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status,
                form: action.payload.form
            };
        }
        case Actions.OPEN_UPDATE_COMPOSE_DIALOG:
        {
            const doctype = state.data.find(doctype => doctype.id === action.payload.id)
            return {
                ...state,
                composeDialog: action.payload.status,
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
