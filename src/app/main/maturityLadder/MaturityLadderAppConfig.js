import {FuseLoadable} from '../../../@fuse';

export const MaturityLadderAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/running/maturity/:id',
            component: FuseLoadable({
                loader: () => import('./allMaturities/components/InvestmentsByProduct')
            })
        },
        {
            path     : '/running/maturity',
            component: FuseLoadable({
                loader: () => import('./allMaturities/AllMaturitiesApp')
            })
        },
    ]
};
