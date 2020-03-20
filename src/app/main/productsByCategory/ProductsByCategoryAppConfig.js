import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const productsByCategoryAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/investments/product/category/:id',
            component: FuseLoadable({
                loader: () => import('./ProductsByCategoryApp')
            })
        },
    ]
};
