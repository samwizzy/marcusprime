import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FuseChipSelect } from '../../../@fuse';
import * as Actions from './store/actions';
import RolesAttachment from './RolesAttachment';

const rights = [
    {
        value: "create",
        label: "create"
    },
    {
        value: "read",
        label: "read"
    },
    {
        value: "write",
        label: "write"
    },
    {
        value: "update",
        label: "update"
    },
    {
        value: "delete",
        label: "delete"
    }
].map(item => ({
    value: item.value,
    label: item.label
}));


class RoleCompose extends Component {

    state = {
        composeDialog: false,
        form: {
            name       : '',
            // privileges : [],
            description: ''
        },
        canSubmit: false
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
        console.log(this.state.form, "state point");
    };

    handleSubmit = (form) => {
        this.props.addRole(form)
        this.closeComposeDialog()
    }

    render(){
        const { form, canSubmit } = this.state;
        const { addRole } = this.props;
        console.log(form, "The Form");
        console.log(this.props, "The props checks");

        return (
            <div className="p-24">

                <Button
                    variant="contained"
                    color="primary"
                    className="w-full"
                    onClick={this.openComposeDialog}
                >
                    NEW ROLE
                </Button>

                <Dialog
                    open={this.state.composeDialog}
                    onClose={this.closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                New Role
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="Role Name"
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={this.handleChange}
                            label="Description"
                            type="text"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />

                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" variant="contained" color="primary" onClick={() => this.handleSubmit(form)}>
                                Save
                            </Button>
                        </div>
                        <IconButton onClick={this.closeComposeDialog}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addRole: Actions.addRole
    }, dispatch);
}

const mapStateToProps = ({roleApp}) => {
    console.log(roleApp, "what tha helllll");
    return{
        roles: roleApp.roles,
        log: roleApp.role,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleCompose);
