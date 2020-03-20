import {FuseLoadable} from '../../../@fuse';

export const TransferQueueAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/transfer/queue',
            component: FuseLoadable({
                loader: () => import('./TransferQueueApp')
            })
        },
    ]
};
