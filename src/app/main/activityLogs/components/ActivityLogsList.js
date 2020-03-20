import React, { Component } from 'react';
import { FormControlLabel, Typography, withStyles, Icon } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import moment from 'moment';
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

class ActivityLogsList extends Component {

    render() {
        const { allActivitiesLog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Admin Users'; });

        var data = _.orderBy(allActivitiesLog, ['createdAt'], ['desc']);

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
                name: "userId",
                label: "User ID",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "ipAddress",
                label: "IP Address",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "description",
                label: "Description",
                options: {
                    filter: true,
                    sort: false,
                }
            },
            {
                name: "createdAt",
                label: "Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        if (day === '') {
                            return ('')
                        } else {
                            return (
                                <Typography variant="inherit" color="textSecondary">
                                    {moment(day).format('LL')}
                                </Typography>
                            )
                        }
                    }
                }
            },
        ];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'activityLog.csv', separator: ','},
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
                    title={"Activity Logs"}
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
    }, dispatch);
}

function mapStateToProps({ activityLogsApp, auth }) {
    return {
        allActivitiesLog: activityLogsApp.activityLogs.allActivitiesLog,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivityLogsList)));
