import axios from 'axios'
import moment from 'moment'

export const SET_ORDERS_SEARCH_TEXT = '[REPORTS APP] SET ORDERS SEARCH TEXT';
export const GET_TRANSACTIONS = '[REPORTS APP] GET TRANSACTIONS';
export const GET_TRANSFERS = '[REPORTS APP] GET TRANSFERS';
export const GET_TRANSFERS_BY_DATE = '[REPORTS APP] GET TRANSFERS BY DATE';
export const GET_CALYPSO_BATCHS = '[REPORTS APP] GET CALYPSO BATCHS';
export const GET_CREDITED_DEBITED_ACCOUNTS = '[REPORTS APP] GET CREDIT DEBITS ACCOUNTS';
export const GET_PREMATURED_TERMINATIONS = '[REPORTS APP] GET PREMATURED TERMINATION';

export function setOrdersSearchText(event)
{
    return {
        type      : SET_ORDERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function getTransactions()
{
    const request = axios.get('logserv/api/v1/transactions');

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_TRANSACTIONS,
                    payload: response.data
                })
            }
        })
}

export function getTransfers(params)
{
    const request = axios.get('logserv/api/v1/transactions/get_by_type', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_TRANSFERS,
                    payload: response.data
                })
            }
        })
}

export function getTransferByDate(currentTransfers, date) {

    return (dispatch, getState) => {
        const {transactions} = getState().debitedCreditedApp.reports;
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const filteredTransactions = transactions && transactions.filter(d => moment(d.createdAt).isBetween(startDate, endDate))

        console.log(filteredTransactions, "selectedData filteredTransactionsLog")

        dispatch({
            type: GET_TRANSFERS_BY_DATE,
            payload: filteredTransactions,
        })
    }    
}

export function getCreditsDebitsAccounts(params)
{
    const request = axios.get('logserv/api/v1/transactions/get_by_direction', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_CREDITED_DEBITED_ACCOUNTS,
                    payload: response.data
                })
            }
        })
}

export function getCalypsoBatchs()
{
    const request = axios.get('financialserv/api/v1/calypsoBatchs');

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_CALYPSO_BATCHS,
                    payload: response.data
                })
            }
        })
}

export function getPrematuredInvestment(params)
{
    const request = axios.get('financialserv/api/v1/calypsoBatchs/find_by_buy_or_sell', { params });

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch({
                    type   : GET_PREMATURED_TERMINATIONS,
                    payload: response.data
                })
            }
        })
}

export function getPrematuredByDate(currentTransfers, date) {

    return (dispatch, getState) => {
        const {prematured} = getState().preMaturedApp.reports;
        const startDate = moment(date.startDate).subtract(1, "days")
        const endDate = moment(date.endDate).add(1, "days")
        const filteredPrematured = prematured && prematured.filter(d => moment(d.createdAt).isBetween(startDate, endDate))

        console.log(filteredPrematured, "selectedData filteredPrematured")

        dispatch({
            type: GET_TRANSFERS_BY_DATE,
            payload: filteredPrematured,
        })
    }    
}