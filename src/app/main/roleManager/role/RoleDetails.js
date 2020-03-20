import React, {Component} from 'react';
import {Avatar, Divider, Icon, IconButton, Typography, Menu, MenuItem} from '@material-ui/core';
import {FuseAnimate} from '../../../../@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import RoleDialog from './RoleDialog';
import _ from 'lodash';
import moment from 'moment';
import * as Actions from '../store/actions/index';
import RoleChip from '../RoleChip';

const options = ['Assign roles']

class RolesDetails extends Component {

    state = {
        showDetails: false,
        el: null
    };

    componentDidMount()
    {
        this.props.getLabels();
        const { id } = this.props.match.params;
        this.props.getAdmin(id);
    }

    handleOpen = (event) => {
        this.setState({el: event.currentTarget})
    }

    handleClose = () => {
        this.setState({el: null})        
    }

    render()
    {
        const {mail, openComposeDialog, labels, admin} = this.props;

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
                            <Typography variant="subtitle1" className="flex"><strong>Department:</strong>&nbsp; {admin.department}</Typography>
                        </FuseAnimate>

                        {admin.role && labels && admin.role.name.length > 0 && (
                            <div className="flex flex-wrap mt-8">
                                <RoleChip className="mt-4 mr-4" title={admin.role.name} color={"#d84315"} key={admin.adUserID} />
                            </div>
                        )}
                    </div>

                </div>

                <Divider className="my-16"/>

                <FuseAnimate animation="transition.slideUpIn" delay={200}>
                    <div>

                        <div className="flex items-start justify-between">

                            <div className="flex items-center justify-start">

                                <div className="flex flex-col">
                                    <span>{admin.firstName}</span>
                                    <Typography component="div" color="textSecondary" variant="body1" className="flex items-center justify-start">
                                        <div>{admin.lastName}</div>
                                        <div className="ml-4">{admin.firstName}</div>
                                    </Typography>
                                </div>
                            </div>
                            <IconButton
                                aria-label="More"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleOpen}
                            >
                                <Icon>more_vert</Icon>
                            </IconButton>
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

                        <Divider className="my-16"/>

                        {admin.name && (
                            <div>
                                <Typography variant="subtitle1" className="mb-16">
                                    <span>Attachments</span>
                                    <span className="ml-4">({admin.firstName.length})</span>
                                </Typography>

                                <div className="flex flex-wrap">
                                    {/* {admin.attachments.map(attachment => (
                                        <div className="w-192 pr-16 pb-16" key={attachment.fileName}>
                                            <img className="w-full rounded-4" src={attachment.preview} alt={attachment.fileName}/>
                                            <div className="flex flex-col">
                                                <Typography color="primary" className="underline cursor-pointer" onClick={event => event.preventDefault()}>View</Typography>
                                                <Typography color="primary" className="underline cursor-pointer" onClick={event => event.preventDefault()}>Download</Typography>
                                                <Typography>({attachment.size})</Typography>
                                            </div>
                                        </div>
                                    ))} */}
                                </div>
                            </div>
                        )}
                    </div>
                </FuseAnimate>

                <RoleDialog />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getAdmin: Actions.getAdmin,
        getLabels: Actions.getLabels,
        openComposeDialog: Actions.openComposeDialog,
    }, dispatch);
}

function mapStateToProps({roleApp})
{
    console.log(roleApp, "Display Console");
    return {
        admin  : roleApp.admin.admin,
        labels  : roleApp.labels,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RolesDetails));
