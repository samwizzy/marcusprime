import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const TncReportsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        // {
        //     path     : '/apps/accounts/user/:userId',
        //     component: FuseLoadable({
        //         loader: () => import('./AccountsView')
        //     })
        // },
        {
            path     : '/tnc/reports',
            component: FuseLoadable({
                loader: () => import('./TncReportsApp')
            })
        },
        // {
        //     path     : '/apps/accounts',
        //     component: () => <Redirect to="/users/accounts"/>
        // }
    ]
};
