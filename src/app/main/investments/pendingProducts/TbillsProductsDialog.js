import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, InputAdornment } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

const newRateState = {
    productCategory: { 'id': 1 },
    initialVolume: '',
    bid: '',
    maturity: '',
    name: '',
    offer: '',
    dealersRateBid: '',
    dealersRateOffer: '',
};

const NumberFormatCustom = props => {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            prefix="₦"
        />
    );
}

const NumberFormatCustomRate = props => {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            // thousandSeparator
            suffix="%"
        />
    );
}


NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class TbillsProductsDialog extends Component {

    state = { ...newRateState };

    componentDidUpdate(prevProps, prevState) {
        /**
         * After Dialog Open
         */
        if (!prevProps.tbillsDialog.props.open && this.props.tbillsDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.tbillsDialog.type === 'edit' &&
                this.props.tbillsDialog.data &&
                !_.isEqual(this.props.tbillsDialog.data, prevState)) {
                this.setState({ ...this.props.tbillsDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.tbillsDialog.type === 'new' &&
                !_.isEqual(newRateState, prevState)) {
                this.setState({ ...newRateState });
            }
        }
    }

    // handleChange = (event) => {
    //     this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    // };

    closeComposeDialog = () => {
        this.props.tbillsDialog.type === 'edit' ? this.props.closeEditTbillsDialog() : this.props.closeNewTbillsDialog();
    };

    canBeSubmitted() {
        const { initialVolume, bid, maturity, name, offer, dealersRateOffer, dealersRateBid } = this.state;
        return (
            initialVolume !== '' && bid !== '' && maturity !== '' && offer !== '' && name !== '' && dealersRateOffer !== '' && dealersRateBid !== ''
        );
    }

    // handleChange = name => event => {
    //     this.setState({
    //         [name]: event.target.value
    //     });
    // };

    handleChange = name => event => {

        if (name === 'initialVolume' || name === 'bid' || name === 'offer' || name === 'dealersRateBid' || name === 'dealersRateOffer') {
            this.setState({
                [name]: Math.abs(event.target.value)
            });
        } else {
            this.setState({
                [name]: event.target.value
            });
        }
    };

    render() {
        const { tbillsDialog, saveTbillsProduct, updateTbills } = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...tbillsDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {tbillsDialog.type === 'new' ? 'New Treasury Bills' : 'Edit Treasury Bills'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {tbillsDialog.type === 'new' ? (
                        <div>

                            <div className="flex">
                                <TextField
                                    label="Amount On Offer"
                                    value={this.state.initialVolume}
                                    name="initialVolume"
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("initialVolume")}
                                    id="formatted-initialVolume-input"
                                    fullWidth
                                    className="mb-24"
                                    variant="outlined"
                                    autoFocus
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        inputProps: { min: 0, max: 10 }
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Product Code"
                                    type="text"
                                    id="outlined-adornment-name"
                                    name="name"
                                    value={this.state.name}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("name")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Bid"
                                    // type="number"
                                    id="outlined-adornment-bid"
                                    name="bid"
                                    value={this.state.bid}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("bid")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustomRate,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Offer"
                                    // type="number"
                                    id="outlined-adornment-offer"
                                    name="tdOffer"
                                    value={this.state.offer}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("offer")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustomRate,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Dealers Rate (Bid)"
                                    id="outlined-adornment-dealersRateBid"
                                    name="dealersRateBid"
                                    value={this.state.dealersRateBid}
                                    onChange={this.handleChange("dealersRateBid")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustomRate,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Dealers Rate (Offer)"
                                    id="outlined-adornment-dealersRateOffer"
                                    name="dealersRateOffer"
                                    value={this.state.dealersRateOffer}
                                    onChange={this.handleChange("dealersRateOffer")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustomRate,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Maturity"
                                    type="date"
                                    id="outlined-adornment-maturity"
                                    name="maturity"
                                    value={this.state.maturity}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("maturity")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Maturity</InputAdornment>,
                                    }}
                                />
                            </div>
                        </div>

                    ) : (

                            <div>

                                <div className="flex">
                                    <TextField
                                        label="Amount On Offer"
                                        value={this.state.initialVolume}
                                        name="initialVolume"
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("initialVolume")}
                                        id="formatted-initialVolume-input"
                                        fullWidth
                                        className="mb-24"
                                        variant="outlined"
                                        autoFocus
                                        InputProps={{
                                            inputComponent: NumberFormatCustom
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Product Code"
                                        type="text"
                                        id="outlined-adornment-name"
                                        name="name"
                                        value={this.state.name}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("name")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                </div>


                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Bid"
                                        // type="number"
                                        id="outlined-adornment-bid"
                                        name="bid"
                                        value={this.state.bid}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("bid")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustomRate,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Offer"
                                        // type="number"
                                        id="outlined-adornment-offer"
                                        name="tdOffer"
                                        value={this.state.offer}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("offer")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustomRate,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Dealers Rate (Bid)"
                                        id="outlined-adornment-dealersRateBid"
                                        name="dealersRateBid"
                                        value={this.state.dealersRateBid}
                                        onChange={this.handleChange("dealersRateBid")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustomRate,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Dealers Rate (Offer)"
                                        id="outlined-adornment-dealersRateOffer"
                                        name="dealersRateOffer"
                                        value={this.state.dealersRateOffer}
                                        onChange={this.handleChange("dealersRateOffer")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustomRate,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Maturity"
                                        type="date"
                                        id="outlined-adornment-maturity"
                                        name="maturity"
                                        value={moment(this.state.maturity).format('YYYY-MM-DD')}
                                        // value={this.state.maturity}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("maturity")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Maturity</InputAdornment>,
                                        }}
                                    />
                                </div>
                            </div>
                        )}


                </DialogContent>

                {tbillsDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                saveTbillsProduct(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
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
                                    updateTbills(this.state);
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
                    )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeNewTbillsDialog: Actions.closeNewTbillsDialog,
        closeEditTbillsDialog: Actions.closeEditTbillsDialog,
        saveTbillsProduct: Actions.saveTbillsProduct,
        updateTbills: Actions.updateTbills,
    }, dispatch);
}

function mapStateToProps({ pendingProductsApp }) {
    return {
        tbillsDialog: pendingProductsApp.tbills.tbillsDialog,
        tbillsProduct: pendingProductsApp.tbills.tbillsProduct
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TbillsProductsDialog);
