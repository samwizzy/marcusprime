import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';

export const SAVE_TBILLS_PRODUCT = '[TBILLS APP] SAVE TBILLS PRODUCT';
export const SAVE_PENDING_TBILLS_PRODUCT = '[TBILLS APP] SAVE PENDING TBILLS PRODUCT';
export const GET_TBILLS_PRODUCT = '[TBILLS APP] GET PRODUCT';
export const GET_PENDING_TBILLS_PRODUCT = '[TBILLS APP] GET PENDING PRODUCT';
export const GET_TBILLS_DETAILS = '[TBILLS APP] TBILLS DETAILS PRODUCT';
export const UPDATE_TBILLS = '[TBILLS APP] UPDATE TBILLS';
export const DISABLE_TBILLS = '[TBILLS APP] DISABLE TBILLS';
export const OPEN_NEW_TBILLS_DIALOG = '[TBILLS APP] OPEN NEW TBILLS DIALOG';
export const CLOSE_NEW_TBILLS_DIALOG = '[TBILLS APP] CLOSE NEW TBILLS DIALOG';
export const OPEN_EDIT_TBILLS_DIALOG = '[TBILLS APP] OPEN EDIT TBILLS DIALOG';
export const CLOSE_EDIT_TBILLS_DIALOG = '[TBILLS APP] CLOSE EDIT TBILLS DIALOG';
export const OPEN_NEW_TBILLS_MATURITY_UPLOAD = '[TBILLS APP] OPEN NEW TBILLS MATURITY UPLOAD';
export const CLOSE_NEW_TBILLS_MATURITY_UPLOAD = '[TBILLS APP] CLOSE NEW TBILLS MATURITY UPLOAD';
export const OPEN_EDIT_TBILLS_MATURITY_UPLOAD = '[TBILLS APP] OPEN EDIT TBILLS MATURITY UPLOAD';
export const CLOSE_EDIT_TBILLS_MATURITY_UPLOAD = '[TBILLS APP] CLOSE EDIT TBILLS MATURITY UPLOAD';

export const OPEN_CONFIRM_DIALOG = '[TBILLS APP] OPEN CONFIRM DIALOG';
export const CLOSE_CONFIRM_DIALOG = '[TBILLS APP] CLOSE CONFIRM DIALOG';


export function getTbillsProduct(params) {
    const request = axios.get('financialserv/api/v1/productsByCategories/' + params);

    console.log(request, 'online request');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TBILLS_PRODUCT,
                payload: response.data
            })
        );
}

export function getTbillsDetails(id) {

    const request = axios.get('financialserv/api/v1/products/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TBILLS_DETAILS,
                payload: response.data,
            })
        );
}

export function openNewTbillsDialog() {
    return {
        type: OPEN_NEW_TBILLS_DIALOG
    }
}

export function closeNewTbillsDialog() {
    return {
        type: CLOSE_NEW_TBILLS_DIALOG
    }
}

