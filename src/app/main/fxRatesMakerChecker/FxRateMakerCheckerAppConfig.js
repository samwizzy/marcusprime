import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const FxRateMakerCheckerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/makerchecker/fxrates',
            component: FuseLoadable({
                loader: () => import('./FxRateMakerCheckerApp')
            })
        },
    ]
};
