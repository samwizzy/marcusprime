import * as Actions from '../actions';

const initialState = {
    data: [],
    pta: {},
    doc: {},
    composeDialog: false,
    action: '',
    form: {
        fxId: '',
        status: '',
        reason: '',
    }
};

const ptaReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PTAS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_PTA:
        {
            return {
                ...state,
                pta: action.payload
            };
        }
        case Actions.GET_DOC_PTA:
        {
            return {
                ...state,
                doc: action.payload
            };
        }
        case Actions.GET_PTA_BY_CAT_BRANCH:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.OPEN_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status,
                action: action.payload.action,
            };
        }
        case Actions.CLOSE_DIALOG:
        {
            return {
                ...state,
                composeDialog: action.payload.status
            };
        }
        case Actions.APPROVED_PTA:
        {
            return {
                ...state,
                pta: action.payload,
                composeDialog: action.status
            };
        }
        case Actions.DECLINE_PTA:
        {
            return {
                ...state,
                pta: action.payload,
                composeDialog: action.status
            };
        }
        default:
        {
            return state;
        }
    }
};

export default ptaReducer;