export function saveTbillsProduct(data) {

    let { name, initialVolume, bid, maturity, offer, dealersRateBid, dealersRateOffer } = data;

    const nameUpper = name.toUpperCase();
    const initialVolumeStrip = Math.abs(initialVolume);
    // const totalVolumeStrip = Math.abs(totalVolume);
    const bidStrip = Math.abs(bid);
    const offerStrip = Math.abs(offer);
    const dealersRateBidStrip = Math.abs(dealersRateBid);
    const dealersRateOfferStrip = Math.abs(dealersRateOffer);

    const productCategoryC = { id: 1 };

    const newData = {
        id: null,
        name: nameUpper,
        productCategory: productCategoryC,
        initialVolume: initialVolumeStrip,
        totalVolume: initialVolumeStrip,
        bid: bidStrip,
        maturity,
        offer: offerStrip,
        dealersRateBid: dealersRateBidStrip,
        dealersRateOffer: dealersRateOfferStrip,
    };

    const request = axios.post('financialserv/api/v1/temp_products/add', newData);

    return (dispatch) =>
        request.then((response) => {

            if (response.status === 200) {
                dispatch(showMessage({ message: 'Tbills Saved Successfully' }));
            } else {
                dispatch(showMessage({ message: 'Tbills failed to save' }));
            }

            Promise.all([
                dispatch({
                    type: SAVE_TBILLS_PRODUCT,
                    payload: response.data,
                })
            ]).then(() => dispatch(getPendingTbillsProduct(1)))
        }
        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
}

export function openEditTbillsDialog(data) {
    return {
        type: OPEN_EDIT_TBILLS_DIALOG,
        data
    }
}

export function closeEditTbillsDialog() {
    return {
        type: CLOSE_EDIT_TBILLS_DIALOG
    }
}

export function updateTbills(data) {

    // let { id, name, initialVolume, bid, maturity, offer, productId, dealersRateBid, dealersRateOffer } = data;
    let { id, name, initialVolume, bid, maturity, offer, dealersRateBid, dealersRateOffer } = data;
    const customizeProductId = data.productId;

    const nameUpper = name.toUpperCase();
    const initialVolumeStrip = Math.abs(initialVolume);
    const bidStrip = Math.abs(bid);
    const offerStrip = Math.abs(offer);
    const dealersRateBidStrip = Math.abs(dealersRateBid);
    const dealersRateOfferStrip = Math.abs(dealersRateOffer);

    const productCategoryC = { id: 1 };
    const productId = customizeProductId === undefined ? id : customizeProductId;

    const newData = {
        id: id,
        name: nameUpper,
        productCategory: productCategoryC,
        initialVolume: initialVolumeStrip,
        totalVolume: initialVolumeStrip,
        bid: bidStrip,
        maturity,
        offer: offerStrip,
        productId,
        dealersRateBid: dealersRateBidStrip,
        dealersRateOffer: dealersRateOfferStrip,
    };

    const request = axios.put('financialserv/api/v1/tempProductService/update', newData);

    return (dispatch) =>
        request.then((response) => {

            if (response.status === 200) {
                dispatch(showMessage({ message: 'Tbills Updated Successfully' }));
            } else {
                dispatch(showMessage({ message: 'Tbills failed to update' }));
            }

            Promise.all([
                dispatch({
                    type: UPDATE_TBILLS,
                    payload: response.data,
                })
            ]).then(() => dispatch(getPendingTbillsProduct(1)))
        }
        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
}


export function openConfirmDialog(id, status) {
    return {
        type: OPEN_CONFIRM_DIALOG,
        payload: { id, status },
    }
}

export function closeConfirmDialog() {
    return {
        type: CLOSE_CONFIRM_DIALOG
    }
}


export function enableProduct(val, avail) {

    let data = Object.assign({}, val);
    data.id = val.id;
    data.available = avail;

    return (dispatch) => {

        const request = axios.put('financialserv/api/v1/tempProductService/update', data);

        return request.then((response) => {

            if (response.data.available === false) {
                dispatch(showMessage({ message: 'Product Disabled Successfully' }));
            } else {
                dispatch(showMessage({ message: 'Product Enable Successfully' }));
            }

            Promise.all([
                dispatch({
                    type: DISABLE_TBILLS
                })
            ]).then(() => dispatch(getPendingTbillsProduct(1)))
        }

        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
    };
}


// PENDING TREASURY BILLS

export function getPendingTbillsProduct(params) {
    const request = axios.get('financialserv/api/v1/temp_products_by_cat/' + params);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PENDING_TBILLS_PRODUCT,
                payload: response.data
            })
        );
}


// maturity upload

export function openNewTbillsMaturityUpload() {
    return {
        type: OPEN_NEW_TBILLS_MATURITY_UPLOAD
    }
}

export function closeNewTbillsMaturityUpload() {
    return {
        type: CLOSE_NEW_TBILLS_MATURITY_UPLOAD
    }
}

export function openEditTbillsMaturityUpload() {
    return {
        type: OPEN_EDIT_TBILLS_MATURITY_UPLOAD
    }
}

export function closeEditTbillsMaturityUpload() {
    return {
        type: CLOSE_EDIT_TBILLS_MATURITY_UPLOAD
    }
}
