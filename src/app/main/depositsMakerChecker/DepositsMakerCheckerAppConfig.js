import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const DepositsMakerCheckerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/makerchecker/fixeddeposits',
            component: FuseLoadable({
                loader: () => import('./DepositsMakerCheckerApp')
            })
        },
    ]
};
