import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const CustomerServicesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/customer/services',
            component: FuseLoadable({
                loader: () => import('./CustomerServicesApp')
            })
        },
    ]
};
