import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    allRms: [],
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

const rmsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ADMINS:
            {
                return {
                    ...state,
                    allAdmins: action.payload,
                };
            }
        case Actions.GET_RMS:
            {
                return {
                    ...state,
                    allRms: action.payload,
                };
            }
        case Actions.GET_RM_DETAILS:
            {
                return {
                    ...state,
                    rmDetails: action.payload,
                };
            }
        case Actions.OPEN_NEW_RM_DIALOG:
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
        case Actions.CLOSE_NEW_RM_DIALOG:
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
        case Actions.OPEN_EDIT_RM_DIALOG:
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
        case Actions.CLOSE_EDIT_RM_DIALOG:
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
export default rmsReducer;
