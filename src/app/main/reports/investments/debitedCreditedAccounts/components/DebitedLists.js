import React, {Component} from 'react';
import {FormControlLabel, Switch, withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../../@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../../store/actions';
import {connect} from 'react-redux';
import MUIDataTable from "mui-datatables";
import CustomSearchRender from './CustomSearchRender';
import formatter from '../../../components/Formatter'
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

class DebitedLists extends Component {

    state = {
        searchText: ''
    }

    componentDidMount(){
        this.props.getCreditsDebitsAccounts({direction: 'debit'})
    }

    render()
    {
        const { accounts, filteredAccounts, isFiltering, getTransactions, getCreditsDebitsAccounts } = this.props;
        const selectedAccounts = _.orderBy(accounts, ['createdAt'], ['desc']);

        const allAccounts = isFiltering? filteredAccounts : accounts

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
                name: "referenceNumber",
                label: "Reference No.",
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
                                {formatter.format(amount)}
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
            filter: true,
            filterType: 'dropdown',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            searchText: this.state.searchText,
            searchPlaceholder: 'Your Custom Search Placeholder',
            customSearch: (searchQuery, currentRow, columns) => {
                let isFound = false;
                currentRow.forEach(col => {
                if(moment(col.toString(), moment.ISO_8601, true).isValid()){
                    if (moment(col.toString()).format('YYYY-MM-DD HH:mm').indexOf(searchQuery) >= 0) {
                        isFound = true;
                    }
                }else{
                    if (col.toString().indexOf(searchQuery) >= 0) {
                        isFound = true;
                    }
                }
                });
                return isFound;
            },
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'debitedTransactions.csv', separator: ','},
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
            filter: false,
            print: false,
            viewColumns: false,
            customToolbar: () => {
                return (
                    <AddButton direction={{direction: 'debit'}} />
                );
            }
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Debited Transactions"}
                    data={allAccounts}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCreditsDebitsAccounts: Actions.getCreditsDebitsAccounts,
        getTransactions: Actions.getTransactions,
    }, dispatch);
}

function mapStateToProps({debitedCreditedApp})
{
    console.log(debitedCreditedApp, "debitedCreditedApp")
    return {
        accounts: debitedCreditedApp.reports.transactions,
        filteredAccounts: debitedCreditedApp.reports.filteredTransactions,
        isFiltering: debitedCreditedApp.reports.isFiltering,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(DebitedLists)));
