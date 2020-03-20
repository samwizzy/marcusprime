import React, { Component } from 'react';
import { withStyles, Table, TableRow, TableBody, TableCell, TablePagination } from '@material-ui/core';
import { FuseScrollbars, FuseUtils } from '../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReportsTableHead from './ReportsTableHead';
import _ from 'lodash'


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

const reportsData = [
    { id: 1, item: 'Pre-Matured Report', url: '/reports/prematured/investments'},
    // { id: 2, item: 'Exception Report', url: '/reports/exceptions/all'},
    { id: 3, item: 'Transfer Report', url: '/reports/transfers'},
    { id: 4, item: 'Account Debited/Credited Report', url: '/reports/accounts/all'},
    { id: 5, item: 'All Investments Report', url: '/reports/investments/all'},
    { id: 6, item: 'Successful Investment Report', url: '/reports/success/investments/all'},
    { id: 7, item: 'Failed Investment Report', url: '/reports/failed/investments/all'},
    { id: 8, item: 'Fx Sales Report', url: '/reports/fx/sales'},
    { id: 9, item: 'Fixed Deposit Report', url: '/reports/fdcd'},
    { id: 10, item: 'FX Switch Report', url: '/reports/fx/fxSwitch'},
    { id: 11, item: 'End of day Report', url: '/reports/wallets/endofday'},
    { id: 12, item: 'Reconciliation Log', url: '/reports/wallets/reconciliationlog'},
    { id: 13, item: 'Paystack Log', url: '/reports/paystack/logs'},
    // { id: 8, item: 'All Financial Report', url: '/reports/financial/goals/all'},
    // { id: 9, item: 'Success Financial Goal Report', url: '/reports/success/financial/goals/all'},
    // { id: 10, item: 'Failed Financial Goal Report', url: '/reports/failed/financial/goals/all'},
]

class ReportsList extends Component {
    state = {
        orderBy    : 'item',
        order      : 'asc',
        reports       : [],
        selected   : [],
        page       : 0,
        rowsPerPage: 20,
    }

    componentDidMount(){
        this.setState({reports: reportsData})
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const reports = this.getFilteredArray(reportsData, this.props.searchText);
            this.setState({reports})
        }
    }

    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, searchText);
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleRoute = url => {
        this.props.history.push(url);
    };

    render() {
        const { reports, orderBy, order, page, rowsPerPage, rights, user } = this.state
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Departments'; });

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                        <ReportsTableHead />

                        <TableBody>
                            {
                                _.orderBy(reports, [
                                    (o) => {
                                        switch ( orderBy )
                                        {
                                            case 'item':
                                            {
                                                return o.item;
                                            }
                                            default:
                                            {
                                                return o[orderBy];
                                            }
                                        }
                                    }
                                ], [order])
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(n => {
                                        const isSelected = this.isSelected(n.id);
                                        return (
                                            <TableRow
                                                className="h-64 cursor-pointer"
                                                hover
                                                role="checkbox"
                                                aria-checked={isSelected}
                                                tabIndex={-1}
                                                key={n.id}
                                                selected={isSelected}
                                                onClick={event => this.handleRoute(n.url)}
                                            >
                                                {/* <TableCell className="w-48 pl-4 sm:pl-12" padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onClick={event => event.stopPropagation()}
                                                        onChange={event => this.handleCheck(event, n.id)}
                                                    />
                                                </TableCell> */}

                                                <TableCell className="truncate" component="th" scope="row">
                                                    {n.item}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={reports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ reportsApp, auth }) {
    return { 
        searchText: reportsApp.reports.searchText,
        user      : auth.user.data,
        rights    : auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportsList)));
