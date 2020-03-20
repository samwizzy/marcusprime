import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const AccountsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/users/accounts/:userUuid',
            component: FuseLoadable({
                loader: () => import('./AccountsView')
            })
        },
        {
            path     : '/users/accounts',
            component: FuseLoadable({
                loader: () => import('./AccountsApp')
            })
        },
        {
            path     : '/users/accounts',
            component: () => <Redirect to="/users/accounts"/>
        }
    ]
};
