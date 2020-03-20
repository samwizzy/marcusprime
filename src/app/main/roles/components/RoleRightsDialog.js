import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../store/actions' 
import {withStyles, TextField, Button, Input, Checkbox, FormControl, ListItemText, Select, OutlinedInput, MenuItem, InputLabel, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

const styles = (theme => ({
    formControl: {
        marginBottom: theme.spacing.unit,
        minWidth: 360,
        display: 'flex'
    },
}))

class RoleRightsDialog extends Component {

    state = {
        form: {
            modulesIds: [],
            roleId: 0
        },
        labelWidth: 112
    }

    componentDidMount(){
        let ids = ['barney'];
        let modules = [
            { 'id': 'barney',  'active': true },
            { 'id': 'fred',    'active': false },
            { 'id': 'pebbles', 'active': false }
        ];
        let evens = modules.map(module => {
            if(ids.includes(module.id)){ 
                return module.id
            }
        })
       console.log(_.compact(evens), "dropRightWhile");
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.form && prevProps.form !== this.props.form){
            this.setState({ form: this.props.form })
        }
    }

    canBeSubmitted(){
        const {roleId, modulesIds} = this.state.form;
        return (
            Number.isInteger(roleId) > 0 && modulesIds.length > 0
        );
    }

    handleChange = (event) => {
        if(event.target.name === 'roleId') this.props.getRoleRight(event.target.value)
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleSubmit(form){
        this.props.addModuleRight(form) 
    }

    render()
    {
        const { classes, composeDialog, closeNewRightDialog, modules, roles, roleRights } = this.props;
        const { form, labelWidth } = this.state;
        const { rights } = roleRights
        console.log(form, "State Form Coming in")
        console.log(modules, "Modules Form Coming in")
        console.log(rights, "roleRights roleRights")
        const selectedRoles = roles && roles.filter(role => role.id !== 1);
        const selectedRights = modules && modules.filter(m => {
            return rights && !rights.some(right => m.moduleName.toLowerCase() == right.module.moduleName.toLowerCase())
        });

        console.log(selectedRights, "selectedRights")

        return (
            <div className="p-24">

                <Dialog
                    disableRestoreFocus={true}
                    open={composeDialog}
                    onClose={closeNewRightDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                New Right
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel ref={this.inputLabel} htmlFor="role">Select role</InputLabel>
                            <Select
                                value={form.roleId}
                                onChange={this.handleChange}
                                input={<OutlinedInput labelWidth={labelWidth} name="roleId" id="roleId" />}
                                autoWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    selectedRoles && selectedRoles.map((role, index) => 
                                    <MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel ref={this.inputLabel} htmlFor="modulesIds">Select Modules</InputLabel>
                            <Select
                                value={form.modulesIds}
                                onChange={this.handleChange}
                                input={<OutlinedInput labelWidth={labelWidth} name="modulesIds" id="modulesIds" />}
                                renderValue={selected => {
                                    const moduleSelected = modules && modules.map(module => { if(selected.includes(module.id)){ return module.moduleName } } )
                                    return _.compact(moduleSelected).join(', ')
                                }}
                                autoWidth
                                multiple
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    selectedRights && selectedRights.map((mod, index) => 
                                    <MenuItem key={index} value={mod.id}>
                                        <Checkbox checked={form.modulesIds.indexOf(mod.id) > -1} />
                                        <ListItemText primary={mod.moduleName} />
                                    </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleSubmit(form)}>
                                Send
                            </Button>
                        </div>
                        <IconButton onClick={() => closeNewRightDialog()}>
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
        addModuleRight: Actions.addModuleRight,
        getRoleRight: Actions.getRoleRight,
        closeNewRightDialog: Actions.closeNewRightDialog,
    }, dispatch);
}

function mapStateToProps({modulesRight, auth, fuse})
{
    console.log(modulesRight, "Tired of this shit")
    const { rights, roles } = modulesRight;
    return {
        mainTheme : fuse.settings.mainTheme,
        modules: rights.data,
        form: rights.form,
        roleRights: rights.right,
        composeDialog: rights.composeDialog,
        roles: roles.data,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RoleRightsDialog));
