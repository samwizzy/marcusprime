import {FuseLoadable} from '../../../@fuse';

export const LoansAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [

        {
            path     : '/loan/exchange',
            component: FuseLoadable({
                loader: () => import('./loanExchange/LoanExchangeApp')
            })
        },
        {
            path     : '/loan/reports',
            component: FuseLoadable({
                loader: () => import('./loanExchangeReport/LoanExchangeReportApp')
            })
        },
    ]
};
