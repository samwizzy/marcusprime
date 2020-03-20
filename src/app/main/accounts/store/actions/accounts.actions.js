import axios from 'axios';
import query from 'query-string';

export const GET_ACCOUNTS = '[ACCOUNTS APP] GET ACCOUNTS';
export const OPEN_USER_PROFILE = '[ACCOUNTS APP] OPEN USER PROFILE';
export const OPEN_USER_PROFILE_BY_UUID = '[ACCOUNTS APP] OPEN USER PROFILE BY UUID';
export const DISABLE_ACCOUNT = '[ACCOUNTS APP] DISABLE ACCOUNT';
export const GET_USER_ACTIVE_INVESTMENTS = '[ACCOUNTS APP] GET USER ACTIVE INVESTMENTS';
export const GET_USER_ALL_INVESTMENTS = '[ACCOUNTS APP] GET USER ALL INVESTMENTS';
export const GET_USER_TRANSACTIONS = '[ACCOUNTS APP] GET USER TRANSACTIONS';
export const GET_USER_WALLETS = '[ACCOUNTS APP] GET USER WALLETS';
export const GET_USER_MATURED_LOG = '[ACCOUNTS APP] GET USER MATURED LOG';
export const GET_USER_WALLET_LOG = '[ACCOUNTS APP] GET USER WALLET LOG';
export const GET_USER_FUNDING_LOG = '[ACCOUNTS APP] GET USER FUNDING LOG';
export const GET_USER_ACTIVITIES_LOG = '[ACCOUNTS APP] GET USER ACTIVITIES LOG';

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

export function getUserProfileByUuid(uuid) {
    const request = axios.get('authserv/api/v1/users/get_by_uuid/' + uuid);
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: OPEN_USER_PROFILE_BY_UUID,
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

export function getActiveUserInvestments(uuid) {

    const request = axios.get('financialserv/api/v1/investments/get_active_by_user/?uuid=' + uuid + '&status=' + true );

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USER_ACTIVE_INVESTMENTS,
                payload: response.data,
            })
        );
}

export function getAllUserInvestments(uuid) {

    const request = axios.get('financialserv/api/v1/investments/get_user_investments/?uuid=' + uuid);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USER_ALL_INVESTMENTS,
                payload: response.data,
            })
        );
}


export function getUserTransactions(uuid) {

    const request = axios.get('logserv/api/v1/transactions/get_by_user/?uuid=' + uuid);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_USER_TRANSACTIONS,
                payload: response.data,
            })
        );
}

export function getUserWallets(uuid) {

    const request = axios.get('authserv/api/v1/wallet/find_by_user?uuid=' + uuid);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USER_WALLETS,
                payload: response.data.subWallets,
            })
        }
    );
}

export function getUserMatureInvestments(status, uuid) {

    const request = axios.get('financialserv/api/v1/investments/get_user_investments/?uuid=' + uuid + '&status='+ status);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USER_MATURED_LOG,
                payload: response.data,
            })
        }
    );
}

export function getUserWalletLogs(walletId) {

    const request = axios.get('logserv/api/v1/wallet_logs/' + walletId);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USER_WALLET_LOG,
                payload: response.data,
            })
        }
    );
}

export function getUserActivityLogs(id) {

    const request = axios.get('logserv/api/v1/activity/get_user_log/?userId=' + id);

    console.log(request, 'getUserActivityLogs')

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USER_ACTIVITIES_LOG,
                payload: response.data,
            })
        }
    );
}
