import React, { Component } from 'react';
import { Typography, withStyles, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import DepositsDialog from '../DepositsDialog';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import AddButton from './AddButton';
import Loader from 'react-loader-spinner'
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

class FixedDepositsList extends Component {

    componentDidMount(){
        this.props.getDepositRates();
        this.props.getCurrencies();
    }

    render() {
        const { rates, openNewDepositDialog, openEditDepositDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Fixed Deposit'; });

        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "minAmount",
                label: "Min. Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: amount => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {new Intl.NumberFormat('en-NG', {}).format(amount)}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "maxAmount",
                label: "Max. Amount",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: amount => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {new Intl.NumberFormat('en-NG', {}).format(amount)}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "callRate",
                label: "Call",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "currency",
                label: "Currency",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rate7Days",
                label: "7Days",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rate30Days",
                label: "30Days",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rate60Days",
                label: "60Days",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rate90Days",
                label: "90Days",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rate180Days",
                label: "180Days",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        return (
                            <Button 
                                disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                variant="contained"
                                color="primary"
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                    openEditDepositDialog(id);
                                }}
                            >
                              edit
                           </Button>
                        )
                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            textLabels: {
                body: {
                   noMatch: <Loader type="Oval" color="#039be5" height={60} width={60} timeout={5000} />,
                   toolTip: "Sort",
                   columnHeaderTooltip: column => `Sort for ${column.label}`
                },
            },
            // customToolbar: () => {
            //     return (
            //         <AddButton
            //             canCreate={r && r.cancreate || user.role && user.role.id === 1}
            //             openComposeDialog={openNewDepositDialog}
            //         />
            //     );
            // },
            viewColumns: false,
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'fixedDepositsList.csv', separator: ','},
        };

        return (
            <React.Fragment>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"Fixed Deposit Rate Guide"}
                        data={rates}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>

                <DepositsDialog />
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCurrencies            : Actions.getCurrencies,
        getDepositRates          : Actions.getDepositRates,
        getDepositRate           : Actions.getDepositRate,
        openNewDepositDialog: Actions.openNewDepositDialog,
        openEditDepositDialog: Actions.openEditDepositDialog,
    }, dispatch);
}

function mapStateToProps({ depositsApp, auth }) {
    console.log(depositsApp, "Deposit App")
    const { deposits } = depositsApp
    return { 
        user: auth.user.data,
        rights: auth.rights.right.rights,
        rates: deposits.data,
        composeDialog: deposits.composeDialog
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FixedDepositsList)));
