import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../store/actions' 
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

class PtaDialog extends Component {

    state = {
        form: {
            fxId: '',
            status: '',
            reason: '',
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.form && prevProps.form !== this.props.form){
            this.setState({ form: this.props.form })
        }else if(this.props.pta !== prevProps.pta){
            const { status, id } = this.props.pta
            this.setState({ form: _.set(this.state.form, 'fxId', id)});
            this.setState({ form: _.set(this.state.form, 'status', status === true? false: true)});
        }
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.type !== "new"
    // }

    canBeSubmitted(){
        const {fxId, reason} = this.state.form;
        return (
            !_.isNull(fxId) && reason.length > 0
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleUpdatePta(form){
        const { action } = this.props
        action === 'approve'?
        this.props.approvePta(form):
        this.props.declinePta(form);
    }

    render()
    {
        const { composeDialog, closeComposeDialog, action } = this.props;
        const { form } = this.state

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
                                {action === 'approve'? 'Approve Pta' : 'Decline Pta'}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="Reason"
                            id="reason"
                            name="reason"
                            value={form.reason}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            required
                        />

                        <div className="pt-8">
                           
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleUpdatePta(form)}>
                                {action === 'approve'? 'Approve' : 'Decline'}
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
        approvePta: Actions.approvePta,
        declinePta: Actions.declinePta,
        closeComposeDialog: Actions.closeComposeDialog,
    }, dispatch);
}

function mapStateToProps({fileManagerApp, fuse})
{
    return {
        mainTheme    : fuse.settings.mainTheme,
        pta          : fileManagerApp.pta.pta,
        form         : fileManagerApp.pta.form,
        action       : fileManagerApp.pta.action,
        composeDialog: fileManagerApp.pta.composeDialog,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PtaDialog);
