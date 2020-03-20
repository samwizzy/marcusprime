import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const RMAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/rms',
            component: FuseLoadable({
                loader: () => import('./RMApp')
            })
        },
    ]
};
