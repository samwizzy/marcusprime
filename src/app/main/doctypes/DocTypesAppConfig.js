import { FuseLoadable } from '../../../@fuse'

export const DocTypesAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/doctypes',
            component: FuseLoadable({
                loader: () => import('./DocTypesApp')
            })
        },
    ]
};