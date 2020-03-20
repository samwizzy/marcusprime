import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '../../@fuse/index';
import {LoginConfig} from '../main/login/LoginConfig';
import {AccountsAppConfig} from '../main/accounts/AccountsAppConfig';
import {AnalyticsDashboardAppConfig} from '../main/dashboards/analytics/AnalyticsDashboardAppConfig';
import {ProjectDashboardAppConfig} from '../main/dashboards/project/ProjectDashboardAppConfig';
import {TodoAppConfig} from '../main/todo/TodoAppConfig';
import {InvestmentTypesAppConfig} from '../main/investments/investmentTypes/InvestmentTypesAppConfig';
import {productsByCategoryAppConfig} from '../main/productsByCategory/ProductsByCategoryAppConfig';
import {RoleConfig} from '../main/roles/RoleConfig';
import {ReportsAppConfig} from '../main/reports/ReportsAppConfig';
import {AdminsAppConfig} from '../main/admin/AdminsAppConfig';
import {RolesAppConfig} from '../main/roleManager/RolesAppConfig';
import { FinancialGoalsAppConfig } from '../main/financialGoals/FinancialGoalsAppConfig';
import { ForeignExchangeAppConfig } from '../main/foreignExchange/ForeignExchangeAppConfig';
import { InvestmentsAppConfig } from '../main/investments/InvestmentsAppConfig';
import { RMAppConfig } from '../main/rms/RMAppConfig';
import { DigitalConciergeAppConfig } from '../main/digital-concierge/DigitalConciergeAppConfig';
import { HolidayCalendarAppConfig } from '../main/holidayCalendar/HolidayCalendarAppConfig';
import { BranchesAppConfig } from '../main/branches/BranchesAppConfig';
import { BsmAppConfig } from '../main/bsm/BsmAppConfig';
import { TncAppConfig } from '../main/tnc/TncAppConfig';
import { CustomerServicesAppConfig } from '../main/customerServices/CustomerServicesAppConfig';
import { DocTypesAppConfig } from '../main/doctypes/DocTypesAppConfig';
import { TncReportsConfig } from '../main/users-tnc/TncReportsAppConfig';
import {pagesConfigs} from '../main/pages/pagesConfigs';
import { MakerCheckerAppConfig } from '../main/makerChecker/MakerCheckerAppConfig';
import { LoansAppConfig } from '../main/loans/LoansAppConfig';
import { DepositsAppConfig } from '../main/deposits/DepositsAppConfig';
import { MaturityLadderAppConfig } from '../main/maturityLadder/MaturityLadderAppConfig';
import { ActivityLogsAppConfig } from '../main/activityLogs/ActivityLogsAppConfig';
import { TransferQueueAppConfig } from '../main/transferQueue/TransferQueueAppConfig';
import { GLTransferAppConfig } from '../main/GLTransferLog/GLTransferAppConfig';
import { UtilityAppConfig } from '../main/utility/UtilityAppConfig';
import { UserNotificationAppConfig } from '../main/userNotification/UserNotificationAppConfig';
import { DepositsMakerCheckerAppConfig } from '../main/depositsMakerChecker/DepositsMakerCheckerAppConfig';
import { FxRateMakerCheckerAppConfig } from '../main/fxRatesMakerChecker/FxRateMakerCheckerAppConfig';
import { PtaDocTypesAppConfig } from '../main/ptaDoctypes/PtaDocTypesAppConfig';
import { WalletFundAppConfig } from '../main/walletsFund/WalletFundAppConfig';

const routeConfigs = [
    ...pagesConfigs,
    LoginConfig,
    AnalyticsDashboardAppConfig,
    ProjectDashboardAppConfig,
    TodoAppConfig,
    AccountsAppConfig,
    InvestmentTypesAppConfig,
    productsByCategoryAppConfig,
    RoleConfig,
    RolesAppConfig,
    AdminsAppConfig,
    ReportsAppConfig,
    FinancialGoalsAppConfig,
    ForeignExchangeAppConfig,
    InvestmentsAppConfig,
    RMAppConfig,
    DigitalConciergeAppConfig,
    HolidayCalendarAppConfig,
    BranchesAppConfig,
    BsmAppConfig,
    TncAppConfig,
    CustomerServicesAppConfig,
    DocTypesAppConfig,
    TncReportsConfig,
    MakerCheckerAppConfig,
    LoansAppConfig,
    DepositsAppConfig,
    MaturityLadderAppConfig,
    ActivityLogsAppConfig,
    TransferQueueAppConfig,
    GLTransferAppConfig,
    UtilityAppConfig,
    UserNotificationAppConfig,
    DepositsMakerCheckerAppConfig,
    FxRateMakerCheckerAppConfig,
    PtaDocTypesAppConfig,
    WalletFundAppConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact: true,
        component: () => <Redirect to="/login"/>
    }
];

 export default routes;
