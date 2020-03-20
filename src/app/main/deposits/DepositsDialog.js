import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Dialog, DialogActions, DialogContent, MenuItem, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import NumberFormat from 'react-number-format';


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
            console.log(values, "values.value")
            onChange({
                target: {
                    value: values.value,
                },
            });
        }}
        thousandSeparator
        isNumericString
        // prefix="₦" //"$"
      />
    );
}

class DepositsDialog extends Component {

    state = {
        form: {
            id: '',
            callRate: '',
            currency: '',
            minAmount: '',
            maxAmount: '',
            rate7Days: '',
            rate30Days: '',
            rate60Days: '',
            rate90Days: '',
            rate180Days: '',
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

    // handleSelected = (event) => {
    //     const { name, value } = event.target
    //     console.log(name, "hello name")
    //     console.log(value, "hello value")
    //     // this.setState({ form: _.set(this.state.form, event.target.name, event.target.value)});
    // }

    handleChangee = (name, event) => {
        this.setState({ form: _.set(this.state.form, name, event.target.value)});
        console.log(this.state.form, "Form State")
    }

    handleDepositSubmit = (form) => {
        const { mode, closeEditDepositDialog } = this.props
        mode === "new" ?
        this.props.addDepositRate(form):
        this.props.updateFixedDepositRate(form);
        closeEditDepositDialog()
    }

    canBeSubmitted() {
        const { callRate, maxAmount, minAmount, currency, rate7Days, rate30Days, rate60Days, rate90Days, rate180Days } = this.state.form;
        return (maxAmount.length > 0 || minAmount.length > 0 || currency && currency.length > 0) &&
            (Math.sign(callRate) == true && Math.sign(rate7Days) == true && Math.sign(rate30Days) == true && Math.sign(rate60Days) == true && Math.sign(rate90Days) == true && Math.sign(rate180Days) == true)
        
    }

    render() {

        const { form } = this.state
        const { currencies, composeDialog, closeEditDepositDialog, mode } = this.props

        // console.log(form, "Form Updated")
        return (
            <Dialog
                disableRestoreFocus={true}
                open={composeDialog}
                onClose={closeEditDepositDialog}
                aria-labelledby="form-dialog-title"
            >
                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {mode === "new" ? "New Fixed Deposit Rate" : "Update Fixed Deposit Rate"}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

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

                    <TextField
                        className="mt-8 mb-16"
                        label="Min. Amount"
                        id="minAmount"
                        name="minAmount"
                        autoFocus
                        value={form.minAmount}
                        onChange={(ev) => this.handleChangee('minAmount', ev)}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <TextField
                        className="mt-8 mb-16"
                        label="Max. Amount"
                        id="maxAmount"
                        name="maxAmount"
                        value={form.maxAmount}
                        onChange={(ev) => this.handleChangee('maxAmount', ev)}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <TextField
                        className="mt-8 mb-16"
                        label="Call Rate"
                        id="callRate"
                        name="callRate"
                        type="number"
                        autoFocus
                        value={form.callRate? form.callRate: ''}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />

                    <TextField
                        className="mt-8 mb-16"
                        label="Rate (7Days)"
                        id="rate7Days"
                        name="rate7Days"
                        type="number"
                        autoFocus
                        value={form.rate7Days? form.rate7Days: ''}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className="mt-8 mb-16"
                        label="Rate (30Days)"
                        id="rate30Days"
                        name="rate30Days"
                        type="number"
                        autoFocus
                        value={form.rate30Days? form.rate30Days: ''}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className="mt-8 mb-16"
                        label="Rate (60Days)"
                        id="rate60Days"
                        name="rate60Days"
                        type="number"
                        autoFocus
                        value={form.rate60Days? form.rate60Days: ''}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className="mt-8 mb-16"
                        label="Rate (90Days)"
                        id="rate90Days"
                        name="rate90Days"
                        type="number"
                        autoFocus
                        value={form.rate90Days? form.rate90Days: ''}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    <TextField
                        className="mt-8 mb-16"
                        label="Rate (180Days)"
                        id="rate180Days"
                        name="rate180Days"
                        type="number"
                        autoFocus
                        value={form.rate180Days? form.rate180Days: ''}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                    
                </DialogContent>

                <DialogActions className="justify-between pl-8 sm:pl-16">
                    <div>
                        <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleDepositSubmit(form)}>
                            {mode === "new" ? "Save" : "Update Rate"}
                        </Button>
                        
                    </div>
                    <IconButton 
                        onClick={() => closeEditDepositDialog()}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                </DialogActions>
            </Dialog>
        );
    }
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addDepositRate        : Actions.addDepositRate,
        updateFixedDepositRate: Actions.updateFixedDepositRate,
        closeNewDepositDialog : Actions.closeNewDepositDialog,
        closeEditDepositDialog: Actions.closeEditDepositDialog,
    }, dispatch);
}

function mapStateToProps({ depositsApp }) {
    const { deposits, currency } = depositsApp
    return {
        composeDialog: deposits.composeDialog,
        rate         : deposits.rate,
        mode         : deposits.mode,
        form         : deposits.form,
        currencies   : currency.data,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DepositsDialog);
