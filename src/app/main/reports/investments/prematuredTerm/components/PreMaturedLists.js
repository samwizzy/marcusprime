import React, {Component} from 'react';
import {FormControlLabel, Switch, withStyles, Avatar, Divider, Icon, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {FuseAnimate} from '../../../../../../@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import * as Actions from '../../../store/actions';
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

class PreMaturedLists extends Component {

    render()
    {
        const { transactions, getCalypsoBatchs, getPrematuredInvestment } = this.props;
        const selectedTransactions = _.orderBy(transactions, ['createdAt'], ['desc']);

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
                name: "tradeSettlementCurrency",
                label: "Settlement Currency",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "holidayCode",
                label: "Transaction by",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "id",
                label: "Nominal Value",
                options: {
                    customBodyRender: id => {
                        const trans = transactions && transactions.find(fx => fx.id === id)
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                { new Intl.NumberFormat('en-US', { style: 'currency', currency: trans.currency }).format(trans.nominalValue)}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "productCodeValue",
                label: "Product",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "buySell",
                label: "Type",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "negotiatedPrice",
                label: "Negotiated Price",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "settlementDate",
                label: "Settlement Date",
                options: {
                    customBodyRender: settlementDate => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(settlementDate).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "createdAt",
                label: "Time Created",
                options: {
                    customBodyRender: createdAt => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(createdAt).format('LLL')}
                            </Typography>
                        )
                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            customToolbar: () => {
               return (
                  <AddButton
                        getPrematuredInvestment={getPrematuredInvestment}
                        getCalypsoBatchs={getCalypsoBatchs}
                  />
               );
            },
            print: false,
            viewColumns: false,
            filter: false
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Pre-Matured Terminations on User Product"}
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
        getPrematuredInvestment: Actions.getPrematuredInvestment,
        getCalypsoBatchs: Actions.getCalypsoBatchs,
    }, dispatch);
}

function mapStateToProps({preMaturedApp}){
    return {
        transactions: preMaturedApp.reports.prematured
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(PreMaturedLists)));
