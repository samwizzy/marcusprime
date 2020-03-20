import axios from 'axios';
import moment from 'moment'

export const GET_PRODUCT_CATEGORIES = '[INVESTMENTS APP] GET PRODUCT CATEGORIES';
export const GET_INVESTMENTS = '[INVESTMENTS APP] GET INVESTMENTS';
export const GET_INVESTMENTS_BY_DATE = '[INVESTMENTS APP] GET INVESTMENTS BY DATE';
export const GET_INVESTMENTS_STATUS = '[INVESTMENTS APP] GET INVESTMENTS STATUS';

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

export function getAllInvestments() {

    const request = axios.get('financialserv/api/v1/calypsoArchives');
    // const request = axios.get('financialserv/api/v1/calypsoBatchs');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENTS,
                payload: response.data,
            })
        );
}

export function getInvestmentsStatus(key) {

    const request = axios.get('financialserv/api/v1/investments/get_by_productcategory_and_status?key=' + key);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_INVESTMENTS_STATUS,
                payload: response.data,
            })
        );
}

export function getInvestmentsByDate(currentInvestments, date) {

    return (dispatch, getState) => {
        const {investments} = getState().allInvestmentsApp.investments;
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const investmentsLog = investments && investments.filter(d => moment(d.createdAt).isBetween(startDate, endDate))

        console.log(investmentsLog, "selectedData investmentsLog")

        dispatch({
            type: GET_INVESTMENTS_BY_DATE,
            payload: investmentsLog,
        })
    }    
}