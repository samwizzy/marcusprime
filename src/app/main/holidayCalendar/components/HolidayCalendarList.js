import React, { Component } from 'react';
import { FormControlLabel, Typography, Switch, withStyles, Button, IconButton, Icon } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import HolidayCalendarDialog from './../HolidayCalendarDialog';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import AddButton from './AddButton';
import Loader from 'react-loader-spinner'
import moment from 'moment';
import _ from 'lodash';

const styles = theme => ({
    root: {
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
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
    },
    loader: {
        color: "#FCED00",
    }
});

class HolidaysCalendarList extends Component {

    componentDidMount(){
        this.props.getHolidays()
    }

    render() {
        const { holidays, openNewHolidayDialog, rights, user, classes } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Holiday Calendar'; });

        console.log(rights, "Rights rights")

        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Holiday Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "day",
                label: "Date",
                options: {
                    filter: true,
                    sort: false,
                    customBodyRender: day => {
                        return (
                            <Typography variant="inherit" color="textSecondary">
                                {moment(day).format('lll')}
                            </Typography>
                        )
                    }
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    filter: true,
                    customBodyRender: id => {
                        if(r && r.canedit || user.role.id === 1){
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
                        }else{
                            return (
                                <Button
                                    variant="contained"
                                    disabled
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
                }
            },
        ];

        const headerNames = [
            {
              name: 'ID',
              download: true,
            },
            {
              name: 'Holiday Name',
              download: true,
            },
            {
              name: 'Date',
              download: true,
            },
            {
              name: 'Action',
              download: false,
            }
        ];

        const footerNames = ['ID', 'Holiday Name', 'Date', ''];

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color={this.props.theme.palette.secondary.light} height={60} width={60} />,
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
            download: true,
            viewColumns: false,
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'holidayList.csv', separator: ','},
            onDownload: (buildHead, buildBody, columns, data) => {
                const dates = data.map(d => ({...d, data: d.data.map(m => moment(m, moment.ISO_8601, true).isValid() ? moment(m).format('lll') : m )}));

                return (
                    buildHead(headerNames) +
                    buildBody(
                        dates.concat({
                            index: data.length,
                            data: footerNames,
                        }),
                    )
                )
            }
        };

        return (
            <React.Fragment>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"All Dynamic Holiday"}
                        data={holidays}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>

                <HolidayCalendarDialog />
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getHolidays          : Actions.getPublicHolidays,
        getHoliday           : Actions.getPublicHoliday,
        openNewHolidayDialog : Actions.openNewHolidayDialog,
        openEditHolidayDialog: Actions.openEditHolidayDialog,
    }, dispatch);
}

function mapStateToProps({ HolidayCalendarApp, auth }) {
    const { holiday } = HolidayCalendarApp
    return { 
        user: auth.user.data,
        rights: auth.rights.right.rights,
        holidays: holiday.data,
        composeDialog: holiday.composeDialog
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(HolidaysCalendarList)));
