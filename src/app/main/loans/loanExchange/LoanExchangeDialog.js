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
    percentage: '',
    rate: '',
};

class LoanExchangeDialog extends Component {

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
            if (this.props.rateDialog.type === 'edit' &&
                this.props.rateDialog.data &&
                !_.isEqual(this.props.rateDialog.data, prevState)) {
                this.setState({ ...this.props.rateDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.rateDialog.type === 'new' &&
                !_.isEqual(newRateState, prevState)) {
                    console.log(newRateState, 'newRateState')
                this.setState({ ...newRateState });
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
        const { percentage, rate } = this.state;

        if (this.props.rateDialog.type === 'edit') {
            return (
                percentage !== null && rate !== null
            );
        }
    }

    render() {
        const { rateDialog, addRate, updateRate, classes } = this.props;

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
                            {rateDialog.type === 'new' ? 'New Rate' : 'Edit Loan Rate'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {
                        rateDialog.type === 'new' ? (

                            <div>

                            </div>
                        ) : (
                                <div>
                                    <div className="flex">
                                        <TextField
                                            className="mb-24"
                                            label="Percentage"
                                            type="number"
                                            id="outlined-adornment-percentage"
                                            name="percentage"
                                            value={this.state.percentage}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </div>

                                    <div className="flex">
                                        <TextField
                                            className="mb-24"
                                            label="Rate"
                                            type="number"
                                            id="outlined-adornment-rate"
                                            name="rate"
                                            value={this.state.rate}
                                            onChange={this.handleChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </div>
                                </div>
                            )
                    }
                </DialogContent>

                {rateDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addRate(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                        <IconButton
                            onClick={() => {
                                // disableRate(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>clear</Icon>
                        </IconButton>
                    </DialogActions>
                ) : (
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
                                    // disableRate(this.state.id);
                                    this.closeComposeDialog();
                                }}
                            >
                                <Icon>clear</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeNewRateDialog: Actions.closeNewRateDialog,
        closeEditRateDialog: Actions.closeEditRateDialog,
        addRate: Actions.addRate,
        updateRate: Actions.updateRate,
        // disableRate: Actions.disableRate
    }, dispatch);
}

function mapStateToProps({ loanExchangeRatesApp }) {
    return {
        rateDialog: loanExchangeRatesApp.rate.rateDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoanExchangeDialog);
