import React from 'react';
import {FuseLoadable} from '../../../@fuse';
import {Redirect} from 'react-router-dom';
import RoleApp from './RoleApp';

export const RolesAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/roles/users/:id?',
            component: FuseLoadable({
                loader: () => import('./RoleApp')
            })
        },
        {
            path     : '/roles/:roleId/users',
            component: FuseLoadable({
                loader: () => import('./RoleApp')
            })
        },
        {
            path     : '/roles/:roleId/users/:id?',
            component: FuseLoadable({
                loader: () => import('./RoleApp')
            })
        },
        {
            path     : '/roles/:rolesHandle/:id?',
            component: FuseLoadable({
                loader: () => import('./RoleApp')
            })
        },
        {
            path     : '/roles/users',
            component: () => <Redirect to="/roles/users"/>
        }
    ]
};
