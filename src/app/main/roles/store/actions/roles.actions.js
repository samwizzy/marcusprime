import axios from 'axios';
import {FuseUtils} from '../../../../../@fuse';
import {showMessage} from '../../../../../app/store/actions/fuse';

export const GET_ROLES = '[ROLE APP] GET ROLES';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export function getRoles()
{
    const request = axios.get('authserv/api/v1/roles');

    return (dispatch) =>
        request.then((response) => 
            dispatch({
                type   : GET_ROLES,
                payload: response.data
            })
        );
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

