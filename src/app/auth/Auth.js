import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../app/auth/store/actions';
import { bindActionCreators } from 'redux';
import * as Actions from '../../app/store/actions';
import firebaseService from '../../app/services/firebaseService';
import auth0Service from '../../app/services/auth0Service';
import auth2Service from '../../app/services/auth2Service';
import jwtService from '../../app/services/jwtService';

class Auth extends Component {
    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props) {
        super(props);

        /**
         * Comment the line if you do not use JWt
         */
        this.auth2Check();

        /**
         * Comment the line if you do not use JWt
         */
        // this.jwtCheck();

        /**
         * Comment the line if you do not use Auth0
         */
        //this.auth0Check();

        /**
         * Comment the line if you do not use Firebase
         */
        this.firebaseCheck();
    }

    auth2Check = () => {
        auth2Service.on('onAutoLogin', () => {
    
            this.props.showMessage({ message: 'Logging in with Auth2' });

            /**
             * Sign in and retrieve user data from Api
             */
            auth2Service.signInWithToken()
                .then(user => {
                    this.props.setUserData(user);
                    if(user.role.id !== 1){
                        user.role && this.props.getRoleRight(user.role.id);
                        user.role && this.props.getAuthRoles(user.role.id);
                    }                    
                    this.props.getRoles();

                    this.props.showMessage({ message: 'Logged in with Auth2' });
                })
                .catch(error => {
                    this.props.showMessage({ message: error });
                })
        });

        auth2Service.on('onAutoLogout', (message) => {
            if (message) {
                this.props.showMessage({ message });
            }
            this.props.logout();
        });

        auth2Service.init();
    };

    jwtCheck = () => {
        jwtService.on('onAutoLogin', () => {

            this.props.showMessage({ message: 'Logging in with JWT' });

            /**
             * Sign in and retrieve user data from Api
             */
            jwtService.signInWithToken()
                .then(user => {
                    this.props.setUserData(user);

                    this.props.showMessage({ message: 'Logged in with JWT' });
                })
                .catch(error => {
                    this.props.showMessage({ message: error });
                })
        });

        jwtService.on('onAutoLogout', (message) => {
            if (message) {
                this.props.showMessage({ message });
            }
            this.props.logout();
        });

        jwtService.init();
    };

    auth0Check = () => {

        auth0Service.init();

        if (auth0Service.isAuthenticated()) {
            this.props.showMessage({ message: 'Logging in with Auth0' });

            /**
             * Retrieve user data from Auth0
             */
            auth0Service.getUserData().then(tokenData => {

                this.props.setUserDataAuth0(tokenData);

                this.props.showMessage({ message: 'Logged in with Auth0' });
            })
        }
    };

    firebaseCheck = () => {

        firebaseService.init();

        firebaseService.onAuthStateChanged(authUser => {
            if (authUser) {
                this.props.showMessage({ message: 'Logging in with Firebase' });

                /**
                 * Retrieve user data from Firebase
                 */
                // firebaseService.getUserData(authUser.uid).then(user => {

                //     this.props.setUserDataFirebase(user, authUser);

                //     this.props.showMessage({message: 'Logged in with Firebase'});
                // })
            }
        });
    };

    render() {
        const { children } = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getRoleRight: userActions.getRoleRight,
        getRoleRights: userActions.getRoleRights,
        getAuthRoles: userActions.getAuthRoles,
        getRoles: userActions.getRoles,
        logout: userActions.logoutUser,
        setUserData: userActions.setUserData,
        setUserToken: userActions.setUserToken,
        setUserDataAuth0: userActions.setUserDataAuth0,
        setUserDataFirebase: userActions.setUserDataFirebase,
        showMessage: Actions.showMessage,
        hideMessage: Actions.hideMessage
    },
        dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
