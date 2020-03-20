import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
    bondsProducts: [],
    bondsProduct: '',
    bondsDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
    bondsMaturity: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const bondsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_BONDS_PRODUCT:
            {
                return {
                    ...state,
                    bondsProducts: action.payload,
                };
            }
        case Actions.GET_BONDS_DETAILS:
            {
                return {
                    ...state,
                    bondsProduct: action.payload,
                };
            }
        case Actions.OPEN_NEW_BONDS_DIALOG:
            {
                // console.log(...state, '...state');
                return {
                    ...state,
                    bondsDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_BONDS_DIALOG:
            {
                return {
                    ...state,
                    bondsDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_BONDS_DIALOG:
            {
                return {
                    ...state,
                    bondsDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                }
            }
        case Actions.CLOSE_EDIT_BONDS_DIALOG:
            {
                return {
                    ...state,
                    bondsDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.GET_PENDING_BONDS_PRODUCT:
            {
                return {
                    ...state,
                    bondsProducts: action.payload,
                };
            }
        case Actions.OPEN_NEW_BONDS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    bondsMaturity: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_NEW_BONDS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    bondsMaturity: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                }
            }
        case Actions.OPEN_EDIT_BONDS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    bondsMaturity: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: null
                    }
                }
            }
        case Actions.CLOSE_EDIT_BONDS_MATURITY_UPLOAD:
            {
                return {
                    ...state,
                    bondsMaturity: {
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
export default bondsReducer;
