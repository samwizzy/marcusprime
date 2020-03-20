import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../store/actions' 
import {TextField, FormControlLabel, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, MenuItem, Typography, Toolbar, Switch, AppBar} from '@material-ui/core';
import _ from 'lodash';

const types = [
    {label: 'Id', value: 'id'}, 
    {label: 'Visa', value: 'Visa'}, 
    {label: 'Utility Bills', value: 'Utility Bills'}, 
    {label: 'Signature', value: 'Signature'}, 
    {label: 'Passport', value: 'Passport'}, 
    {label: 'Ticket', value: 'Ticket'}, 
    {label: 'Passport Photograph', value: 'Passport Photograph'}
];

class WalletFundDialog extends Component {

    state = {
        form: {
            name: '',
            description: '',
            type: '',
            kyc: false
        }
    }

    static getDerivedStateFromProps(nextProps, nextState){
        return null
    }

    canBeSubmitted(){
        const {name, description} = this.state.form;
        return (
            name && name.length > 0 && description && description.length > 0
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleDocTypeSubmit(form){
        this.props.fundWallet()
    }

    render()
    {
        const { composeDialog, closeComposeDialog, mode } = this.props;
        const { form } = this.state

        console.log(form, "Form Compilation")

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
                                Fund Wallet
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
                            id="type"
                            select
                            label="Doc Type"
                            name="type"
                            className="mt-8 mb-16"
                            value={form.type? form.type : ''}
                            onChange={this.handleChange}
                            SelectProps={{
                            MenuProps: {
                                className: "mt-8 mb-16",
                            },
                            }}
                            variant="outlined"
                            fullWidth
                        >
                            {types && types.map((option, i) => (
                                <MenuItem key={i} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            className="mt-8 mb-16"
                            label="Description"
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            required
                        />

                        <FormControlLabel
                            control={
                            <Switch
                                label="KYC Status"
                                checked={form.kyc}
                                onChange={this.handleChange}
                                name="kyc"
                                value="kyc"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            }
                            label="KYC Status"
                        />
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleDocTypeSubmit(form)}>
                                {mode === 'new'? 'Send' : 'Update'}
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
        closeComposeDialog: Actions.closeComposeDialog,
        fundWallet: Actions.fundWallet,
    }, dispatch);
}

function mapStateToProps({walletFundApp, fuse})
{
    const { walletFund } = walletFundApp
    return {
        mainTheme    : fuse.settings.mainTheme,
        walletFund     : walletFund.data,
        composeDialog: walletFund.composeDialog,
        form         : walletFund.form,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletFundDialog);
