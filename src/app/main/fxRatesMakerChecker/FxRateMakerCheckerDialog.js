import React, { Component } from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment'

class FxRateMakerCheckerDialog extends Component {

    state = {
        form: {
            id: '',
            name: '',
            day: ''
        }
    }

    static getDerivedStateFromProps(props, state){
        if(props.form === state.form && props.mode === "new"){
            return {
                form: props.form
            }
        }
        return null
    }

    componentDidUpdate(props, state) {
        if(props.history !== this.props.history && this.props.mode === "edit"){
            const { history } = this.props
            this.setState({ form: _.set(history) })
        }else if(props.form !== this.props.form){
            this.setState({ form: _.set(this.props.form) })
        }
    }

    handleChange = (event) => {
        this.setState({ form: _.set(this.state.form, event.target.name, event.target.value)});
    }

    handleHolidaySubmit = (form) => {
        const { mode, closeEditFxSwitchDialog } = this.props
        mode === "new" ?
        this.props.addHoliday(form):
        this.props.updateHoliday(form);
        closeEditFxSwitchDialog()
    }

    canBeSubmitted() {
        const { name, day } = this.state.form;
        return (
            name.length > 0 || day.length > 0
        );
    }

    render() {

        const { form } = this.state
        const { composeDialog, closeEditFxSwitchDialog, mode } = this.props

        console.log(form, "Form Updated")
        return (
            <Dialog
                disableRestoreFocus={true}
                open={composeDialog}
                onClose={closeEditFxSwitchDialog}
                aria-labelledby="form-dialog-title"
            >
                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {mode === "new" ? "New Holiday" : "Update Holiday"}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                    <TextField
                        className="mt-8 mb-16"
                        label="Name"
                        id="name"
                        name="name"
                        autoFocus
                        value={form.name}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <TextField
                        className="mt-8 mb-16"
                        label="Holiday Date"
                        id="day"
                        name="day"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={moment(form.day).format('YYYY-MM-DD')}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <div className="pt-8">
                        
                    </div>
                </DialogContent>

                <DialogActions className="justify-between pl-8 sm:pl-16">
                    <div>
                        <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleHolidaySubmit(form)}>
                            {mode === "new" ? "Save" : "Update Holiday"}
                        </Button>
                        
                    </div>
                    <IconButton 
                        // onClick={() => closeEditHolidayDialog()}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                </DialogActions>
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addFxSwitch            : Actions.addFxSwitch,
        updateFxSwitch         : Actions.updateFxSwitch,
        closeNewFxSwitchDialog : Actions.closeNewFxSwitchDialog,
        closeEditFxSwitchDialog: Actions.closeEditFxSwitchDialog,
    }, dispatch);
}

function mapStateToProps({ fxSwitchApp }) {
    const { fxswitch } = fxSwitchApp
    return {
        composeDialog: fxswitch.composeDialog,
        rate         : fxswitch.rate,
        mode         : fxswitch.mode,
        form         : fxswitch.form,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FxRateMakerCheckerDialog);
