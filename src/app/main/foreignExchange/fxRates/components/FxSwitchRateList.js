import React, { Component } from 'react';
import {Typography, withStyles, Button} from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import FxSwitchRateDialog from './FxSwitchRateDialog';
import FxSwitchDialog from './FxSwitchDialog';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
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

class FxSwitchRateList extends Component {

    componentDidMount(){
        // this.props.getRateByType({type: 'FXSWITCH'})
    }

    render() {
        const { rates, openNewFxSwitchDialog, openEditFxSwitchDialog, rights, user } = this.props;
        const selectedRates = rates && rates.filter(rate => rate.type === 'FXSWITCH')
        const r = _.find(rights, function(o) { return o.module.moduleName === 'TD Rate Guide'; });

        if(!rates){
            return ''
        }

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
                name: "currencyPair",
                label: "Currency Pair",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "crossRate",
                label: "Cross Rate",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "bidSpread",
                label: "BID Spread",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "offerSpread",
                label: "Offer Spread",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "id",
                label: "BID",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: id => {
                        const selectedRate = rates.find(rate => rate.id === id)
                        return <Typography> {selectedRate.bid - selectedRate.bidSpread} </Typography>
                    }
                }
            },
            {
                name: "id",
                label: "Offer",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: id => {
                        const selectedRate = rates.find(rate => rate.id === id)
                        return <Typography> {selectedRate.offer + selectedRate.offerSpread} </Typography>
                    }
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
                                    openEditFxSwitchDialog(id);
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
                   noMatch: <Loader type="Oval" color="#FCED00" height={60} width={60} timeout={5000} />,
                   toolTip: "Sort",
                   columnHeaderTooltip: column => `Sort for ${column.label}`
                },
            },
            customToolbar: () => {
                if(r && r.cancreate){
                return (
                    <AddButton
                        openComposeDialog={openNewFxSwitchDialog}
                    />
                );
                }
            },
            print: false,
            download: false,
            viewColumns: false,
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'fxSwitchList.csv', separator: ','},
        };

        return (
            <React.Fragment>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"FX Switch Rate Guide"}
                        data={selectedRates}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>

                <FxSwitchDialog />
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getFxRates      : Actions.getFxRates,
        getFxRate       : Actions.getFxRate,
        getRateByType   : Actions.getRateByType,
        openNewFxSwitchDialog : Actions.openNewFxSwitchDialog,
        openEditFxSwitchDialog: Actions.openEditFxSwitchDialog,
    }, dispatch);
}

function mapStateToProps({ fxSwitchApp, auth }) {
    console.log(fxSwitchApp, "FxSwitch App")
    const { fxswitch } = fxSwitchApp
    return { 
        user: auth.user.data,
        rights: auth.rights.right.rights,
        rates: fxswitch.data,
        composeDialog: fxswitch.composeDialog
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FxSwitchRateList)));
