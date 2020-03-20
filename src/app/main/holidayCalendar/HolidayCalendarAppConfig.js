import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const HolidayCalendarAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/app/holiday-calendar',
            component: FuseLoadable({
                loader: () => import('./HolidayCalendarApp')
            })
        },
    ]
};
