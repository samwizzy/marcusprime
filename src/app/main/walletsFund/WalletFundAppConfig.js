import { FuseLoadable } from '../../../@fuse'

export const WalletFundAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/walletfund',
            component: FuseLoadable({
                loader: () => import('./WalletFundApp')
            })
        },
    ]
};