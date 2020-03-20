import {FuseLoadable} from '../../../@fuse';

export const MakerCheckerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/maker/checker',
            component: FuseLoadable({
                loader: () => import('./MakerCheckerApp')
            })
        },
    ]
};
