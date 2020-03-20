import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Switch, FormControlLabel } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const newRateState = {
    name: '',
    code: '',
    weSale: '',
    weBuy: '',
    enableForWallet: false,
    walletFundingCap: ''
};

class ExchangeRatesDialog extends Component {

    state = { ...newRateState };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.rateDialog.props.open && this.props.rateDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.rateDialog.data &&
                !_.isEqual(this.props.rateDialog.data, prevState)) {
                    console.log(this.props.rateDialog.data, 'this.props.rateDialog.data');
                this.setState({ ...this.props.rateDialog.data });
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.rateDialog.type === 'edit' ? this.props.closeEditRateDialog() : this.props.closeNewRateDialog();
    };

    canBeSubmitted() {
        const { name, code, weSale, weBuy, walletFundingCap } = this.state;
        const walletCap = parseInt(walletFundingCap)

        return name.length > 0 && code.length > 0 && Number.isInteger(walletCap)
    }

    render() {
        const { rateDialog, updateRate, classes } = this.props;
        console.log(this.state, "this.state");
        console.log(rateDialog, "rateDialog rateDialog")

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...rateDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            Update Currency Rate
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>
                    <div>
                        <div className="flex">
                            <TextField
                                className="mb-24"
                                label="Wallet Funding Cap"
                                type="number"
                                id="outlined-adornment-weSale"
                                name="walletFundingCap"
                                value={this.state.walletFundingCap? this.state.walletFundingCap: 0}
                                onChange={this.handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </div>
                    </div>
                    
                </DialogContent>
                <DialogActions className="justify-between pl-16">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            updateRate(this.state);
                            this.closeComposeDialog();
                        }}
                        disabled={!this.canBeSubmitted()}
                    >
                        Save
                    </Button>
                    <IconButton
                        onClick={() => {
                            this.closeComposeDialog();
                        }}
                    >
                        <Icon>clear</Icon>
                    </IconButton>
                </DialogActions>
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeNewRateDialog: Actions.closeNewRateDialog,
        closeEditRateDialog: Actions.closeEditRateDialog,
        updateRate: Actions.updateRate,
    }, dispatch);
}

function mapStateToProps({ exchangeRatesApp }) {
    return {
        rateDialog: exchangeRatesApp.rate.rateDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRatesDialog);
