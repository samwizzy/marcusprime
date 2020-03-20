import React, {Component} from 'react';
import { FuseChipSelect } from '../../../../@fuse';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../store/actions' 
import {withStyles, FormControl, TextField, InputLabel, Input, Select, MenuItem, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 360,
    },
})

class RoleDialog extends Component {

    state = {
        form: {
            adUserID: "",
            role: {id: ""}
        }
    }

    // static getDerivedStateFromProps(props, state){
    //     if(props.admin !== state.form){
    //         return {
    //             form: {
    //                 ...state.form,
    //                 ...props.admin
    //             }
    //         }
    //     }
    //     return null
    // }

    componentDidUpdate(props, state){
        if(this.props.admin !== props.admin){
            console.log(this.props.admin, "This.props.adminm my my my")
            this.setState({ form: this.props.admin})
        }
    }

    canBeSubmitted(){
        const {adUserID, role} = this.state.form;
        return (
            role && typeof role.id == 'number'
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        console.log(this.state.form, "Form Change")
    };

    handleChipChange = event => {
        const { name, value } = event.target
        console.log(name, value, "I am tired")
        this.setState({form: _.set(this.state.form, name, {id: value})});
        console.log(this.state.form, "Form updated")
    }

    handleUpdateRole(form){
        this.props.updateAdmin(form)
        this.props.closeComposeDialog()
    }

    render()
    {
        const { classes, composeDialog, closeComposeDialog, roles, admin } = this.props;
        const { form } = this.state;
        console.log(this.state.form, "Render updated")
        console.log(admin, "Admin Object")

        return (
            <div className="p-24">

                <Dialog
                    disableRestoreFocus={true}
                    open={composeDialog}
                    onClose={closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                Assign Role to Administrator
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="role">Select role</InputLabel>
                            <Select
                                value={form.role? form.role.id:''}
                                onChange={this.handleChipChange}
                                input={<Input name="role" id="role" />}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    roles && roles.map((role, index) => 
                                    <MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>

                        <div className="pt-8">
                           
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleUpdateRole(form)}>
                                Assign role
                            </Button>
                            
                        </div>
                        <IconButton onClick={() => closeComposeDialog()}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        updateAdmin: Actions.updateAdmin,
        closeComposeDialog: Actions.closeComposeDialog,
    }, dispatch);
}

function mapStateToProps({roleApp, fuse})
{
    const { roles, admin } = roleApp;
    console.log(admin, "Admin Object Seen")
    return {
        mainTheme : fuse.settings.mainTheme,
        roles: roles.data,
        admin: admin.admin,
        composeDialog: admin.composeDialog,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RoleDialog));
