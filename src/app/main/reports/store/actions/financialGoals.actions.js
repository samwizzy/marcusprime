import axios from 'axios';
import { baseUri, tokenConfig } from '../../../config';

export const GET_FINANCIAL_GOALS = '[FINANCIAL GOALS APP] GET FINANCIAL GOALS';

export function getAllFinancialGoals(key) {

    const request = axios.get('financialserv/api/v1/investments/get_by_productcategory_and_status?key=' + key);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_FINANCIAL_GOALS,
                payload: response.data,
            })
        );
}