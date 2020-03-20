import axios from 'axios';
import query from 'query-string';

export const GET_ACCOUNTS = '[ACCOUNTS APP] GET ACCOUNTS';
export const OPEN_USER_PROFILE = '[ACCOUNTS APP] OPEN USER PROFILE';
export const DISABLE_ACCOUNT = '[ACCOUNTS APP] DISABLE ACCOUNT';
export const GET_USER_INVESTMENTS = '[ACCOUNTS APP] GET USER INVESTMENTS';
export const GET_USER_TRANSACTIONS = '[ACCOUNTS APP] GET USER TRANSACTIONS';
export const GET_USER_WALLETS = '[ACCOUNTS APP] GET USER WALLETS';

export function getUsers() {
    const request = axios.get('authserv/api/v1/users');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ACCOUNTS,
                payload: response.data,
            })
        );
}

export function getUserProfile(data) {
    const request = axios.get('authserv/api/v1/users/' + data);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_USER_PROFILE,
                payload: response.data,
            })
        );
}

export function disableAccount(userId, enable) {

    const data = { userId, enable };

    return (dispatch) => {

        const request = axios.post('authserv/api/v1/user/enable', query.stringify(data));

        return request.then((response) => {
            Promise.all([
                dispatch({
                    type: DISABLE_ACCOUNT
                })
            ]).then(() => dispatch(getUsers()))
        }

        );
    };
}

export function getUserInvestments(id) {

    const request = axios.get('authserv/api/v1/investments/get_user_investments/?userId=' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USER_INVESTMENTS,
                payload: response.data,
            })
        );
}

export function getUserTransactions(id) {

    const request = axios.get('authserv/api/v1/transactions/get_by_user/?userId=' + id);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USER_TRANSACTIONS,
                payload: response.data,
            })
        );
}

export function getUserWallets(id) {

    const request = axios.get('authserv/api/v1/users/' + id);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USER_WALLETS,
                payload: response.data.wallet.subWallets,
            })
        }
    );
}
