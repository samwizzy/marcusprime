import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const UtilityAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/app/utilities',
            component: FuseLoadable({
                loader: () => import('./UtilityApp')
            })
        },
    ]
};
