import React from 'react';
import {Icon, Button, Toolbar, AppBar, Dialog, DialogContent, TextField, MenuItem, DialogActions, IconButton, Typography} from '@material-ui/core';
import * as Actions from '../store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash'

class AdminsDialog extends React.Component {

    state = { 
        composeDialog: false,
        form: this.props.admin,
    };

    static getDerivedStateFromProps(props, state){
        if(props.admin !== state.form){
            return {
                form: props.admin
            }
        }
        return null
    } 

    openComposeDialog = (e) => {
        e.stopPropagation();
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    updateAdmin = (form) => {
        this.props.updateAdmin(form);
        this.closeComposeDialog()
    };

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render(){
        const { departments, branches, composeDialog, composeEditDialog, closeComposeDialog, admin } = this.props
        const { form } = this.state;
        const sortedBranches = _.sortBy(branches, [function(o) { return o.name; }]);

        console.log(form, "Admin user one")
        return (
            <div className="flex flex-1 w-full items-center justify-between">

                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={this.openComposeDialog}
                >
                    edit
                </Button> */}

                <Dialog
                    open={composeEditDialog}
                    onClose={closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                Edit Administrator
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="Display Name"
                            id="displayName"
                            type="text"
                            name="displayName"
                            required
                            value={form.displayName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="First Name"
                            id="firstName"
                            type="text"
                            name="firstName"
                            required
                            value={form.firstName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Last Name"
                            id="lastName"
                            type="text"
                            name="lastName"
                            required
                            value={form.lastName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Email"
                            id="name"
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Mobile Number"
                            id="mobileNumber"
                            type="text"
                            name="mobileNumber"
                            required
                            value={form.mobileNumber}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            id="department"
                            select
                            label="Department"
                            name="department"
                            className="mt-8 mb-16"
                            value={form.department}
                            onChange={this.handleChange}
                            SelectProps={{
                            MenuProps: {
                                className: "mt-8 mb-16",
                            },
                            }}
                            variant="outlined"
                            fullWidth
                        >
                            {departments.map(option => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="branch"
                            select
                            label="Branch Code"
                            name="branchCode"
                            className="mt-8 mb-16"
                            value={form.branchCode? form.branchCode : ''}
                            onChange={this.handleChange}
                            SelectProps={{
                            MenuProps: {
                                className: "mt-8 mb-16",
                            },
                            }}
                            variant="outlined"
                            fullWidth
                        >
                            {sortedBranches && sortedBranches.map((option, i) => (
                                <MenuItem key={i} value={option.code}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" variant="contained" color="primary" onClick={() => this.updateAdmin(form)} >
                                Save
                            </Button>
                        </div>
                        <IconButton onClick={closeComposeDialog}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>


            </div>
        );
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateAdmin: Actions.updateAdmin,
        closeComposeDialog: Actions.closeComposeDialog,
    }, dispatch);
}

function mapStateToProps({adminApp, fuse})
{
    // console.log(adminApp, "Admin Dialog")
    return {
        mainTheme  : fuse.settings.mainTheme,
        departments: adminApp.departments,
        branches: adminApp.admins.branch,
        composeDialog: adminApp.admins.composeDialog,
        composeEditDialog: adminApp.admins.composeEditDialog,
        admin: adminApp.admins.admin,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminsDialog);
