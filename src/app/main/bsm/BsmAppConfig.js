import { FuseLoadable } from '../../../@fuse'
import {authRoles} from '../../../app/auth';

export const BsmAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.bsm,
    routes  : [
        {
            path     : '/apps/pta',
            component: FuseLoadable({
                loader: () => import('./pta/PtaApp')
            })
        },
        {
            path     : '/apps/branch',
            component: FuseLoadable({
                loader: () => import('./branch/BranchApp')
            })
        },
        {
            path     : '/apps/pta-manager',
            component: FuseLoadable({
                loader: () => import('./pta-manager/PtaManagerApp')
            })
        }
    ]
};