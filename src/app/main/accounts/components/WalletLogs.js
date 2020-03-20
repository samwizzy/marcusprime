import React, { Component } from 'react';
import { FormControlLabel, withStyles, Icon, Typography } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
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

class WalletsList extends Component {

    componentDidMount() {
        const { getUserWalletLogs, userProfileByUuid } = this.props;

        getUserWalletLogs(userProfileByUuid.walletId);
    }


    render() {
        const { userWalletLogs } = this.props;

        const data = _.orderBy(userWalletLogs, ['createdAt'], ['desc']);

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
                name: 'amount',
                label: "Amount",
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
                name: "currencyCode",
                label: "Currency Code",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "direction",
                label: "Type",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "narration",
                label: "Narration",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "paymentReference",
                label: "Payment Reference",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "transactionDate",
                label: "Created Date",
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

                <div>
                    <MUIDataTable
                        title={"Wallet Logs"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </div>

            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUserWalletLogs: Actions.getUserWalletLogs,
        getUserProfileByUuid: Actions.getUserProfileByUuid,
    }, dispatch);
}

function mapStateToProps({ accountsApp }) {
    return {
        userWalletLogs: accountsApp.accounts.userWalletLogs,
        userProfileByUuid: accountsApp.accounts.userProfileByUuid,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsList)));
