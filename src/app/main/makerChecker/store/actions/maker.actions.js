import axios from 'axios';
import qs from 'qs';
import { showMessage } from '../../../../store/actions/fuse';

export const GET_TEMP_PRODUCTS = '[MAKER APP] GET TEMP PRODUCTS';
export const APPROVE_PRODUCT = '[MAKER APP] APPROVE PRODUCT';
export const DECLINE_PRODUCT = '[MAKER APP] DECLINE PRODUCT';
export const OPEN_NEW_MAKER_DIALOG = '[MAKER APP] OPEN NEW MAKER DIALOG';
export const CLOSE_NEW_MAKER_DIALOG = '[MAKER APP] CLOSE NEW MAKER DIALOG';


export function getAllTempProducts() {
    const request = axios.get('financialserv/api/v1/temp_products/by_status/' + 0);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TEMP_PRODUCTS,
                payload: response.data
            })
        );
}


export function openMakerDialog(tempProductId, status) {
    return {
        type: OPEN_NEW_MAKER_DIALOG,
        payload: { tempProductId, status },
    }
}

export function closeMakerDialog() {
    return {
        type: CLOSE_NEW_MAKER_DIALOG
    }
}

export function approveProduct(data) {

    console.log(data, 'approve product data');
    // return;

    const newData = qs.stringify(data)

    const request = axios.post('financialserv/api/v1/temp_product/approve', newData);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Product Approved Successfully' }));

            Promise.all([
                dispatch({
                    type: APPROVE_PRODUCT,
                    payload: response.data,
                })
            ]).then(() => dispatch(getAllTempProducts()))
        }
        ).catch(error => {
            // console.log(error.response)
            dispatch(showMessage({ message: error.response.data.error }));
        });
}

export function declineProduct(data) {

    const newData = qs.stringify(data);

    const request = axios.post('financialserv/api/v1/temp_product/approve', newData);

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: 'Product Declined Successfully' }));

            Promise.all([
                dispatch({
                    type: DECLINE_PRODUCT,
                    payload: response.data,
                })
            ]).then(() => dispatch(getAllTempProducts()))
        }
        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
}
