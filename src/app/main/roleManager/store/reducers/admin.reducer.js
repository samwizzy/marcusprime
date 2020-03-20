import * as Actions from '../actions';

const initialState = {
    data: [],
    admin: {},
    selectedAdminIds: [],
    searchText: '',
    composeDialog: false
};

const adminReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ADMINS:
            return {
                ...state,
                data: action.payload
            };
        case Actions.GET_ADMIN:
            return {
                ...state,
                admin: action.payload
            };    
        case Actions.UPDATE_ADMIN:
            return {
                ...state,
                admin: action.payload,
                composeDialog: false
            };
        case Actions.OPEN_COMPOSE_DIALOG:
            return {
                ...state,
                composeDialog: action.payload
            };
        case Actions.CLOSE_COMPOSE_DIALOG:
            return {
                ...state,
                composeDialog: action.payload
            };
        case Actions.SELECT_ALL_ADMINS:
            {
                const selectedAdminIds = state.data.map(admin => admin.adUserID);
    
                return {
                    ...state,
                    selectedAdminIds
                };
            }    
        case Actions.DESELECT_ALL_ADMINS:
            {
                return {
                    ...state,
                    selectedAdminIds: []
                };
            }
        case Actions.TOGGLE_IN_SELECTED_ADMINS:
            {
                const adUserID = action.adUserID;

                let selectedAdminIds = [...state.selectedAdminIds];

                if ( selectedAdminIds.find(id => id === adUserID) !== undefined )
                {
                    selectedAdminIds = selectedAdminIds.filter(id => id !== adUserID);
                }
                else
                {
                    selectedAdminIds = [...selectedAdminIds, adUserID];
                }

                return {
                    ...state,
                    selectedAdminIds
                };
            }     
        case Actions.SELECT_ADMINS_BY_PARAMETER:
            {
                const id = action.payload;
                const admins = state.data;
                console.log(id, "Parameter Parameter Pareameter")
                console.log(admins, "Administration Parameter Administration")
                const selectedAdminIds = []
                // const selectedAdminIds = admins.filter(admin => admin.role.id === id)
                //     .map(mail => mail.adUserID);
                return {
                    ...state,
                    selectedAdminIds
                };
            }
        case Actions.GET_MAIL:
        {
            return {
                ...state,
                mail: action.payload
            };
        }
        case Actions.UPDATE_MAIL:
        {
            return {
                mail: action.payload
            };
        }
        default:
            return state;
    }
};

export default adminReducer;
