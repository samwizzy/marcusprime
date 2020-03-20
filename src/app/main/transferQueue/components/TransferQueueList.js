import React, { Component } from 'react';
import { FormControlLabel, Switch, Typography, withStyles, Icon, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import _ from 'lodash';
import Loader from 'react-loader-spinner';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    bgColor: {
        backgroundColor: 'red'
    },
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

class TransferQueueList extends Component {

    render() {
        const { transfer, classes, openTransferDialog, rights, user } = this.props;        
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Transfer Queue'; });

        var data = _.orderBy(transfer, ['createdAt'], ['desc']);

        const columns = [
            {
                name: "id",
                label: "S/N",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta) => {
                        if (value === '') {
                            return ('')
                        } else {
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
                }
            },
            {
                name: "amount",
                label: "Amount",
                options: {
                    filter: true,
                    customBodyRender: value => {
                        const nf = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });

                        if (value === '' || value === null) {
                            return ''
                        }
                        return nf.format(value);
                    }
                }
            },
            {
                name: "initBranchCode",
                label: "Branch Code",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "paymentReference",
                label: "Payment Reference",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "id",
                label: "Transfer",
                options: {
                    customBodyRender: id => {
                        const trans = data.find(dat => dat.id === id);
                        return (
                            <React.Fragment>
                                <Button 
                                    disabled={!(r && r.authorize || user.role && user.role.id === 1)}
                                    onClick={() => openTransferDialog(trans)} 
                                    variant="contained" color="secondary" 
                                    className={classes.button}
                                >
                                    Approve
                                </Button>
                            </React.Fragment>
                        )
                    },
                },
            },
            // {
            //     name: "id",
            //     label: "Delete",
            //     options: {
            //         customBodyRender: id => {
            //             const trans = data.find(dat => dat.id === id);
            //             return (
            //                 <React.Fragment>
            //                     <Button onClick={() => openTransferDialog(trans)} variant="contained" color="primary" className={classNames(classes.button, classes.bgColor)}>
            //                         Decline
            //                        </Button>
            //                 </React.Fragment>
            //             )
            //         },
            //     },
            // }
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 50, 100],
            downloadOptions: { filename: 'transferQueue.csv', separator: ',' },
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#303030" height={50} width={50} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                }
            },
        };

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <MUIDataTable
                    title={"Transfer Queue Approval"}
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
        openTransferDialog: Actions.openTransferDialog,
    }, dispatch);
}

function mapStateToProps({ transferQueueApp, auth }) {
    return {
        transfer: transferQueueApp.transferQueue.transferQueue,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferQueueList)));
