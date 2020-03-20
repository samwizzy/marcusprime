import * as Actions from '../actions';

const initialState = {
    allAdmins: [],
    allUBNBranches: [],
    branches: [],
    rateDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const branchReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_UBN_BRANCHES:
            {
                return {
                    ...state,
                    allUBNBranches: action.payload,
                };
            }
        case Actions.GET_ADMINS:
            {
                return {
                    ...state,
                    allAdmins: action.payload,
                };
            }
        case Actions.GET_BRANCHES:
            {
                return {
                    ...state,
                    branches: action.payload,
                };
            }
        case Actions.OPEN_NEW_BRANCH_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_BRANCH_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_BRANCH_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                }
            }
        case Actions.CLOSE_EDIT_BRANCH_DIALOG:
            {
                return {
                    ...state,
                    rateDialog: {
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
export default branchReducer;
