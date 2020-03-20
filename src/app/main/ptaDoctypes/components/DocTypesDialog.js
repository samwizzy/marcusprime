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

class DocTypesDialog extends Component {

    state = {
        form: {
            doctypeId: '',
            fxCatId: 1,
        }
    }

    canBeSubmitted(){
        const {doctypeId, fxCatId} = this.state.form;
        return (
            doctypeId && Number.isInteger(doctypeId) && fxCatId && Number.isInteger(fxCatId)
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        console.log(this.state.form, "Form Change")
    };

    handlePtaDocTypeSubmit = (form) => {
        console.log(form, "Form get")
        this.props.addPtaDocType(form)
    }

    render()
    {
        const { composeDialog, closeComposeDialog, doctypes } = this.props;
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
                                Create PTA Document Type
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            id="doctypeId"
                            select
                            label="Doc Type"
                            name="doctypeId"
                            className="mt-8 mb-16"
                            value={form.doctypeId}
                            onChange={this.handleChange}
                            SelectProps={{
                            MenuProps: {
                                className: "mt-8 mb-16",
                            },
                            }}
                            variant="outlined"
                            fullWidth
                        >
                            {doctypes && doctypes.map((option, i) => (
                                <MenuItem key={i} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handlePtaDocTypeSubmit(form)}>
                                Send
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
        addPtaDocType: Actions.addPtaDocType,
    }, dispatch);
}

function mapStateToProps({ptaDocTypesApp, fuse})
{
    const { ptadoctypes } = ptaDocTypesApp
    return {
        mainTheme    : fuse.settings.mainTheme,
        doctypes     : ptadoctypes.data,
        ptadoctype      : ptadoctypes.ptadoctype,
        doctypes     : ptadoctypes.docdata,
        composeDialog: ptadoctypes.composeDialog,
        form         : ptadoctypes.form,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocTypesDialog);
