import React, {Component} from 'react';
import {Avatar, Button, Divider, Icon, IconButton, Switch, Typography, Menu, MenuItem} from '@material-ui/core';
import {FuseAnimate} from '../../../../@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import AdminDialog from './AdminDialog';
import AdminsDialog from '../admins/AdminsDialog';
import _ from 'lodash';
import moment from 'moment';
import * as Actions from './../store/actions';
import RoleChip from './RoleChip';

const options = ['Assign roles']

class AdminDetails extends Component {

    state = {
        showDetails: false,
        el: null
    };

    componentDidMount()
    {
        const { id } = this.props.match.params;
        this.props.getAdmin(id);
        this.props.getRoles();
    }

    handleOpen = (event) => {
        this.setState({el: event.currentTarget})
    }

    handleClose = () => {
        this.setState({el: null})        
    }

    render()
    {
        const {openComposeDialog, admin, openEditUserDialog, rights, user} = this.props;
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Admin Users'; });

        if ( !admin )
        {
            return '';
        }

        return (
            <div className="p-16 sm:p-24">
                <div className="flex items-center justify-between overflow-hidden">

                    <div className="flex flex-col">
                        <FuseAnimate delay={100}>
                            <Typography variant="subtitle1" className="flex">{admin.displayName}</Typography>
                        </FuseAnimate>
                        <FuseAnimate delay={100}>
                            <Typography component="div" color="textSecondary" variant="body1" className="flex items-center justify-start">
                                <div>{admin.lastName}</div>
                                <div className="ml-4">{admin.firstName}</div>
                            </Typography>
                        </FuseAnimate>
                        <FuseAnimate delay={100}>
                            <Typography variant="subtitle1" className="flex"><strong>Department:</strong>&nbsp; {admin.department}</Typography>
                        </FuseAnimate>

                        {admin.role && admin.role.name && admin.role.name.length > 0 && (
                            <div className="flex flex-wrap mt-8">
                                <RoleChip className="mt-4 mr-4" title={admin.role.name} color={"#d84315"} key={admin.adUserID} />
                            </div>
                        )}
                    </div>

                </div>

                

                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>

                        <div className="flex items-start justify-between">

                            <div className="flex items-center justify-start">
                            <Button
                                className="mt-16"
                                style={{zIndex: 9999}}
                                variant="contained"
                                color="primary"
                                disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                aria-label="More"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={() => openEditUserDialog(admin.adUserID)}
                            >
                                Edit
                            </Button>

                            </div>
                            {/* <IconButton
                                aria-label="More"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleOpen}
                            >
                                <Icon>more_vert</Icon>
                            </IconButton> */}
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                                aria-label="More"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={openComposeDialog}
                            >
                                <Icon>wc</Icon> Assign roles
                            </Button>
                            <Menu
                                id="long-menu"
                                anchorEl={this.state.el}
                                keepMounted
                                open={this.state.el ? true : false}
                                onClose={this.handleClose}
                                PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: 200,
                                },
                                }}
                            >
                                {options.map(option => (
                                <MenuItem key={option} selected={option === 'view'} onClick={openComposeDialog}>
                                    {option}
                                </MenuItem>
                                ))}
                            </Menu>
                        </div>

                        <Divider className="my-16"/>

                        <div className="my-16">
                            <Typography
                                color="secondary"
                                className="cursor-pointer underline mb-8"
                                onClick={() => {
                                    this.setState({showDetails: !this.state.showDetails});
                                }}
                            >
                                {this.state.showDetails ?
                                    (
                                        <span>Hide Details</span>
                                    )
                                    :
                                    (
                                        <span>Show Details</span>
                                    )
                                }
                            </Typography>

                            {this.state.showDetails && (
                                <div className="flex">
                                    <Typography variant="body2" className="flex flex-col">
                                        <span>Identifier:</span>
                                        <span>Email:</span>
                                        <span>Telephone:</span>
                                        <span>Mobile:</span>
                                        <span>Address:</span>
                                        <span>Date Created:</span>
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" className="pl-4 flex flex-col">
                                        <span>{admin.firstName} {admin.lastName}</span>
                                        <span>{admin.email}</span>
                                        <span>{admin.telephoneNumber}</span>
                                        <span>{admin.mobileNumber}</span>
                                        <span>{admin.address}</span>
                                        <span>{moment(admin.createdAt).format('LLL')}</span>
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </div>
                </FuseAnimate>

                <AdminDialog />
                <AdminsDialog form={admin} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAdmin: Actions.getAdmin,
        getRoles: Actions.getRoles,
        openComposeDialog: Actions.openComposeDialog,
        openEditUserDialog: Actions.openEditUserDialog,
        updateAdminStatus: Actions.updateAdminStatus,
    }, dispatch);
}

function mapStateToProps({adminApp, auth})
{
    console.log(adminApp, "Display Console");
    return {
        admin : adminApp.admins.admin,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDetails));
