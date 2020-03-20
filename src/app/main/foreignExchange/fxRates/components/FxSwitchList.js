import React, { Component } from 'react';
import {Typography, withStyles, Button} from '@material-ui/core';
import { FuseAnimate } from '../../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import DepositsDialog from '../FxSwitchDialog';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
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

class FxSwitchList extends Component {

    componentDidMount(){
        this.props.getFxRates()
    }

    render() {
        const { rates, openNewHolidayDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Holiday Calendar'; });

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
                }
            },
            {
                name: "maxAmount",
                label: "Max. Amount",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "rate",
                label: "Rate",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "tenorSeperatedBySlash",
                label: "Tenor",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "createdAt",
                label: "Created Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if(day !== null){
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('LLL')}
                                </Typography>
                            )
                        }
                    }
                }
            },
            {
                name: "updatedAt",
                label: "Updated Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if(day !== null){
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('LLL')}
                                </Typography>
                            )
                        }
                    }
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    filter: true,
                    customBodyRender: id => {
                        return (
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                    this.props.openEditHolidayDialog(id);
                                }}
                            >
                                edit
                            </Button>
                        );
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
            customToolbar: () => {
                if(r && r.cancreate){
                return (
                    <AddButton
                        openComposeDialog={openNewHolidayDialog}
                    />
                );
                }
            },
            print: false,
            download: false,
            viewColumns: false,
            filter: false
        };

        return (
            <React.Fragment>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"FX Switch"}
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
        getFxRates      : Actions.getFxRates,
        getFxRate       : Actions.getFxRate,
        openNewDepositDialog : Actions.openNewFxSwitchDialog,
        openEditDepositDialog: Actions.openEditFxSwitchDialog,
    }, dispatch);
}

function mapStateToProps({ fxSwitchApp, auth }) {
    const { fxswitch } = fxSwitchApp
    return { 
        user: auth.user.data,
        rights: auth.rights.right.rights,
        rates: [],
        composeDialog: fxswitch.composeDialog
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FxSwitchList)));
