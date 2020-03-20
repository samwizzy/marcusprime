import React, { Component } from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, MenuItem, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment'

class FxSwitchRateDialog extends Component {

    state = {
        form: {
            bid: '',
            offer: ''
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
        if(props.rate !== this.props.rate && this.props.mode === "edit"){
            const { rate } = this.props
            this.setState({ form: _.set(rate) })
        }else if(props.form !== this.props.form){
            this.setState({ form: _.set(this.props.form) })
        }
    }

    handleChange = (event) => {
        this.setState({ form: _.set(this.state.form, event.target.name, event.target.value)});
    }

    handleRateSubmit = (form) => {
        const { mode, closeEditFxSwitchDialog } = this.props
        mode === "new" ?
        this.props.addRate(form):
        this.props.updateRate(form);
        closeEditFxSwitchDialog()
    }

    canBeSubmitted() {
        const { bid, offer } = this.state.form;
        return (
            (bid.length > 0 || offer.length > 0) &&
            (Math.sign(bid) == true && Math.sign(offer) == true)
        );
    }

    render() {

        const { form } = this.state
        const { composeDialog, closeEditFxSwitchDialog, currencies, mode } = this.props
        console.log(this.props.rate, "this.props.rate");

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
                            {mode === "new" ? "New Rate" : "Update Rate"}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                    <TextField
                        className="mt-8 mb-16"
                        label="BID"
                        id="bid"
                        name="bid"
                        autoFocus
                        value={form.bid}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <TextField
                        className="mt-8 mb-16"
                        label="Offer"
                        id="offer"
                        name="offer"
                        autoFocus
                        value={form.offer}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <TextField
                        id="currency"
                        select
                        label="Currency"
                        name="currency"
                        className="mt-8 mb-16"
                        value={form.currency? form.currency: ''}
                        onChange={this.handleChange}
                        SelectProps={{
                        MenuProps: {
                            className: "mt-8 mb-16",
                        },
                        }}
                        variant="outlined"
                        fullWidth
                    >
                        {currencies && currencies.map((currency, i) => (
                            <MenuItem key={i} value={currency.code}>
                                {currency.name} ({currency.code})
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>

                <DialogActions className="justify-between pl-8 sm:pl-16">
                    <div>
                        <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleRateSubmit(form)}>
                            {mode === "new" ? "Save" : "Update Rate"}
                        </Button>
                        
                    </div>
                    <IconButton 
                        onClick={() => closeEditFxSwitchDialog()}
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
        addRate            : Actions.addFxSwitch,
        updateRate        : Actions.updateFxSwitch,
        closeEditFxSwitchDialog: Actions.closeEditFxSwitchDialog,
    }, dispatch);
}

function mapStateToProps({ fxSwitchApp }) {
    const { fxswitch, currency } = fxSwitchApp
    return {
        composeDialog: fxswitch.composeDialog,
        rate         : fxswitch.rate,
        mode         : fxswitch.mode,
        form         : fxswitch.form,
        currencies   : currency.data
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FxSwitchRateDialog);
