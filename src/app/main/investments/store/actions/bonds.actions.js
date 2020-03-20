import axios from 'axios';
import { showMessage } from '../../../../../app/store/actions/fuse';

export const GET_PENDING_BONDS_PRODUCT = '[BONDS APP] GET PENDING BONDS PRODUCT';
export const SAVE_BONDS_PRODUCT = '[BONDS APP] SAVE BOND PRODUCT';
export const GET_BONDS_PRODUCT = '[BONDS APP] GET BOND PRODUCT';
export const GET_BONDS_DETAILS = '[BONDS APP] BONDS DETAILS PRODUCT';
export const UPDATE_BONDS = '[BONDS APP] UPDATE BONDS';
export const DISABLE_BONDS = '[BONDS APP] DISABLE BONDS';
export const OPEN_NEW_BONDS_DIALOG = '[BONDS APP] OPEN NEW BONDS DIALOG';
export const CLOSE_NEW_BONDS_DIALOG = '[BONDS APP] CLOSE NEW BONDS DIALOG';
export const OPEN_EDIT_BONDS_DIALOG = '[BONDS APP] OPEN EDIT BONDS DIALOG';
export const CLOSE_EDIT_BONDS_DIALOG = '[BONDS APP] CLOSE EDIT BONDS DIALOG';
export const OPEN_NEW_BONDS_MATURITY_UPLOAD = '[BONDS APP] OPEN NEW BONDS MATURITY UPLOAD';
export const CLOSE_NEW_BONDS_MATURITY_UPLOAD = '[BONDS APP] CLOSE NEW BONDS MATURITY UPLOAD';
export const OPEN_EDIT_BONDS_MATURITY_UPLOAD = '[BONDS APP] OPEN EDIT BONDS MATURITY UPLOAD';
export const CLOSE_EDIT_BONDS_MATURITY_UPLOAD = '[BONDS APP] CLOSE EDIT BONDS MATURITY UPLOAD';

export function getBondsProduct(params) {
    const request = axios.get('financialserv/api/v1/productsByCategories/' + params);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BONDS_PRODUCT,
                payload: response.data
            })
        );
}

export function getBondsDetails(id) {

    const request = axios.get('financialserv/api/v1/products/' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_BONDS_DETAILS,
                payload: response.data,
            })
        );
}

export function openNewBondsDialog() {
    return {
        type: OPEN_NEW_BONDS_DIALOG
    }
}

export function closeNewBondsDialog() {
    return {
        type: CLOSE_NEW_BONDS_DIALOG
    }
}

export function saveBondsProduct(data) {

    let { initialVolume, totalVolume, couponRate, yieldRate, offer, maturity, name, bid, dealersRateBid, dealersRateOffer } = data;

    const nameUpper = name.toUpperCase();
    const initialVolumeStrip = Math.abs(initialVolume);
    const totalVolumeStrip = Math.abs(totalVolume);
    const couponRateStrip = Math.abs(couponRate);
    const yieldRateStrip = Math.abs(yieldRate);
    const bidStrip = Math.abs(bid);
    const offerStrip = Math.abs(offer);
    const dealersRateBidStrip = Math.abs(dealersRateBid);
    const dealersRateOfferStrip = Math.abs(dealersRateOffer);

    const productCategoryC = { id: 2 };

    const newData = {
        id: null,
        name: nameUpper,
        productCategory: productCategoryC,
        initialVolume: initialVolumeStrip,
        totalVolume: initialVolumeStrip,
        couponRate: couponRateStrip,
        yieldRate: yieldRateStrip,
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
                dispatch(showMessage({ message: 'Bond Saved Successfully' }));
            } else {
                dispatch(showMessage({ message: 'Bond failed to save' }));
            }

            Promise.all([
                dispatch({
                    type: SAVE_BONDS_PRODUCT,
                    payload: response.data,
                })
            ]).then(() => dispatch(getPendingBondsProduct(2)))
        }
        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
}

export function openEditBondsDialog(data) {
    return {
        type: OPEN_EDIT_BONDS_DIALOG,
        data
    }
}

export function closeEditBondsDialog() {
    return {
        type: CLOSE_EDIT_BONDS_DIALOG
    }
}

export function updateBonds(data) {

    // let { id, initialVolume, totalVolume, couponRate, yieldRate, offer, maturity, name, bid, productId, dealersRateBid, dealersRateOffer } = data;
    let { id, initialVolume, totalVolume, couponRate, yieldRate, offer, maturity, name, bid, dealersRateBid, dealersRateOffer } = data;
    const customizeProductId = data.productId;

    const nameUpper = name.toUpperCase();
    const initialVolumeStrip = Math.abs(initialVolume);
    const totalVolumeStrip = Math.abs(totalVolume);
    const couponRateStrip = Math.abs(couponRate);
    const yieldRateStrip = Math.abs(yieldRate);
    const bidStrip = Math.abs(bid);
    const offerStrip = Math.abs(offer);
    const dealersRateBidStrip = Math.abs(dealersRateBid);
    const dealersRateOfferStrip = Math.abs(dealersRateOffer);

    const productCategoryC = { id: 2 };
    const productId = customizeProductId === undefined ? id : customizeProductId;

    const newData = {
        id: id,
        name: nameUpper,
        productCategory: productCategoryC,
        initialVolume: initialVolumeStrip,
        totalVolume: initialVolumeStrip,
        couponRate: couponRateStrip,
        yieldRate: yieldRateStrip,
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
                dispatch(showMessage({ message: 'Bond Updated Successfully' }));
            } else {
                dispatch(showMessage({ message: 'Bond failed to update' }));
            }

            Promise.all([
                dispatch({
                    type: UPDATE_BONDS,
                    payload: response.data,
                })
            ]).then(() => dispatch(getPendingBondsProduct(2)))
        }
        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
}

export function disableProduct(val, avail) {

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
                    type: DISABLE_BONDS
                })
            ]).then(() => dispatch(getBondsProduct(2)))
        }

        ).catch(error => {
            dispatch(showMessage({ message: error.response.data.error }));
        });
    };
}


// PENDING BONDS BILLS

export function getPendingBondsProduct(params) {
    const request = axios.get('financialserv/api/v1/temp_products_by_cat/' + params);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_PENDING_BONDS_PRODUCT,
                payload: response.data
            })
        );
}

// maturity upload

export function openNewBondsMaturityUpload() {
    return {
        type: OPEN_NEW_BONDS_MATURITY_UPLOAD
    }
}

export function closeNewBondsMaturityUpload() {
    return {
        type: CLOSE_NEW_BONDS_MATURITY_UPLOAD
    }
}

export function openEditBondsMaturityUpload() {
    return {
        type: OPEN_EDIT_BONDS_MATURITY_UPLOAD
    }
}

export function closeEditBondsMaturityUpload() {
    return {
        type: CLOSE_EDIT_BONDS_MATURITY_UPLOAD
    }
}
