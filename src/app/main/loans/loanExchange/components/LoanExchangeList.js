import React, { Component } from 'react';
import { FormControlLabel, Button, Switch, withStyles, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';

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

class LoanExchangeList extends Component {

    render() {
        const { openNewRateDialog, openEditRateDialog, data, currencies } = this.props;

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
            {
                name: "percentage",
                label: "Percentage",
                options: {
                    filter: true,
                    sort: false,
                    // customBodyRender: (value, tableMeta, updateValue) => {
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
                name: "rate",
                label: "Rate",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "id",
                label: "Edit",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {

                        const rec = currencies.find(rate => value === rate.id);
                        return (
                            <FormControlLabel
                                control={
                                    <Button variant="contained" color="primary">edit</Button>
                                }
                                onClick={evt => {
                                    openEditRateDialog(rec);
                                }}
                            />
                        );

                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scroll',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'loanExchangeList.csv', separator: ','},
            // customToolbar: () => {
            //     return (
            //         <AddButton
            //             openNewRateDialog={openNewRateDialog}
            //         />
            //     );
            // }
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Loan Exchange Rate"}
                    data={currencies}
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

function mapStateToProps({ loanExchangeRatesApp }) {
    return {
        currencies: loanExchangeRatesApp.rate.currencies,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoanExchangeList)));
