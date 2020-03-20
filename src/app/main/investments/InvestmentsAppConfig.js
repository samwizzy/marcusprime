import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const InvestmentsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/tbills/products',
            component: FuseLoadable({
                loader: () => import('./tbillsProducts/TbillsProductsApp')
            })
        },
        {
            path     : '/bonds/products',
            component: FuseLoadable({
                loader: () => import('./bondsProducts/BondsProductsApp')
            })
        },
        {
            path     : '/product/categories',
            component: FuseLoadable({
                loader: () => import('./productCategory/ProductCategoryApp')
            })
        },
        {
            path     : '/investment/products',
            component: FuseLoadable({
                loader: () => import('./pendingProducts/PendingProductsApp')
            })
        },
    ]
};
