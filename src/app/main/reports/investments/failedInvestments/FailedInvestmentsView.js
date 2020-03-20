import React, { Component } from 'react';
import { withStyles, Tab, Tabs, Icon, Typography, Link } from '@material-ui/core';
import { FusePageCarded } from '../../../../../@fuse';
import { orange } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../../store/actions';
import AllInvestmentList from './components/AllInvestmentList';
import BondsList from './components/BondsList';
import TBillsList from './components/TBillsList';


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

class FailedInvestmentsView extends Component {

    state = {
        tabValue: 0,
        form: null
    };

    componentDidMount() {

        const { getUnsuccessfulInvestments } = this.props;

        // TODO: this is hard coded from backed to get all investment with key (0, 1, 2)
        // TODO: 0 => all investments, 1 => all successful investments, 2 => all unsuccessful investments
        getUnsuccessfulInvestments(2)
    }


    handleChangeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleLink = (link) => {
        this.props.history.push(link);
    }

    render() {

        const { investments } = this.props;
        const { tabValue } = this.state;

        return (
            <FusePageCarded
                header={
                    <div className="flex flex-1 items-center justify-between p-24">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-16">
                                <Link color="inherit" onClick={evt => this.handleLink('/')}>
                                    <Icon className="text-18" color="action">home</Icon>
                                </Link>
                                <Icon className="text-16" color="action">chevron_right</Icon>
                                <Link color="inherit" onClick={evt => this.handleLink('/apps/reports')}>
                                    <Typography color="textSecondary">Reports</Typography>
                                </Link>
                                <Icon className="text-16" color="action">chevron_right</Icon>
                                <Typography color="textSecondary">All Failed Investments</Typography>
                            </div>
                            <Typography variant="h6">All Failed Investments</Typography>
                        </div>
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
                        <Tab className="h-64 normal-case" label="All Failed Investments" />
                        <Tab className="h-64 normal-case" label="All Failed Treasury Bills" />
                        <Tab className="h-64 normal-case" label="All Failed Bonds" />
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24 max-w-6xl">
                        {tabValue === 0 && (
                            <div>

                                <AllInvestmentList
                                    successfulInvestments={investments}
                                />
                            </div>
                        )}
                        {tabValue === 1 && (
                            <div>
                                <TBillsList
                                    successfulTbills={investments}
                                />
                            </div>
                        )}
                        {tabValue === 2 && (
                            <div>
                                <BondsList
                                    successfulBonds={investments}
                                />
                            </div>
                        )}
                    </div>
                    // )
                }
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUnsuccessfulInvestments: Actions.getInvestmentsStatus,
    }, dispatch);
}

function mapStateToProps({ failedInvestmentsApp }) {
    return {
        investments: failedInvestmentsApp.investments.investmentsStatus,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FailedInvestmentsView)));
