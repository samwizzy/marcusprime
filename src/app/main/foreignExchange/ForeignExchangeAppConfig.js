import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const ForeignExchangeAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/rate/new',
            component: FuseLoadable({
                loader: () => import('./exchangeRate/ExchangeRatesApp')
            })
        },
        {
            path     : '/rate/fxrates',
            component: FuseLoadable({
                loader: () => import('./fxRates/FxRatesApp')
            })
        },
    ]
};
