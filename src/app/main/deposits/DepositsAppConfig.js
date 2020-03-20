import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const DepositsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/rate/deposits',
            component: FuseLoadable({
                loader: () => import('./DepositsApp')
            })
        },
    ]
};
