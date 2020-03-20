import React, { Component } from 'react';
import { Typography, Switch, withStyles, Button } from '@material-ui/core';
import { FuseAnimate } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import UtilityDialog from '../UtilityDialog';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
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

class UtilityList extends Component {

    componentDidMount(){
        this.props.getSettings()
    }

    render() {
        const { settings, admins, departments, openNewSettingDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Holiday Calendar'; });

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
                name: "loanNotificationDepts",
                label: "Loan Notification Depts",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: ids => {
                        let emails = []
                        ids && ids.map(id => {
                            emails.push(_.find(departments, { 'id': id }).email)
                        })
                        return emails.join(', ')
                    }
                }
            },
            {
                name: "ptaNotificationDepts",
                label: "PTA Notification Depts",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: ids => {
                        let emails = []
                        ids && ids.map(id => {
                            emails.push(_.find(departments, { 'id': id }).email)
                        })
                        return emails.join(', ')
                    }
                }
            },
            {
                name: "id",
                label: " ",
                options: {
                    filter: true,
                    customBodyRender: id => {
                        if(r && r.canedit || user.role.name === 'Super Admin'){
                            return (
                                <Button
                                    variant="contained" 
                                    color="primary"
                                    onClick={(ev, dispatch) => {
                                        ev.stopPropagation();
                                        this.props.openEditSettingDialog(id);
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
                                        this.props.openEditSettingDialog(id);
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

        const options = {
            filterType: 'checkbox',
            responsive: 'scrollMaxHeight',
            selectableRows: 'none',
            customToolbar: () => {
                return (
                    <AddButton
                        openComposeDialog={openNewSettingDialog}
                    />
                );
            },
            print: false,
            download: false,
            viewColumns: false,
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'utilityList.csv', separator: ','},
        };

        return (
            <React.Fragment>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <MUIDataTable
                        title={"All Utility"}
                        data={settings}
                        columns={columns}
                        options={options}
                    />
                </FuseAnimate>

                <UtilityDialog />
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSettings         : Actions.getSettings,
        getSetting         : Actions.getSetting,
        openNewSettingDialog: Actions.openNewSettingDialog,
        openEditSettingDialog: Actions.openEditSettingDialog,
    }, dispatch);
}

function mapStateToProps({ UtilityApp, auth }) {
    const { setting, department, admins } = UtilityApp
    return { 
        admins: admins.data,
        departments: department.data,
        user: auth.user.data,
        rights: auth.rights.right.rights,
        settings: setting.data,
        composeDialog: setting.composeDialog
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(UtilityList)));
