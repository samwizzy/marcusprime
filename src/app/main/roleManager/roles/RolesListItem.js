import React from 'react';
import {withStyles, Avatar, Typography, Checkbox, ListItem} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';
import * as Actions from '../store/actions/index';
import RoleChip from '../RoleChip';

const pathToRegexp = require('path-to-regexp');

const styles = theme => ({
    mailItem: {
        borderBottom: '1px solid  ' + theme.palette.divider,

        '&.unread'  : {
            background: 'rgba(0,0,0,0.03)'
        },
        '&.selected': {
            '&::after': {
                content        : '""',
                position       : 'absolute',
                left           : 0,
                display        : 'block',
                height         : '100%',
                width          : 3,
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    avatar  : {
        backgroundColor: theme.palette.primary[500]
    }
});

const RolesListItem = ({mail, labels, classes, match, history, selectedAdminIds, toggleInSelectedAdmins}) => {
    const toPath = pathToRegexp.compile(match.path);
    const checked = selectedAdminIds.length > 0 && selectedAdminIds.find(id => id === mail.adUserID) !== undefined;

    console.log(mail, "Mail here");
    console.log(match, "Match here");
    console.log(labels, "Label here");
    // console.log(admin, "Admins here");

    return (
        <ListItem
            dense
            button
            onClick={() => history.push(toPath(
                {
                    ...match.params,
                    id: mail.adUserID
                }
            ))}
            className={classNames(classes.mailItem, checked && "selected", !mail.read && "unread", "py-16 pl-0 pr-8 sm:pl-8 sm:pr-24")}>

            <Checkbox
                tabIndex={-1}
                disableRipple
                checked={checked}
                onChange={() => toggleInSelectedAdmins(mail.adUserID)}
                onClick={(ev) => ev.stopPropagation()}
            />

            <div className="flex flex-1 flex-col relative overflow-hidden">

                <div className="flex items-center justify-between px-16 pb-8">
                    <div className="flex items-center">
                        <Typography variant="subtitle1">{mail.firstName + ' ' + mail.lastName}</Typography>
                    </div>
                    <Typography variant="subtitle1">{mail.displayName}</Typography>
                </div>

                <div className="flex flex-col px-16 py-0">
                    <Typography className="truncate">{mail.firstName}</Typography>
                    {/* <Typography color="textSecondary" className="truncate">{_.truncate(mail.jobTitle.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}</Typography> */}
                </div>

                <div className="flex justify-end">
                    {mail.role && mail.role.name.length > 0? 
                        (
                            <RoleChip className="mr-4" title={mail.role.name} color={"#ce6f15"} key={mail.adUserID}/>
                        )
                        :
                        (
                            <RoleChip className="mr-4" title={'staff'} color={"#d84315"} key={mail.adUserID}/>

                        )
                    }
                </div>
            </div>

        </ListItem>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleInSelectedAdmins: Actions.toggleInSelectedAdmins,
        getAdmins             : Actions.getAdmins
    }, dispatch);
}

function mapStateToProps({roleApp})
{
    console.log(roleApp, "Role Managemebne")
    return {
        selectedAdminIds: roleApp.admin.selectedAdminIds,
        labels          : roleApp.labels,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RolesListItem)));
