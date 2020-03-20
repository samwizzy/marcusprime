import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';

export const GET_PRODUCT_CATEGORIES = '[PRODUCT CATEGORIES APP] GET PRODUCT CATEGORIES';
export const SAVE_PRODUCT_CATEGORIES = '[PRODUCT CATEGORIES APP] SAVE PRODUCT CATEGORIES';
export const GET_PRODUCT_CATEGORIES_DETAILS = '[PRODUCT CATEGORIES APP] GET PRODUCT CATEGORIES DETAILS';
export const UPDATE_PRODUCT_CATEGORIES = '[PRODUCT CATEGORIES APP] UPDATE PRODUCT CATEGORIES';
export const OPEN_EDIT_PRODUCT_CATEGORIES_DIALOG = '[PRODUCT CATEGORIES APP] OPEN EDIT PRODUCT CATEGORIES DIALOG';
export const CLOSE_EDIT_PRODUCT_CATEGORIES_DIALOG = '[PRODUCT CATEGORIES APP] CLOSE EDIT PRODUCT CATEGORIES DIALOG';


export function getProductCategories() {
    const request = axios.get('financialserv/api/v1/productCategories');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCT_CATEGORIES,
                payload: response.data,
            })
        );
}

export function getProductCategoryDetails(id) {

    const request = axios.get('financialserv/api/v1/productCategories/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PRODUCT_CATEGORIES_DETAILS,
                payload: response.data,
            })
        );
}


// export function saveBondsProduct(data) {

//     const request = axios.post('financialserv/api/v1/products/add', data);

//     return (dispatch) =>
//         request.then((response) =>{
//             dispatch(showMessage({message: 'Bond Saved Successfully'}));

//             Promise.all([
//                 dispatch({
//                     type: SAVE_PRODUCT_CATEGORIES,
//                     payload: response.data,
//                 })
//             ]).then(() => dispatch(getProductCategories()))
//         }
//         );
// }

export function openEditProductCategoryDialog(data) {
    return {
        type: OPEN_EDIT_PRODUCT_CATEGORIES_DIALOG,
        data
    }
}

export function closeEditProductCategoryDialog() {
    return {
        type: CLOSE_EDIT_PRODUCT_CATEGORIES_DIALOG
    }
}

export function updateProductCategory(data) {

    const request = axios.put('financialserv/api/v1/productCategories/update', data);

    return (dispatch) =>
        request.then((response) => {

            dispatch(showMessage({message: 'Product Updated Successfully'}));

            Promise.all([
                dispatch({
                    type: UPDATE_PRODUCT_CATEGORIES,
                    payload: response.data,
                })
            ]).then(() => dispatch(getProductCategories()))
        }
        );
}
