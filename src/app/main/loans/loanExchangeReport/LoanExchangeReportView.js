import React, { Component } from 'react';
import { withStyles, Tab, Tabs, Icon, Typography, Link } from '@material-ui/core';
import { FusePageCarded, FusePageSimple } from '../../../../@fuse';
import { orange } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions';
import LoanExchangeReportList from './components/loanExchangeReportList';
import LoanExchangePerformingReportList from './components/LoanExchangePerformingReportList';
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

class LoanExchangeReportView extends Component {

    state = {
        tabValue: 0,
        form: null
    };

    componentDidMount() {
        const { getAllLoans } = this.props;

        //TODO: 0 is to get all loans and 1 is to get all running loans 2 is for any other things
        getAllLoans(0);
    }


    handleChangeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        const { loanReports } = this.props;
        const { tabValue } = this.state;

        return (
            <FusePageCarded
                // header={
                //     <div className="flex flex-1 items-center justify-between p-24">
                //         <div className="flex flex-col">
                //             <div className="flex items-center mb-16">
                //                 <Link color="inherit" onClick={() => this.handleLink('/apps/dashboards/analytics')}>
                //                     <Icon className="text-18" color="action">home</Icon>
                //                 </Link>
                //                 <Icon className="text-16" color="action">chevron_right</Icon>
                //                 <Typography color="textSecondary">Loan Reports</Typography>
                //             </div>
                //             <Typography variant="h6">Loan Reports</Typography>
                //         </div>
                //     </div>
                // }
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
                        <Tab className="h-64 normal-case" label="All Loans Report" />
                        <Tab className="h-64 normal-case" label="Performing Loan" />
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24 max-w-6xl">
                        {tabValue === 0 && (
                            <div>

                                <LoanExchangeReportList
                                    loanReports={loanReports}
                                />
                            </div>
                        )}
                        {tabValue === 1 && (
                            <div>
                                <LoanExchangePerformingReportList 
                                    loanReports={loanReports}
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
        getAllLoans: Actions.getAllLoans,
    }, dispatch);
}

function mapStateToProps({ loanExchangeRatesApp }) {
    return {
        loanReports: loanExchangeRatesApp.report.loanReports,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanExchangeReportView)));
