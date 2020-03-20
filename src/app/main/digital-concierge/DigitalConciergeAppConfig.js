import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const DigitalConciergeAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/apps/chat',
            component: FuseLoadable({
                loader: () => import('./chat/ChatApp')
            })
        },
        {
            path     : '/apps/departments',
            component: FuseLoadable({
                loader: () => import('./department/DepartmentApp')
            })
        },
        {
            path     : '/apps/tickets',
            component: FuseLoadable({
                loader: () => import('./tickets/TicketsApp')
            })
        },
        {
            path     : '/apps/tickets/:ticketId?',
            component: FuseLoadable({
                loader: () => import('./tickets/TicketsApp')
            })
        },
        {
            path     : '/apps/dashboard/tickets',
            component: FuseLoadable({
                loader: () => import('./tickets/dashboard/TatDashboard')
            })
        },
        {
            path     : '/apps/turn-around-time',
            component: FuseLoadable({
                loader: () => import('./tickets/TatOnResponse')
            })
        },
        {
            path     : '/apps/ticket/:ticketId',
            component: FuseLoadable({
                loader: () => import('./tickets/CommentsApp')
            })
        },
        {
            path     : '/apps/history/:ticketId?',
            component: FuseLoadable({
                loader: () => import('./tickets/comment/CommentApp')
            })
        }
    ]
};
