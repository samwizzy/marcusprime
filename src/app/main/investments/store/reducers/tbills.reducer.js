import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    tbillsProducts: [],
    tbillsProduct: '',
    tbillsDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    tbillsMaturity: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    confirmDialog: {
        type: '',
        props: {
            open: false
        },
        data: null
    }
};

const tbillsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_TBILLS_PRODUCT:
            {
                return {
                    ...state,
                    tbillsProducts: action.payload,
                };
            }
        case Actions.GET_TBILLS_DETAILS:
            {
                return {
                    ...state,
                    tbillsProduct: action.payload,
                };
            }
        case Actions.OPEN_NEW_TBILLS_DIALOG:
            {
                return {
                    ...state,
                    tbillsDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_TBILLS_DIALOG:
            {
                return {
                    ...state,
                    tbillsDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_TBILLS_DIALOG:
            {
                return {
                    ...state,
                    tbillsDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                }
            }
        case Actions.CLOSE_EDIT_TBILLS_DIALOG:
            {
                return {
                    ...state,
                    tbillsDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.GET_PENDING_TBILLS_PRODUCT:
            {
                return {
                    ...state,
                    tbillsProducts: action.payload,
                };
            }
        case Actions.OPEN_NEW_TBILLS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    tbillsMaturity: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_TBILLS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    tbillsMaturity: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_TBILLS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    tbillsMaturity: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_EDIT_TBILLS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    tbillsMaturity: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_CONFIRM_DIALOG:
            {
                console.log(action.payload, 'action.payload')
                if (action.payload.status === true) {
                    return {
                        ...state,
                        confirmDialog: {
                            type: 'disable',
                            props: {
                                open: true
                            },
                            data: action.payload
                        }
                    }
                } else {
                    return {
                        ...state,
                        confirmDialog: {
                            type: 'enable',
                            props: {
                                open: true
                            },
                            data: action.payload
                        }
                    }
                }
            }
        case Actions.CLOSE_CONFIRM_DIALOG:
            {
                return {
                    ...state,
                    confirmDialog: {
                        type: 'enable',
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
export default tbillsReducer;
