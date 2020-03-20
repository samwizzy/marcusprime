import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const newTransferState = {
    id: '',
};

class TransferQueueDialog extends Component {

    state = { ...newTransferState };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.transferDialog.props.open && this.props.transferDialog.props.open) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.transferDialog.type === 'approve') {
                this.setState({ ...this.props.transferDialog.data });
            };

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.transferDialog.type === 'decline') {
                this.setState({ ...this.props.transferDialog.data });
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.transferDialog.type === 'approve' ? this.props.closeTransferDialog() : this.props.closeTransferDialog();
    };

    canBeSubmitted() {
        const { comment } = this.state;
        return (
            comment !== null
        );
    }

    render() {
        const { transferDialog, approveTransfer, deleteTransfer } = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...transferDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {transferDialog.type === 'approve' ? 'Approve Product' : 'Decline Product'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {transferDialog.type === 'approve' ? (
                        <div>
                            <div className="flex">
                                <Typography variant="subtitle1" color="inherit">
                                    Are you sure you want to confirm this action
                                </Typography>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div className="flex">
                                    <Typography variant="subtitle1" color="inherit">
                                        Are you sure you want to confirm this action
                                    </Typography>
                                </div>

                                <br />
                            </div>
                        )}
                </DialogContent>

                {transferDialog.type === 'approve' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                approveTransfer(this.state);
                                this.closeComposeDialog();
                            }}
                        >
                            Confirm
                        </Button>


                        <IconButton
                            onClick={() => {
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
                                    deleteTransfer(this.state);
                                    this.closeComposeDialog();
                                }}
                                disabled={!this.canBeSubmitted()}
                            >
                                Delete
                        </Button>
                            <IconButton
                                onClick={() => {
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
        closeTransferDialog: Actions.closeTransferDialog,
        approveTransfer: Actions.approveTransfer,
        // deleteTransfer: Actions.deleteTransfer,
    }, dispatch);
}

function mapStateToProps({ transferQueueApp }) {
    return {
        transferDialog: transferQueueApp.transferQueue.transferDialog,
        bondsProduct: transferQueueApp.transferQueue.bondsProduct,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransferQueueDialog);
