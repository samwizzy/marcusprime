import React, { Component } from 'react';
import { FormControlLabel, Icon, Typography, withStyles } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
import * as Actions from '../store/actions';
import _ from 'lodash';

class AllInvestmentsList extends Component {

    componentDidMount() {
        const { match, getAllUserInvestments } = this.props;

        getAllUserInvestments(match.params.userUuid);
    }

    render() {

        const { userAllInvestments } = this.props;

        const data = _.orderBy(userAllInvestments, ['createdAt'], ['desc']);

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
                name: "amountInvested",
                label: "Amount Invested",
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

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "faceValue",
                label: "Face Value",
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

                        if (value === '') {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "product.productCategory.name",
                label: "Product Category",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "createdAt",
                label: "Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if (day === '') {
                            return ('')
                        } else {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('MMMM Do YYYY, h:mm:ss a')}
                                </Typography>
                            )
                        }
                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Investments Records"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllUserInvestments: Actions.getAllUserInvestments,
    }, dispatch);
}

function mapStateToProps({ accountsApp }) {
    return {
        userAllInvestments: accountsApp.accounts.userAllInvestments,
    }
}

export default withStyles({ withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(AllInvestmentsList)));
