import { FuseLoadable } from '../../../@fuse'

export const TncAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/tnc',
            component: FuseLoadable({
                loader: () => import('./TncApp')
            })
        }
    ]
};