import React, {Component} from 'react';
import {withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment'
import _ from 'lodash'
import AddButton from './AddButtonOld'

const styles = theme => ({
    listItem: {
        color         : 'inherit!important',
        textDecoration: 'none!important',
        height        : 40,
        width         : 'calc(100% - 16px)',
        borderRadius  : '0 20px 20px 0',
        paddingLeft   : 24,
        paddingRight  : 12,
        '&.active'    : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        }
    }
});

class WalletTransferLists extends Component {

    componentDidMount(){
        this.props.getTransfers({type: 'Wallet Transfer'})
    }

    render()
    {
        const { transactions, getTransactions, getTransfers, filteredTransactions, isFiltering } = this.props;
        
        const allTransactions = isFiltering? filteredTransactions : transactions
        const selectedTransactions = _.orderBy(allTransactions, ['createdAt'], ['desc']);

        const columns = [
            {
                name: "id",
                label: "ID",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "type",
                label: "Trans. Type",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "narration",
                label: "Narration",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "transactionDirection",
                label: "Direction",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "beneficiaryName",
                label: "Beneficiary",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: status => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {status === false? <Icon>cancel</Icon> : <Icon>done_all</Icon>}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "date",
                label: "Date",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('YYYY-MM-DD')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "amount",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: amount => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                { new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "createdAt",
                label: "Created At",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: createdAt => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(createdAt).format('YYYY-MM-DD HH:mm')}
                            </Typography>
                        )
                    }
                }
            }
        ];

        const headerNames = [
            {
              name: 'ID',
              download: true,
            },
            {
              name: 'TRANS. TYPE',
              download: true,
            },
            {
              name: 'NARRATION',
              download: true,
            },
            {
              name: 'DIRECTION',
              download: true,
            },
            {
              name: 'BENEFICIARY',
              download: true,
            },
            {
              name: 'REFERENCE N0.',
              download: true,
            },
            {
              name: 'STATUS',
              download: true,
            },
            {
              name: 'DATE',
              download: true,
            },
            {
              name: 'AMOUNT',
              download: true,
            },
            {
              name: 'DATE CREATED',
              download: true,
            }
        ];

        const footerNames = ['ID', 'TRANS. TYPE', 'NARRATION', 'DIRECTION', 'BENEFICIARY', 'REFERENCE N0.', 'STATUS', 'DATE', 'AMOUNT', 'CREATED'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            print: false,
            filter: false,
            viewColumns: false,
            downloadOptions: {filename: 'walletTransfer.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const dates = data.map(d => ({...d, data: d.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )}));

                return (
                    buildHead(headerNames) +
                    buildBody(
                        dates.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            },
            customToolbar: () => {
                return (
                    <AddButton />
                );
            }
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Wallet Transfer Report"}
                    data={selectedTransactions}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getTransfers: Actions.getTransfers,
        getTransactions: Actions.getTransactions,
    }, dispatch);
}

function mapStateToProps({transferReportsApp}){
    console.log(transferReportsApp, "transferReportsApp")
    return {
        transactions: transferReportsApp.reports.transactions,
        filteredTransactions: transferReportsApp.reports.filteredTransactions,
        isFiltering: transferReportsApp.reports.isFiltering,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletTransferLists)));
