import React, {Component} from 'react';
import {Checkbox, Icon, IconButton, Menu, MenuItem} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as Actions from '../store/actions/index';

class RolesToolbar extends Component {

    state = {
        selectMenu : null,
        foldersMenu: null,
        labelsMenu : null
    };

    handleMenuOpen = (event, menu) => {
        this.setState({[menu]: event.currentTarget});
    };

    handleMenuClose = (event, menu) => {
        this.setState({[menu]: null});
    };

    handleChange = () => event => {
        event.target.checked ? this.props.selectAllAdmins() : this.props.deselectAllAdmins();
    };

    handleAdminDelete = (selected) => {
        console.log(selected, "Selected")
        // this.props.deleteAdmin(selected)
    }

    render()
    {
        const {admins, roles, selectAllAdmins, deselectAllAdmins, selectedAdminIds, selectAdminsByParameter} = this.props;
        const {foldersMenu, selectMenu, labelsMenu} = this.state;

        return (
            <div className="flex flex-1 items-center sm:px-8">

                <Checkbox
                    onChange={this.handleChange()}
                    checked={selectedAdminIds.length === Object.keys(admins).length && selectedAdminIds.length > 0}
                    indeterminate={selectedAdminIds.length !== Object.keys(admins).length && selectedAdminIds.length > 0}
                />

                <IconButton
                    className="w-24"
                    aria-label="More"
                    aria-owns={selectMenu ? 'select-menu' : null}
                    aria-haspopup="true"
                    onClick={(ev) => this.handleMenuOpen(ev, 'selectMenu')}
                >
                    <Icon>arrow_drop_down</Icon>
                </IconButton>

                <Menu
                    id="select-menu"
                    anchorEl={selectMenu}
                    open={Boolean(selectMenu)}
                    onClose={(ev) => this.handleMenuClose(ev, 'selectMenu')}
                >
                    <MenuItem
                        onClick={(ev) => {
                            selectAllAdmins();
                            this.handleMenuClose(ev, 'selectMenu');
                        }}
                    >
                        All
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            deselectAllAdmins();
                            this.handleMenuClose(ev, 'selectMenu')
                        }}
                    >
                        None
                    </MenuItem>
                    {roles && roles.map((role, i) => 
                        <MenuItem
                            key={i}
                            onClick={(ev) => {
                                selectAdminsByParameter(role.id);
                                this.handleMenuClose(ev, 'selectMenu');
                            }}
                        >
                            {role.name}
                        </MenuItem>
                    )}
                    
                </Menu>

                {selectedAdminIds.length > 0 && (
                    <React.Fragment>
                        <div className="border-r-1 h-48 w-1 mx-12 my-0"/>
                        <IconButton
                            onClick={(ev) => this.handleAdminDelete(selectedAdminIds)}
                            aria-label="Delete"
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                        
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        deleteAdmin             : Actions.deleteAdmin,
        selectAllAdmins         : Actions.selectAllAdmins,
        deselectAllAdmins       : Actions.deselectAllAdmins,
        selectAdminsByParameter : Actions.selectAdminsByParameter,
    }, dispatch);
}

function mapStateToProps({roleApp})
{
    return {
        selectedAdminIds: roleApp.admin.selectedAdminIds,
        admins         : roleApp.admin.data,
        roles         : roleApp.roles.data,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RolesToolbar));
