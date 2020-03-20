import { FuseLoadable } from '../../../@fuse'

export const PtaDocTypesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/ptadoctypes',
            component: FuseLoadable({
                loader: () => import('./PtaDocTypesApp')
            })
        },
    ]
};