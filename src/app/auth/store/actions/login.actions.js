import firebaseService from '../../../../app/services/firebaseService';
import jwtService from '../../../../app/services/jwtService';
import auth2Service from '../../../../app/services/auth2Service';
import { showMessage } from '../../../../app/store/actions/fuse';
import { setUserData, setUserToken } from './user.actions';
import * as Actions from '../../../../app/store/actions';
import * as userActions from '../../../../app/auth/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ email, password }) {
    return (dispatch) =>
        auth2Service.signInWithEmailAndPassword(email, password)
            .then((user) => {
                // const adUserID = `${user.adUserID}@marcus.com`;
                firebaseService.signInFirebaseData(email, '@abcde[ABCD01234');

                dispatch(setUserToken(user));

                console.log(user, "User administration")

                Promise.all([
                    dispatch({
                        type: LOGIN_SUCCESS
                    })
                ]).then(() => {
                    if(user.role){
                        dispatch(userActions.getRoleRight(user.role.id))
                        dispatch(userActions.getAuthRoles(user.role.id))
                        dispatch(userActions.getRoles())
                    }
                })
            }
            )
            .catch(error => {
                dispatch(showMessage({ message: error.error_description }));
                // dispatch(showMessage({ message: "Network error please try again later" }));
                return dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                });
            });
}

export function submitLoginWithFireBase({ username, password }) {
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if (error.code === 'auth/invalid-api-key') {
                    dispatch(Actions.showMessage({ message: error.message }));
                }

                return dispatch({
                    type: LOGIN_ERROR,
                    payload: response
                });
            });
}
