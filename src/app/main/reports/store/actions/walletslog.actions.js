import axios from 'axios'
import moment from 'moment'

export const GET_WALLETS_LOG = '[REPORTS APP] GET WALLETS LOG';
export const GET_WALLETS_LOG_BY_DATE = '[REPORTS APP] GET WALLETS LOG BY DATE';

export function getWalletsLog()
{
    const request = axios.get('logserv/api/v1/wallet_logs');

    return (dispatch) =>

        request.then((response) => {
            console.log(response, "Response")
            if(response.status === 200){
                dispatch({
                    type   : GET_WALLETS_LOG,
                    payload: response.data
                })
            }
        })
}

export function getWalletsLogByDate(wallets, date) {
    const startDate = moment(date.startDate).subtract(1, "days")
    const endDate = moment(date.endDate).add(1, "days")
    const walletsLog = wallets && wallets.filter(d => moment(d.valueDate).isBetween(startDate, endDate))

    console.log(walletsLog, "selectedData walletsLog")

    return (dispatch) =>
        dispatch({
            type: GET_WALLETS_LOG_BY_DATE,
            payload: walletsLog,
        })
}
