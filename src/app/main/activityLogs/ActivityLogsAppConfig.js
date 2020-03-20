import {FuseLoadable} from '../../../@fuse';

export const ActivityLogsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/activity/logs',
            component: FuseLoadable({
                loader: () => import('./ActivityLogsApp')
            })
        },
    ]
};
