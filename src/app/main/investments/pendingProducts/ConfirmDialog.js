import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const newRateState = {
    tempProductId: '',
    status: '',
    comment: '',
};

class confirmDialog extends Component {

    state = { ...newRateState };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.confirmDialog.props.open && this.props.confirmDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.confirmDialog.type === 'enable') {
                this.setState({ ...this.props.confirmDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.confirmDialog.type === 'disable') {
                this.setState({ ...this.props.confirmDialog.data });
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.confirmDialog.type === 'enable' ? this.props.closeConfirmDialog() : this.props.closeConfirmDialog();
    };

    // handleChange = name => event => {
    //     this.setState({
    //         [name]: event.target.value
    //     });
    // };

    render() {
        const { confirmDialog, enableProduct, bondsProduct, declineProduct, classes } = this.props;

        console.log(this.state, 'this.state');
        console.log(confirmDialog.props, 'confirmDialog');
        console.log(this.closeComposeDialog, 'this.closeComposeDialog');

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...confirmDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {confirmDialog.type === 'enable' ? 'Enable Product' : 'Disable Product'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {confirmDialog.type === 'enable' ? (
                        <div>
                            <div className="flex">
                                <Typography variant="subtitle1" color="inherit">
                                    Are you sure you want to enable this product?
                                </Typography>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div className="flex">
                                    <Typography variant="subtitle1" color="inherit">
                                        Are you sure you want to disable this product?
                                    </Typography>
                                </div>
                            </div>
                        )}
                </DialogContent>

                {confirmDialog.type === 'enable' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                enableProduct(this.state);
                                this.closeComposeDialog();
                            }}
                        >
                            Yes
                        </Button>


                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.closeComposeDialog();
                            }}
                        >
                            No
                        </Button>
                        {/* <IconButton
                            onClick={() => {
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>clear</Icon>
                        </IconButton> */}
                    </DialogActions>

                ) : (
                        {/* <DialogActions className="justify-between pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    declineProduct(this.state);
                                    this.closeComposeDialog();
                                }}
                                disabled={!this.canBeSubmitted()}
                            >
                                Decline
                        </Button>
                            <IconButton
                                onClick={() => {
                                    this.closeComposeDialog();
                                }}
                            >
                                <Icon>clear</Icon>
                            </IconButton>
                        </DialogActions> */}
                    )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeConfirmDialog: Actions.closeConfirmDialog,
        enableProduct: Actions.enableProduct,
        // declineProduct: Actions.declineProduct,
    }, dispatch);
}

function mapStateToProps({ pendingProductsApp }) {
    return {
        confirmDialog: pendingProductsApp.tbills.confirmDialog,
        bondsProduct: pendingProductsApp.tbills.bondsProduct,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(confirmDialog);
