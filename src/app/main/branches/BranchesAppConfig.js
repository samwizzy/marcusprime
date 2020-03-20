import {FuseLoadable} from '../../../@fuse';

export const BranchesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/branches',
            component: FuseLoadable({
                loader: () => import('./BranchesApp')
            })
        },
    ]
};
