import {FuseLoadable} from '../../../@fuse';

export const GLTransferAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/transfer/logs',
            component: FuseLoadable({
                loader: () => import('./GLTransferApp')
            })
        },
    ]
};
