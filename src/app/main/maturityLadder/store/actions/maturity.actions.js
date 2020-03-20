import axios from 'axios';

export const GET_MATURITIES = '[MATURITIES LADDER APP] GET MATURITIES';
export const GET_INVESTMENTS_BY_MATURITY = '[MATURITIES LADDER APP] GET INVESTMENTS BY MATURITY';

export function getAllMaturities() {

    const request = axios.get('financialserv/api/v1/products');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_MATURITIES,
                payload: response.data,
            })
        );
}

export function getInvestmentsByMaturity(key) {

    const request = axios.get('financialserv/api/v1/investments/find_by_product?productId=' + key);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENTS_BY_MATURITY,
                payload: response.data,
            })
        );
}