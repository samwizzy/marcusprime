import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const UserNotificationAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/app/notification',
            component: FuseLoadable({
                loader: () => import('./UserNotificationApp')
            })
        },
    ]
};
