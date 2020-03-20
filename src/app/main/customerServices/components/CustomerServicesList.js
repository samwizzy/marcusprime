import React, { Component } from 'react';
import { FormControlLabel, Switch, withStyles, Typography, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { NavLink, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
import _ from 'lodash';
import Loader from 'react-loader-spinner';

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

class CustomerServicesList extends Component {

    render() {
        const { openNewRmDialog, openEditRmDialog, data, getRMDetails } = this.props;
        var CustomerData = _.orderBy(data, ['createdAt'], ['desc']);

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
                name: "adminId",
                label: "Username",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "createdAt",
                label: "created At",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('LLL')}
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
                        openNewRmDialog={openNewRmDialog}
                    />
                );
            },
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
                    title={"All Customer Services"}
                    data={CustomerData}
                    columns={columns}
                    options={options}
                />
            </FuseAnimate>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openNewRmDialog: Actions.openNewRmDialog,
        openEditRmDialog: Actions.openEditRmDialog,
        getRMDetails: Actions.getRmDetails,
    }, dispatch);
}

function mapStateToProps({ customerServicesApp }) {
    return {   }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerServicesList)));
