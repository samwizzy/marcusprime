import { FuseLoadable } from '../../../@fuse'

export const RoleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/role/new',
            component: FuseLoadable({
                loader: () => import('./RoleApp')
            })
        },
        {
            path     : '/role/rights',
            component: FuseLoadable({
                loader: () => import('./RoleRights')
            })
        },
        {
            path     : '/role/asign-rights',
            component: FuseLoadable({
                loader: () => import('./RoleModuleRights')
            })
        }
    ]
};