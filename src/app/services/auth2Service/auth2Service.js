import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '../../../@fuse/FuseUtils';
import qs from 'qs';
import '../../fuse-configs/axiosConfig';
import Firebase from '../firebaseService'

const settings = {
    layout: {
        style: 'layout1',
        config: {
            scroll: 'content',
            navbar: {
                display: true,
                folded: false,
                position: 'left'
            },
            toolbar: {
                display: true,
                style: 'fixed',
                position: 'below'
            },
            footer: {
                display: true,
                style: 'fixed',
                position: 'below'
            },
            mode: 'fullwidth'
        }
    },
    customScrollbars: true,
    theme: {
        main: 'default',
        navbar: 'defaultDark',
        toolbar: 'defaultDark',
        footer: 'defaultDark'
    }
};

class auth2Service extends FuseUtils.EventEmitter {

    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                console.log(err, "Error from Axios interceptor")
                if ( err.response && err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null, null);
                    console.log('You are getting this inside Interceptor and because you got a 401 unauthorized error');
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {
        let access_token = this.getAccessToken();
        let refresh_token = this.getRefreshToken();

        if (!access_token && !refresh_token) {
            this.emit('onAutoLogout', 'access_token expired');
            return;
        }

        if (this.isAuthTokenValid(access_token, refresh_token)) {
            this.setSession(access_token, refresh_token);
            this.emit('onAutoLogin', true);
        }
        else {
            this.setSession(null, null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if (response.data.user) {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else {
                        reject(response.data.error);
                    }
                });
        });
    };

    customOnUploadProgress (ev) {
        console.log('customOnUploadProgress', ev);
    }

    signInWithEmailAndPassword = (username, password, grant_type = 'password') => {
        const token = new Buffer('admin-client' + ":" + 'unionadmin').toString('base64');
        axios.defaults.headers.common['Authorization'] = 'Basic ' + token;

        return new Promise((resolve, reject) => {

            const decode = decodeURIComponent(qs.stringify({ username, password, grant_type }));
            axios.post('authserv/oauth/token', decode, {
                onUploadProgress: this.customOnUploadProgress
            })
            .then(response => {
                if ( response.data.access_token )
                {
                    this.setSession(response.data.access_token, response.data.refresh_token);
                    this.updateUserData(response.data.access_token)
                    .then(user => {
                        if (user) {
                            resolve(user);
                        }
                        else {
                            reject(response.data.error);
                        }
                    });
                }
                else
                {
                    reject(response.data.error);
                }
            })
            .catch(error => {
                error.response && reject(error.response.data);
            });
            
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            const data = qs.stringify({
                access_token: this.getAccessToken(),
            });

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getAccessToken();
            // axios.defaults.headers.common['X-Frame-Options'] = 'sameorigin';

            axios.get('authserv/api/v1/admin/userprofile', data)
                .then(response => {
                    if ( response.data )
                    {
                        response.data.settings = settings;
                        response.data.from = "auth2";
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = (access_token) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.common['X-Frame-Options'] = 'sameorigin';
        return new Promise((resolve, reject) => {
            return axios.get('authserv/api/v1/admin/userprofile', qs.stringify({ access_token }) )
            .then(response => {
                if ( response.data ) {
                    response.data.settings = settings;
                    response.data.from = "auth2";
                    resolve(response.data);
                }else{
                    reject({"error": "User Profile failed to update"});
                }
            });
        })
    }

    setSession = (access_token, refresh_token) => {
        if ( access_token )
        {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null, null);
        Firebase.signOut();

        // return new Promise((resolve, reject) => {
        //     axios.post('/api/v1/logout')
        //         .then(response => {
        //             if (response.data) {
        //                 this.setSession(response.data);
        //                 resolve(response.data);
        //             }
        //             else {
        //                 reject(response.data.error);
        //             }
        //         });
        // });
    };

    isAuthTokenValid = (access_token, refresh_token) => {

        if (!access_token && !refresh_token) {
            // console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('access_token');
    };

    getRefreshToken = () => {
        return window.localStorage.getItem('refresh_token');
    };
}

const instance = new auth2Service();

export default instance;