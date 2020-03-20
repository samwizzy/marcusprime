import axios from 'axios';
import qs from 'qs';
import { showMessage } from '../../../../store/actions/fuse';

export const GET_TRANSFER_QUEUE = '[TRANSFER QUEUE APP] GET TRANSFER QUEUE';
export const SEND_TRANSFER_QUEUE = '[TRANSFER QUEUE APP] SEND TRANSFER QUEUE';
export const DELETE_TRANSFER_QUEUE = '[TRANSFER QUEUE APP] DELETE TRANSFER QUEUE';
export const OPEN_NEW_TRANSFER_QUEUE_DIALOG = '[TRANSFER QUEUE APP] OPEN NEW TRANSFER QUEUE DIALOG';
export const CLOSE_NEW_TRANSFER_QUEUE_DIALOG = '[TRANSFER QUEUE APP] CLOSE NEW TRANSFER QUEUE DIALOG';


export function getAllTransferQueue() {
    const request = axios.get('financialserv/api/v1/get_all_transfer_queue');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_TRANSFER_QUEUE,
                payload: response.data
            })
        );
}


export function openTransferDialog(data) {
    return {
        type: OPEN_NEW_TRANSFER_QUEUE_DIALOG,
        payload: data,
    }
}

export function closeTransferDialog() {
    return {
        type: CLOSE_NEW_TRANSFER_QUEUE_DIALOG
    }
}

export function approveTransfer(data) {

    const request = axios.post('financialserv/api/v1/do_transfer/' + data.id);

    console.log(request, 'request')

    return (dispatch) =>
        request.then((response) => {
            dispatch(showMessage({ message: response.data.message }));

            Promise.all([
                dispatch({
                    type: SEND_TRANSFER_QUEUE,
                    payload: response.data,
                })
            ]).then(() => dispatch(getAllTransferQueue()))
        }
        );
}

// export function deleteTransfer(data) {

//     const request = axios.post('financialserv/api/v1/temp_product/approve/'+data.id);

//     console.log(request, 'request')

//     return (dispatch) =>
//         request.then((response) =>{
//             dispatch(showMessage({message: 'Product Declined Successfully'}));

//             Promise.all([
//                 dispatch({
//                     type: DELETE_TRANSFER_QUEUE,
//                     payload: response.data,
//                 })
//             ]).then(() => dispatch(getAllTransferQueue()))
//         }
//         );
// }
