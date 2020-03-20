import React from 'react';
import {withStyles, Icon, List, ListItem, ListItemText, ListSubheader} from '@material-ui/core';
import {FuseAnimate} from '../../../@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import RoleCompose from './RoleCompose';

const styles = theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    }
});


function RolesAppSidebarContent({classes, roles})
{
    const state = {
        roles: roles,
    }

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1">

                <RoleCompose/>

                <div>
                    <List>
                        <ListSubheader className="pr-24 pl-24" disableSticky>ROLES</ListSubheader>

                        {roles && roles.map((role) => (
                            <ListItem
                                button
                                component="li"
                                // component={NavLink}
                                to={'/roles/' + role.id + '/users'}
                                key={role.id}
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" style={{color: role.name}} color="action">label</Icon>
                                <ListItemText primary={role.name} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}



function mapStateToProps({roleApp})
{
    return {
        roles : roleApp.roles.data,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(RolesAppSidebarContent)));
