import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const FinancialGoalsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/pta/request',
            component: FuseLoadable({
                loader: () => import('./ptaRequests/PtaRequestsApp')
            })
        },
        {
            path     : '/fees/request',
            component: FuseLoadable({
                loader: () => import('./feeRequests/feesRequestsApp')
            })
        },
    ]
};
