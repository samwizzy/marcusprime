import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../store/actions/fuse';
import * as Actions from '.'

export const WALLET_FUND          = '[WALLET FUND APP] WALLET_FUND';
export const OPEN_COMPOSE_DIALOG  = '[WALLET FUND APP] OPEN COMPOSE DIALOG DOCTYPE';
export const OPEN_UPDATE_COMPOSE_DIALOG  = '[WALLET FUND APP] OPEN UPDATE COMPOSE DIALOG DOCTYPE';
export const CLOSE_COMPOSE_DIALOG = '[WALLET FUND APP] CLOSE COMPOSE DIALOG DOCTYPE';


export function fundWallet(data)
{
    const request = axios.post('financialserv/api/v1/wallet/fund_customer_wallet', data);

    console.log(request, "request")

    return (dispatch) =>

        request.then((response) => {
            if(response.status === 200){
                dispatch(showMessage({message: response.data.message}));

                Promise.all([
                    dispatch({
                        type: WALLET_FUND,
                        payload: response.data
                    })
                ])
            }
        }).catch(error => {
            // error.response && reject(error.response.data);
            console.log(error, "wallet error")
        });
}

export function openComposeDialog()
{
    const data = {
        name: '',
        description: '',
        type: ''
    };

    return {
        type: OPEN_COMPOSE_DIALOG,
        payload: {
            status: true,
            form: data
        }
    }
}

export function openUpdateComposeDialog(id)
{
    return {
        type: OPEN_UPDATE_COMPOSE_DIALOG,
        payload: {
            id,
            status: true,
        }
    }
}

export function closeComposeDialog()
{
    return {
        type: CLOSE_COMPOSE_DIALOG,
        payload: {
            status: false
        }
    }
}
