import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    allCS: [],
    allAdmins: [],
    rmDetails: '',
    rmDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const customerServicesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ADMINS:
            {
                return {
                    ...state,
                    allAdmins: action.payload,
                };
            }
        case Actions.GET_CS:
            {
                return {
                    ...state,
                    allCS: action.payload,
                };
            }
        case Actions.GET_CS_DETAILS:
            {
                return {
                    ...state,
                    rmDetails: action.payload,
                };
            }
        case Actions.OPEN_NEW_CS_DIALOG:
            {
                return {
                    ...state,
                    rmDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_CS_DIALOG:
            {
                return {
                    ...state,
                    rmDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_CS_DIALOG:
            {
                return {
                    ...state,
                    rmDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                }
            }
        case Actions.CLOSE_EDIT_CS_DIALOG:
            {
                return {
                    ...state,
                    rmDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        default:
            {
                return state;
            }

    }
}
export default customerServicesReducer;
