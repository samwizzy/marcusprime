import React, {Component} from 'react';
import { withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import AddButton from './AddButton'
import moment from 'moment'
import _ from 'lodash'

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

class WalletsLogLists extends Component {

    changeRowsPerPage = (tableStatePage) => {
        console.log("Your page has just been changed " + tableStatePage, "tableStatePage");
    }

    render()
    {
        const { walletslogs, filteredWalletslogs, isFiltering } = this.props;
        // const filteredEndofdays = endofdays && endofdays.filter(endofday => endofday.currency === 'GBP')
        // const selectedEndofdays = _.orderBy(filteredEndofdays, ['createdAt'], ['desc']);
        console.log(walletslogs, "wallets log")
        const allWalletsLog = isFiltering? filteredWalletslogs : walletslogs

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "walletId",
                label: "Wallet Id",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "customerName",
                label: "Customer Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "customerRef",
                label: "Customer Ref",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "toAccountName",
                label: "To Account Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "toAccountNumber",
                label: "To Account",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "fromAccountNumber",
                label: "From Account",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "fromAccountName",
                label: "From Account Name",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "currencyCode",
                label: "Currency",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "id",
                label: "Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        const selectedWallets = walletslogs.find(wallet => wallet.id === id)
                        const amount = new Intl.NumberFormat('en-NG', {}
                        ).format(selectedWallets.amount);
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {selectedWallets.direction === 'DEBIT'? '-'+amount:amount}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "transactionType",
                label: "Transaction Type",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "narration",
                label: "Narration",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "direction",
                label: "Direction",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "paymentReference",
                label: "Payment Reference",
                options: {
                    filter: true,
                    sort: true
                }
            },
            {
                name: "transactionDate",
                label: "Transaction Date",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "valueDate",
                label: "Value Date",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: date => {
                        if(date === null) return '';
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(date).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
        ];

        const headerNames = [
            {
              name: 'S/N',
              download: true,
            },
            {
              name: 'Wallet Id',
              download: true,
            },
            {
              name: 'Customer Name',
              download: true,
            },
            {
              name: 'Customer Ref',
              download: true,
            },
            {
              name: 'To Account Name',
              download: true,
            },
            {
              name: 'To Account',
              download: true,
            },
            {
              name: 'From Account',
              download: true,
            },
            {
              name: 'From Account Name',
              download: true,
            },
            {
              name: 'Currency',
              download: true,
            },
            {
              name: 'Amount',
              download: true,
            },
            {
              name: 'Transaction Type',
              download: true,
            },
            {
              name: 'Narration',
              download: true,
            },
            {
              name: 'Direction',
              download: true,
            },
            {
              name: 'Payment Reference',
              download: true,
            },
            {
              name: 'Transaction Date',
              download: true,
            },
            {
              name: 'Value Date',
              download: true,
            },
        ];

        const footerNames = ['S/N', 'Wallet Id', 'Customer Name', 'Customer Ref', 'To Account Name', 'To Account', 'From Account', 'From Account Name', 'Currency', 'Amount', 'Transaction Type', 'Narration', 'Direction', 'Payment Reference', 'Transaction Date', 'Value Date'];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'WalletsLogList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const categoriesIndex = columns.findIndex(c => c.label === "Amount");
                const datas = data.map(item =>  {
                    if (categoriesIndex > -1) {
                        const selectedWallets = walletslogs.find(wallet => wallet.id === item.data[categoriesIndex])
                        const amount = new Intl.NumberFormat('en-NG', {}
                        ).format(selectedWallets.amount);
                        item.data[categoriesIndex] = selectedWallets.direction === 'DEBIT'? `-${amount}` : amount
                      return {
                          ...item,
                          data: item.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )
                      }
                    }
                })

                return (
                    buildHead(headerNames) +
                    buildBody(
                        datas.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            },
            onTableChange: (action, tableState) => {
                console.log(action, "Action");
                switch (action) {
                    case 'changeRowsPerPage':
                      this.changeRowsPerPage(tableState.page);
                      break;
                }
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
                    title={"Reconciliation Report"}
                    data={allWalletsLog}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({walletsLogApp}){
    console.log(walletsLogApp, "walletsLogApp.walletslog")
    return {
        walletslogs: walletsLogApp.walletslog.data,
        filteredWalletslogs: walletsLogApp.walletslog.filteredData,
        isFiltering: walletsLogApp.walletslog.isFiltering,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletsLogLists)));
