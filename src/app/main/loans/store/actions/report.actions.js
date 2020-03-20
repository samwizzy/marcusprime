import axios from 'axios';
import { showMessage } from '../../../../store/actions/fuse';

export const GET_ALL_LOANS_REPORT = '[LOAN REPORT APP] GET ALL LOANS REPORT';

export function getAllLoans(status) {

    const request = axios.get('financialserv/api/v1/loans/report', {params: {status: status}});

    console.log(request, 'loan request')

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_ALL_LOANS_REPORT,
                payload: response.data,
            })
        );
}
