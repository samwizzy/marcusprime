import React, { Component } from 'react';
import { FormControlLabel, Switch, withStyles, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
import _ from 'lodash';

const styles = theme => ({
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class LoanExchangePerformingReportList extends Component {

    // componentDidMount() {
    //     const { getAllLoans } = this.props;

    //     //TODO: 0 is to get all loans and 1 is to get all running loans 2 is for any other things
        
    //     getAllLoans(1);
    // }

    render() {
        const { loanReports } = this.props;

        const performingLoan = _.filter(loanReports, item => item.classification === "PERFORMING");

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormControlLabel
                                label={tableMeta.rowIndex + 1}
                                control={
                                    <Icon></Icon>
                                }
                            />
                        );

                    }
                }
            },
            {
                name: "accountNumber",
                label: "Account Number",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "customerId",
                label: "Customer ID",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "primaryApplicantName",
                label: "Primary Application Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "productName",
                label: "Product Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "bookDate",
                label: "Book Date",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: day => {
                    //     return (
                    //         <Typography variant="inherit" color="textSecondary">
                    //             {moment(day).format('DD-MM-YYYY')}
                    //         </Typography>
                    //     )
                    // }
                }
            },
            {
                name: "valueDate",
                label: "Value Date",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: day => {
                    //     return (
                    //         <Typography variant="inherit" color="textSecondary">
                    //             {moment(day).format('DD-MM-YYYY')}
                    //         </Typography>
                    //     )
                    // }
                }
            },
            {
                name: "maturityDate",
                label: "Maturity Date",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: day => {
                    //     return (
                    //         <Typography variant="inherit" color="textSecondary">
                    //             {moment(day).format('DD-MM-YYYY')}
                    //         </Typography>
                    //     )
                    // }
                }
            },
            {
                name: "amountFinanced",
                label: "Amount Financed",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "amountDisbursed",
                label: "Amount Disbursed",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "interestRate",
                label: "Interest Rate",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "currency",
                label: "Currency",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "principalDue",
                label: "Principal Due",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: value => {
                    //     const nf = new Intl.NumberFormat("en-US", {
                    //         style: "currency",
                    //         currency: "NGN",
                    //         minimumFractionDigits: 2,
                    //         maximumFractionDigits: 2
                    //     });

                    //     return nf.format(value);
                    // }
                }
            },
            {
                name: "princDueDate",
                label: "Principal Due Date",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: day => {
                    //     return (
                    //         <Typography variant="inherit" color="textSecondary">
                    //             {moment(day).format('DD-MM-YYYY')}
                    //         </Typography>
                    //     )
                    // }
                }
            },
            {
                name: "intDue",
                label: "INT Due",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "intDueDate",
                label: "INT Due Date",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: day => {
                    //     return (
                    //         <Typography variant="inherit" color="textSecondary">
                    //             {moment(day).format('DD-MM-YYYY')}
                    //         </Typography>
                    //     )
                    // }
                }
            },
            {
                name: "princBal",
                label: "PRINC BAL",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "intBal",
                label: "Int BAL",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        return nf.format(value);
                    }
                }
            },
            {
                name: "userDefinedStatus",
                label: "User Defined Status",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "accrualStatus",
                label: "Accrual Status",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "classification",
                label: "Classification",
                options: {
                    filter: true,
                    sort: false,
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            selectableRows: 'none',
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Loan Reports"}
                    data={performingLoan}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // getAllLoans: Actions.getAllLoans,
    }, dispatch);
}

function mapStateToProps({ loanExchangeRatesApp }) {
    return {
        // loanReports: loanExchangeRatesApp.report.loanReports,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanExchangePerformingReportList)));
