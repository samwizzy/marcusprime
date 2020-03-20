import React, {Component} from 'react';
import { FuseChipSelect } from '../../../../../@fuse';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../store/actions'
import {withStyles, TextField, Button, Input, InputLabel, FormControl, Select, NativeSelect, MenuItem, MenuList, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 360,
        display: 'flex'
    },
})

class DepartmentDialog extends Component {

    state = {
        form: {
            id: '',
            name: '',
            contactPersonId: '',
            email: ''
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.form === state.form){
            return {
                form: props.form
            }
        }
        return null
    }

    componentDidUpdate(props, state){
        if(this.props.admin !== props.admin){
            this.setState(_.set(this.state.form, 'contactPersonId', this.props.admin.adUserID) )
        }else if(this.props.department !== props.department){
            const { id, name, email, contactPersonId } = this.props.department
            this.setState(_.set(this.state.form, 'id', id) )
            this.setState(_.set(this.state.form, 'name', name) )
            this.setState(_.set(this.state.form, 'email', email) )
            this.setState(_.set(this.state.form, 'contactPersonId', contactPersonId) )
        }else if(props.form !== this.props.form){
            this.setState({form: _.set(this.props.form)})
        }
    }

    canBeSubmitted(){
        const {name, contactPersonId} = this.state.form;
        return (
            name.length > 0
        );
    }

    handleChipChange = (event) => {
        const { name, value } = event.target
        this.setState(_.set(this.state.form, name, value));
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleSubmitDepartment(form){
        const { mode } = this.props
        mode === "new" ? 
            this.props.addDepartment(form) :
            this.props.updateDepartment(form);
            this.props.closeComposeDialog()
    }

    render()
    {
        const { classes, composeDialog, closeComposeDialog, admins, department, mode } = this.props;
        const { form } = this.state;

        console.log(form)
        console.log(composeDialog, "composeDialog")

        if(!form){
            return '';
        }

        return (
            <div className="p-24">

                <Dialog
                    open={composeDialog}
                    onClose={closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {mode === "new" ? "Add Department" : "Update Department" }
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="Department Name"
                            id="name"
                            name="name"
                            autoFocus
                            value={form.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="contactPersonId">Select Contact Person</InputLabel>
                            <Select
                                value={form.contactPersonId? form.contactPersonId : "" }
                                onChange={(value) => this.handleChipChange(value)}
                                input={<Input name="contactPersonId" id="contactPersonId" />}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    admins && admins.map((admin, index) => 
                                    <MenuItem key={index} value={admin.adUserID}>{admin.email}</MenuItem>)
                                }
                            </Select>
                        </FormControl>

                        <TextField
                            className="mt-8 mb-16"
                            label="email"
                            id="email"
                            name="email"
                            autoFocus
                            value={form.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        {/* <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="email">Select email</InputLabel>
                            <Select
                                value={form.email? form.email : "" }
                                onChange={(value) => this.handleChipChange(value)}
                                input={<Input name="email" id="email" />}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    admins && admins.map((admin, index) => 
                                    <MenuItem key={index} value={admin.email}>{admin.email}</MenuItem>)
                                }
                            </Select>
                        </FormControl> */}


                        <div className="pt-8">
                           
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleSubmitDepartment(form)}>
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
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addDepartment   : Actions.addDepartment,
        updateDepartment: Actions.updateDepartment,
        getDepartment   : Actions.getDepartment,
        getAdmin        : Actions.getAdmin,
    }, dispatch);
}

function mapStateToProps({departmentApp, fuse})
{
    console.log(departmentApp, "Department App")
    const { department, admins } = departmentApp
    return {
        mainTheme  : fuse.settings.mainTheme,
        departments: department.data,
        department : department.department,
        mode       : department.mode,
        form       : department.form,
        admins     : admins.data,
        admin      : admins.admin,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DepartmentDialog));
