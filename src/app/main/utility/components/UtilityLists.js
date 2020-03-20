import React, { Component } from 'react';
import { Typography, Icon, withStyles, Button, Card, CardContent, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { FuseAnimate, FuseAnimateGroup } from '../../../../@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import UtilityDialog from '../UtilityDialog';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MUIDataTable from "mui-datatables";
import * as Actions from '../store/actions';
import AddButton from './AddButton';
import moment from 'moment';
import _ from 'lodash';


const styles = theme => ({
    header: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText
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

class UtilityList extends Component {

    componentDidMount(){
        this.props.getSettings()
    }

    render() {
        const { classes, settings, admins, departments, openNewSettingDialog, rights, user } = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Holiday Calendar'; });

        return (
            <React.Fragment>
                <div className={classNames(classes.header, "flex flex-col items-center justify-center text-center p-16 sm:p-24 h-100 sm:h-100")}>
                    <FuseAnimate duration={400} delay={600}>
                        <Typography variant="h6" color="inherit" className="mx-auto max-w-512 font-light">
                            Utility Settings
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimateGroup
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                    className="flex flex-wrap justify-center max-w-xl w-full mx-auto px-16 sm:px-24 py-32"
                >
                    {settings && settings.map((category) => (
                        <div className="w-full max-w-512 pb-24 md:w-1/2 md:p-16" key={category.id}>
                            <Card elevation={1}>
                                <CardContent>
                                    <Typography className="font-medium px-16 pt-8" variant="h6" color="textSecondary">Loan Notification Depts</Typography>
                                    <List component="nav">
                                        {category.loanNotificationDepts && category.loanNotificationDepts.length > 0?
                                        category.loanNotificationDepts.map(id => {
                                            return (
                                                <ListItem key={id} button>
                                                    <ListItemIcon className="mr-0">
                                                        <Icon>note</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText primary={
                                                        _.find(departments, { 'id': id }).name + ' (' +
                                                        _.find(departments, { 'id': id }).email + ')'
                                                    }/>
                                                </ListItem>
                                            )
                                        }):
                                            <ListItem key={category.id} button>
                                                <ListItemIcon className="mr-0">
                                                    <Icon>warning</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary={"There are no emails"}/>
                                            </ListItem>
                                        }
                                    </List>
                                    <Button 
                                        className="normal-case w-full justify-start" 
                                        color="secondary"
                                        onClick={() => this.props.openEditSettingDialog(category.id)}
                                    >
                                        Edit
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}


                    {settings && settings.map((category) => (
                        <div className="w-full max-w-512 pb-24 md:w-1/2 md:p-16" key={category.id}>
                            <Card elevation={1}>
                                <CardContent>
                                    <Typography className="font-medium px-16 pt-8" variant="h6" color="textSecondary">PTA Notification Depts</Typography>
                                    <List component="nav">
                                        {category.ptaNotificationDepts && category.ptaNotificationDepts.length > 0? 
                                        category.ptaNotificationDepts.map(id => {
                                            return (
                                                <ListItem key={id} button>
                                                    <ListItemIcon className="mr-0">
                                                        <Icon>note</Icon>
                                                    </ListItemIcon>
                                                    <ListItemText primary={
                                                        _.find(departments, { 'id': id }).name + ' (' +
                                                        _.find(departments, { 'id': id }).email + ')'
                                                    }/>
                                                </ListItem>
                                            )
                                        })
                                        :
                                        <ListItem key={category.id} button>
                                            <ListItemIcon className="mr-0">
                                                <Icon>warning</Icon>
                                            </ListItemIcon>
                                            <ListItemText primary={"There are no emails"}/>
                                        </ListItem>
                                        }
                                    </List>
                                    <Button 
                                        className="normal-case w-full justify-start" 
                                        color="secondary"
                                        onClick={() => this.props.openEditSettingDialog(category.id)}
                                    >
                                        Edit
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </FuseAnimateGroup>

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
