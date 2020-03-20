import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';
import * as Actions from './'

export const GET_BRANCHES = '[BRANCH APP] GET BRANCHES';
export const GET_BRANCH = '[BRANCH APP] GET BRANCH';
export const GET_BRANCH_BY_BSM = '[BRANCH APP] GET BRANCH BY BSM';
export const GET_BRANCH_BY_HTN = '[BRANCH APP] GET BRANCH BY HTN';
export const APPROVE_BRANCH = '[BRANCH APP] APPROVE BRANCH';

export function getBranches()
{
    const request = axios.get('financialserv/api/v1/branches');

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_BRANCHES,
                payload: response.data
            })
        );
}

export function getBranchByBsm(bsmId)
{
    const request = axios.get('financialserv/api/v1/branch_by_bsmid/' + bsmId);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_BRANCH_BY_BSM,
                payload: response.data
            })
        );
}

export function getBranchByHtn(htnId)
{
    const request = axios.get('financialserv/api/v1/branch_by_htnid/' + htnId);

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_BRANCH_BY_HTN,
                payload: response.data
            })
        );
}

export function approveBranch(data)
{
    const request = axios.put('financialserv/api/v1/branch/update', data);

    return (dispatch) =>

        request.then((response) => {
            if(data.funded){
                dispatch(showMessage({message: 'Branch has been marked as available for transaction'}));
            }else{
                dispatch(showMessage({message: 'Branch has been marked as unavailable for transaction'}));
            }

            Promise.all([
                dispatch({
                    type: APPROVE_BRANCH
                })
            ]).then(() => dispatch(Actions.getBranchByBsm(data.bsmId)))
        })
}
