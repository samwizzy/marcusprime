import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '../../../@fuse';

export const ReportsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        // Report for investment
        {
            path     : '/apps/reports',
            component: FuseLoadable({
                loader: () => import('./ReportsApp')
            })
        },
        {
            path     : '/reports/investments/:id',
            component: FuseLoadable({
                loader: () => import('./investments/allInvestments/AllInvestmentsApp')
            })
        },
        {
            path     : '/reports/investments',
            component: () => <Redirect to="/investments/all"/>
        },
        {
            path     : '/reports/success/investments/:id',
            component: FuseLoadable({
                loader: () => import('./investments/successInvestments/SuccessInvestmentsApp')
            })
        },
        {
            path     : '/reports/success/investments',
            component: () => <Redirect to="/success/investments/all"/>
        },
        {
            path     : '/reports/failed/investments/:id',
            component: FuseLoadable({
                loader: () => import('./investments/failedInvestments/FailedInvestmentsApp')
            })
        },
        {
            path     : '/reports/failed/investments',
            component: () => <Redirect to="/failed/investments/all"/>
        },

        // Fx sales report
        {
            path     : '/reports/fx/sales',
            component: FuseLoadable({
                loader: () => import('./fx/fxSales/FxSalesApp')
            })
        },
        {
            path     : '/reports/fx/fxSwitch',
            component: FuseLoadable({
                loader: () => import('./fx/fxSwitch/FxSwitchApp')
            })
        },
        {
            path     : '/reports/fx',
            component: FuseLoadable({
                loader: () => import('./fx/fxSales/FxSalesApp')
            })
        },
        {
            path     : '/reports/wallets/endofday',
            component: FuseLoadable({
                loader: () => import('./endOfDay/endOfDayApp')
            })
        },
        {
            path     : '/reports/wallets/reconciliationlog',
            component: FuseLoadable({
                loader: () => import('./wallets/walletsLogApp')
            })
        },
        {
            path     : '/reports/paystack/logs',
            component: FuseLoadable({
                loader: () => import('./paystackLog/paystackLogApp')
            })
        },


        // Report for financial goals
        {
            path     : '/reports/financial/goals/all',
            component: FuseLoadable({
                loader: () => import('./financialGoals/allFinancialGoals/AllFinancialGoalsApp')
            })
        },
        {
            path     : '/reports/financial/goals/all',
            component: () => <Redirect to="/reports/financial/goals/all"/>
        },
        {
            path     : '/reports/success/financial/goals/all',
            component: FuseLoadable({
                loader: () => import('./financialGoals/allFinancialGoals/AllFinancialGoalsApp')
            })
        },
        {
            path     : '/reports/success/financial/goals/all',
            component: () => <Redirect to="/success/financial/goals/all"/>
        },
        {
            path     : '/reports/failed/financial/goals/all',
            component: FuseLoadable({
                loader: () => import('./financialGoals/failedFinancialGoals/FailedFinancialGoalsApp')
            })
        },
        {
            path     : '/reports/exceptions/:typeId',
            component: FuseLoadable({
                loader: () => import('./investments/exceptions/ExceptionsApp')
            })
        },
        {
            path     : '/reports/exceptions/all',
            component: FuseLoadable({
                loader: () => import('./investments/exceptions/ExceptionsApp')
            })
        },
        {
            path     : '/reports/prematured/investments',
            component: FuseLoadable({
                loader: () => import('./investments/prematuredTerm/PreMaturedTermApp')
            })
        },
        {
            path     : '/reports/accounts',
            component: FuseLoadable({
                loader: () => import('./investments/debitedCreditedAccounts/DebitedCreditedApp')
            })
        },
        {
            path     : '/reports/accounts/credit',
            component: FuseLoadable({
                loader: () => import('./investments/debitedCreditedAccounts/DebitedCreditedApp')
            })
        },
        {
            path     : '/reports/accounts/debit',
            component: FuseLoadable({
                loader: () => import('./investments/debitedCreditedAccounts/DebitedCreditedApp')
            })
        },
        {
            path     : '/reports/transfers',
            component: FuseLoadable({
                loader: () => import('./investments/transferReports/TransferReportsApp')
            })
        },
        {
            path     : '/reports/fdcd',
            component: FuseLoadable({
                loader: () => import('./fdcd/fdcdReportsApp')
            })
        },
        {
            path     : '/reports/failed/financial/goals/all',
            component: () => <Redirect to="/failed/financial/goals/all"/>
        },
    ]
};
