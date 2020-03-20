import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const newRateState = {
    tempProductId: '',
    status: '',
    comment: '',
};

class MakerCheckerDialog extends Component {

    state = { ...newRateState };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.makerDialog.props.open && this.props.makerDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.makerDialog.type === 'approve') {
                this.setState({ ...this.props.makerDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.makerDialog.type === 'decline') {
                this.setState({ ...this.props.makerDialog.data });
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.makerDialog.type === 'approve' ? this.props.closeMakerDialog() : this.props.closeMakerDialog();
    };

    canBeSubmitted() {
        const { comment } = this.state;
        return (
            comment !== null
        );
    }

    // handleChange = name => event => {
    //     this.setState({
    //         [name]: event.target.value
    //     });
    // };

    render() {
        const { makerDialog, approveProduct, bondsProduct, declineProduct, classes } = this.props;

        console.log(this.state, 'this.state')

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...makerDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {makerDialog.type === 'approve' ? 'Approve Product' : 'Decline Product'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {makerDialog.type === 'approve' ? (
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

                                {/* <div className="flex">
                                    <TextField
                                        label="Comment"
                                        value={this.state.comment}
                                        name="comment"
                                        onChange={this.handleChange}
                                        id="formatted-comment-input"
                                        fullWidth
                                        className="mb-24"
                                        variant="outlined"
                                        multiline
                                        rows="4"
                                        autoFocus
                                    />
                                </div> */}

                            </div>
                        )}
                </DialogContent>

                {makerDialog.type === 'approve' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                approveProduct(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
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
                        </DialogActions>
                    )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeMakerDialog: Actions.closeMakerDialog,
        approveProduct: Actions.approveProduct,
        declineProduct: Actions.declineProduct,
    }, dispatch);
}

function mapStateToProps({ makerApp }) {
    return {
        makerDialog: makerApp.maker.makerDialog,
        bondsProduct: makerApp.maker.bondsProduct,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MakerCheckerDialog);
