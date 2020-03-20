import * as Actions from '../actions';

const initialState = {
    productCategories: [],
    productCategory: '',
    productCategoryDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const productCategoriesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PRODUCT_CATEGORIES:
            {
                return {
                    ...state,
                    productCategories: action.payload,
                };
            }
        case Actions.GET_PRODUCT_CATEGORIES_DETAILS:
            {
                return {
                    ...state,
                    productCategory: action.payload,
                };
            }
        case Actions.OPEN_EDIT_PRODUCT_CATEGORIES_DIALOG:
            {
                return {
                    ...state,
                    productCategoryDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: action.data
                    }
                }
            }
        case Actions.CLOSE_EDIT_PRODUCT_CATEGORIES_DIALOG:
            {
                return {
                    ...state,
                    productCategoryDialog: {
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
export default productCategoriesReducer;
