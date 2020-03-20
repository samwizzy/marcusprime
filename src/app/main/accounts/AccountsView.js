import React, { Component } from 'react';
import { withStyles, Tab, Tabs, Icon, Typography, Link } from '@material-ui/core';
import { FusePageCarded } from '../../../@fuse';
import { orange } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from '../../../app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import UserInfo from './components/UserInfo';
import ActiveInvestmentsList from './components/ActiveInvestmentsList';
import AllInvestmentsList from './components/AllInvestmentsList';
import TransactionsList from './components/TransactionsList';
import WalletsList from './components/WalletsList';
import DeviceInfo from './components/DeviceInfo';
import ActivitiesLogs from './components/Activities';
import WalletLogs from './components/WalletLogs';
import MaturedLogs from './components/MaturedLogs';
import CapitalizeFirstLetter from '../constant';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            boxShadow: theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class AccountView extends Component {

    state = {
        tabValue: 0,
        form: null
    };

    componentDidMount() {
        const { match, getUserProfileByUuid } = this.props;

        getUserProfileByUuid(match.params.userUuid);
    }


    handleChangeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        const { userProfileByUuid } = this.props;
        const { tabValue } = this.state;

        return (
            <FusePageCarded
                header={
                    <div className="flex flex-1 items-center justify-between p-24">
                        {userProfileByUuid &&
                            <div className="flex flex-col">
                                <div className="flex items-center mb-16">
                                    <Link color="inherit" onClick={evt => this.handleLink('/apps/dashboards/analytics')}>
                                        <Icon className="text-18" color="action">home</Icon>
                                    </Link>
                                    <Icon className="text-16" color="action">chevron_right</Icon>
                                    <Link color="inherit" onClick={evt => this.handleLink('/users/accounts')}>
                                        <Typography color="textSecondary">Users Accounts</Typography>
                                    </Link>
                                    <Icon className="text-16" color="action">chevron_right</Icon>
                                    <Typography color="textSecondary">{userProfileByUuid.firstName} {userProfileByUuid.lastName} Details</Typography>
                                </div>
                                <Typography variant="h6">{CapitalizeFirstLetter(userProfileByUuid.firstName)} {' '} {CapitalizeFirstLetter(userProfileByUuid.lastName)}'s Details</Typography>
                            </div>
                        }
                    </div>
                }
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Personal Info" />
                        <Tab className="h-64 normal-case" label="Device Info" />
                        <Tab className="h-64 normal-case" label="Active Investments" />
                        <Tab className="h-64 normal-case" label="All Investments" />
                        <Tab className="h-64 normal-case" label="Mature Investments" />
                        <Tab className="h-64 normal-case" label="Transactions" />
                        <Tab className="h-64 normal-case" label="Wallets" />
                        <Tab className="h-64 normal-case" label="Wallet Logs" />
                        <Tab className="h-64 normal-case" label="Activities Logs" />
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24 max-w-6xl">
                        {tabValue === 0 && (
                            <div>

                                <UserInfo
                                    userProfile={userProfileByUuid}
                                />
                            </div>
                        )}
                        {tabValue === 1 && (
                            <div>
                                <DeviceInfo
                                    userProfile={userProfileByUuid}
                                />
                            </div>
                        )}
                        {tabValue === 2 && (
                            <div>
                                <ActiveInvestmentsList />
                            </div>
                        )}
                        {tabValue === 3 && (
                            <div>
                                <AllInvestmentsList />
                            </div>
                        )}
                        {tabValue === 4 && (
                            <div>
                                <MaturedLogs />
                            </div>
                        )}
                        {tabValue === 5 && (
                            <div>
                                <TransactionsList />
                            </div>
                        )}
                        {tabValue === 6 && (
                            <div>
                                <WalletsList />
                            </div>
                        )}
                        {tabValue === 7 && (
                            <div>
                                <WalletLogs />
                            </div>
                        )}
                        {tabValue === 8 && (
                            <div>
                                <ActivitiesLogs />
                            </div>
                        )}
                    </div>
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserProfileByUuid: Actions.getUserProfileByUuid,
    }, dispatch);
}

function mapStateToProps({ accountsApp }) {
    return {
        userProfileByUuid: accountsApp.accounts.userProfileByUuid,
    }
}


export default withReducer('accountsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountView))));
