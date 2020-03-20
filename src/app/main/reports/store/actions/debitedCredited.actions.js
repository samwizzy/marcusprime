import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './';
import moment from 'moment'

export const GET_ACCOUNTS = '[ACCOUNT APP] GET ACCOUNTS';
export const GET_ACCOUNTS_BY_STATUS = '[ACCOUNT APP] GET ACCOUNTS BY STATUS';
export const GET_ACCOUNTS_BY_DATE = '[ACCOUNT APP] GET ACCOUNTS BY DATE';

export function getAccounts() {
    const request = axios.get('financialserv/api/v1/productCategories');
    return (dispatch) => 
    
        request.then((response) => {

            dispatch({
                type: GET_ACCOUNTS,
                payload: response.data,
            })
        });
}

export function getAccountsByStatus(status) {

    const request = axios.get('financialserv/api/v1/investments/get_by_productcategory_and_status?key=' + status);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ACCOUNTS_BY_STATUS,
                payload: response.data,
            })
        );
}

export function getAccountsByDate(accounts, date) {
    const startDate = moment(date.startDate).subtract(1, "days")
    const endDate = moment(date.endDate).add(1, "days")
    const accountsLog = accounts && accounts.filter(d => moment(d.createdAt).isBetween(startDate, endDate))

    console.log(accountsLog, "selectedData accountsLog")

    return (dispatch) =>
        dispatch({
            type: GET_ACCOUNTS_BY_DATE,
            payload: accountsLog,
        })
}