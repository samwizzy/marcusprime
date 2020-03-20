import React, { Component } from 'react';
import ReactSelect from 'react-select'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, FormControl, Select, Input, Checkbox, ListItemText, FormHelperText, InputLabel, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, InputAdornment } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const styles = (theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: '100%',
        margin: theme.spacing[1],
        // minWidth: 120,
        maxWidth: '100%',
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};
class UtilityDialog extends Component {

    state = {
        form: {
            loanNotificationDepts: [],
            ptaNotificationDepts: []
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.mode === "new"){
            return {
                form: props.form
            }
        }
        return null
    }

    componentDidUpdate(props, state) {
        if(props.setting !== this.props.setting && this.props.mode === "edit"){
            const { setting } = this.props
            this.setState({ form: _.set(setting) })
        }
    }

    handleChange = (event) => {
        const {name, value } = event.target
        console.log(name, "name")
        console.log(value, "value")
        this.setState({ form: _.set(this.state.form, event.target.name, event.target.value)});
    };

    handleSettingSubmit = (form) => {
        const { mode, closeEditSettingDialog } = this.props
        mode === "new" ?
        this.props.addSetting(form):
        this.props.updateSetting(form);
        closeEditSettingDialog()
    }

    canBeSubmitted() {
        const { loanNotificationDepts, ptaNotificationDepts } = this.state.form
        return (
            loanNotificationDepts && loanNotificationDepts.length > 0 && ptaNotificationDepts && ptaNotificationDepts.length > 0
        );
    }

    render() {

        const { form } = this.state
        const { loanNotificationDepts, ptaNotificationDepts } = form
        const { composeDialog, closeEditSettingDialog, departments, mode, classes } = this.props
        console.log(form, "form")

        return (
            <Dialog
                disableRestoreFocus={true}
                open={composeDialog}
                onClose={closeEditSettingDialog}
                aria-labelledby="form-dialog-title"
            >
                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {mode === "new" ? "New Settings" : "Update Settings"}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-16 pb-20 h-200 sm:p-24 sm:pb-0"}}>

                    <FormControl className="flex w-400">
                        <InputLabel htmlFor="select-multiple-checkbox">Loan Notification Depts</InputLabel>
                        <Select
                            fullWidth
                            multiple
                            value={loanNotificationDepts}
                            onChange={(ev) => this.handleChange(ev)}
                            input={<Input name="loanNotificationDepts" id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                            >
                            {departments.map(dept => (
                                <MenuItem key={dept.id} value={dept.id}>
                                    <Checkbox checked={loanNotificationDepts.indexOf(dept.id) > -1} />
                                    <ListItemText primary={dept.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="flex w-400">
                        <InputLabel htmlFor="select-multiple-checkbox">PTA Notification Depts</InputLabel>
                        <Select
                            fullWidth
                            multiple
                            value={ptaNotificationDepts}
                            onChange={(ev) => this.handleChange(ev)}
                            input={<Input name="ptaNotificationDepts" id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                            >
                            {departments.map(dept => (
                                <MenuItem key={dept.id} value={dept.id}>
                                    <Checkbox checked={ptaNotificationDepts.indexOf(dept.id) > -1} />
                                    <ListItemText primary={dept.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div className="pt-8">
                        
                    </div>
                </DialogContent>

                <DialogActions className="justify-between pl-8 sm:pl-16">
                    <div>
                        <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleSettingSubmit(form)}>
                            {mode === "new" ? "Save" : "Update Settings"}
                        </Button>
                        
                    </div>
                    <IconButton onClick={() => closeEditSettingDialog()}>
                        <Icon>close</Icon>
                    </IconButton>
                </DialogActions>
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addSetting          : Actions.addSetting,
        updateSetting         : Actions.updateSetting,
        closeNewSettingDialog: Actions.closeNewSettingDialog,
        closeEditSettingDialog: Actions.closeEditSettingDialog,
    }, dispatch);
}

function mapStateToProps({ UtilityApp }) {
    console.log(UtilityApp, "utilityApp")
    const { setting, department } = UtilityApp
    return {
        departments: department.data,
        composeDialog: setting.composeDialog,
        setting      : setting.setting,
        mode         : setting.mode,
        form         : setting.form,
    }
}


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UtilityDialog));
