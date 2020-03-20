import React, { Component } from 'react';
import { FormControlLabel, Button, Switch, withStyles, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';
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

class ExchangeRateList extends Component {

    render() {
        const { openNewRateDialog, openEditRateDialog, data, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Exchange Rate'; });

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
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            // {
            //     name: "weSale",
            //     label: "We Sale",
            //     options: {
            //         filter: true,
            //         // sort: true,
            //         customBodyRender: (value, tableMeta, updateValue) => {
            //             const nf = new Intl.NumberFormat("en-US", {
            //                 style: "currency",
            //                 currency: "NGN",
            //                 minimumFractionDigits: 2,
            //                 maximumFractionDigits: 2
            //             });

            //             return nf.format(value);
            //         }
            //     }
            // },
            // {
            //     name: "weBuy",
            //     label: "We Buy",
            //     options: {
            //         filter: true,
            //         // sort: true,
            //         customBodyRender: (value, tableMeta, updateValue) => {
            //             const nf = new Intl.NumberFormat("en-US", {
            //                 style: "currency",
            //                 currency: "NGN",
            //                 minimumFractionDigits: 2,
            //                 maximumFractionDigits: 2
            //             });

            //             return nf.format(value);
            //         }
            //     }
            // },
            {
                name: "code",
                label: "Code",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "walletFundingCap",
                label: "Wallet Cap",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "enableForWallet",
                label: "Enable Wallet",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <FormControlLabel
                                label={value === true ? "Yes" : "No"}
                                value={value === true ? "Yes" : "No"}
                                control={
                                    <Icon></Icon>
                                }
                            />
                        );

                    }
                }
            },
            {
                name: "id",
                label: "Action",
                options: {
                    customBodyRender: id => {
                        const rec = data.find(rate => id === rate.id);
                        return (
                            <Button
                            variant="contained"
                            disabled={!(r && r.cancreate || user.role && user.role.id === 1)}
                            color="primary"
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                                openEditRateDialog(rec);
                            }}>
                                Edit
                            </Button>
                        );
                    },
                }
            }
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            // customToolbar: () => {
            //     return (
            //         <AddButton
            //             openNewRateDialog={openNewRateDialog}
            //         />
            //     );
            // },
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'exchangeRatesList.csv', separator: ','},
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Currency Rate"}
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
        openNewRateDialog: Actions.openNewRateDialog,
        openEditRateDialog: Actions.openEditRateDialog,
    }, dispatch);
}

function mapStateToProps({ exchangeRatesApp, auth }) {
    console.log(exchangeRatesApp, "exchangeRatesApp")
    return {
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ExchangeRateList)));
