import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../../@fuse';

export const InvestmentTypesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/investment/types/all',
            component: FuseLoadable({
                loader: () => import('./InvestmentTypesApp')
            })
        },
    ]
};
