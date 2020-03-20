import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, InputAdornment } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

const newRateState = {
    productCategory: { 'id': 2 },
    initialVolume: '',
    // totalVolume: '',
    couponRate: '',
    yieldRate: '',
    offer: '',
    maturity: '',
    name: '',
    bid: '',
    bookBuyRate: '',
    bookSellRate: '',
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
class BondsProductsDialog extends Component {

    state = { ...newRateState };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.bondsDialog.props.open && this.props.bondsDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.bondsDialog.type === 'edit' &&
                this.props.bondsDialog.data &&
                !_.isEqual(this.props.bondsDialog.data, prevState)) {
                this.setState({ ...this.props.bondsDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.bondsDialog.type === 'new' &&
                !_.isEqual(newRateState, prevState)) {
                this.setState({ ...newRateState });
            }
        }
    }

    // handleChange = (event) => {
    //     this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    // };

    closeComposeDialog = () => {
        this.props.bondsDialog.type === 'edit' ? this.props.closeEditBondsDialog() : this.props.closeNewBondsDialog();
    };

    canBeSubmitted() {
        const { initialVolume, totalVolume, couponRate, yieldRate, name, buyCleanPrice, maturity, cleanPrice, bookSellRate, bookBuyRate } = this.state;
        return (
            initialVolume !== null && totalVolume !== null && couponRate !== null &&
            yieldRate !== null && name !== null && buyCleanPrice !== null && maturity !== null && cleanPrice !== null && bookSellRate !== '' && bookBuyRate !== ''
        );
    }

    handleChange = name => event => {
        if (name === 'initialVolume' || name === 'totalVolume' || name === 'yieldRate' || name === 'couponRate' || name === 'buyCleanPrice' || name === 'cleanPrice' || name === 'bookBuyRate' || name === 'bookSellRate') {
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
        const { bondsDialog, saveBondsProduct, bondsProduct, updateBonds, classes, disableRate } = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...bondsDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {bondsDialog.type === 'new' ? 'New Bonds' : 'Edit Bonds'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {bondsDialog.type === 'new' ? (
                        <div>
                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Amount On Offer"
                                    autoFocus
                                    // type="number"
                                    id="outlined-adornment-initialVolume"
                                    name="initialVolume"
                                    value={this.state.initialVolume}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("initialVolume")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Balance"
                                    // type="number"
                                    id="outlined-adornment-totalVolume"
                                    name="totalVolume"
                                    value={this.state.totalVolume}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("totalVolume")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
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
                                    // error={this.state.initialVolume}
                                    className="mb-24"
                                    label="Buy Clean Price"
                                    // type="number"
                                    id="outlined-adornment-buyCleanPrice"
                                    name="buyCleanPrice"
                                    value={this.state.buyCleanPrice}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("buyCleanPrice")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Coupon Rate"
                                    // type="number"
                                    id="outlined-adornment-couponRate"
                                    name="couponRate"
                                    value={this.state.couponRate}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("couponRate")}
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
                                    label="Yield Rate"
                                    // type="number"
                                    id="outlined-adornment-yieldRate"
                                    name="yieldRate"
                                    value={this.state.yieldRate}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("yieldRate")}
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
                                    label="Clean Price"
                                    // type="number"
                                    id="outlined-adornment-cleanPrice"
                                    name="cleanPrice"
                                    value={this.state.cleanPrice}
                                    // onChange={this.handleChange}
                                    onChange={this.handleChange("cleanPrice")}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
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
                                        // inputComponent: NumberFormatCustom,
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                            <div>
                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Amount On Offer"
                                        autoFocus
                                        // type="number"
                                        id="outlined-adornment-initialVolume"
                                        name="initialVolume"
                                        value={this.state.initialVolume}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("initialVolume")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>

                                {/* <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Balance"
                                        // type="number"
                                        id="outlined-adornment-totalVolume"
                                        name="totalVolume"
                                        value={this.state.totalVolume}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("totalVolume")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div> */}

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
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        // error={this.state.initialVolume}
                                        className="mb-24"
                                        label="Offer"
                                        // type="number"
                                        id="outlined-adornment-offer"
                                        name="offer"
                                        value={this.state.offer}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("offer")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Dealers Rate (Bid)"
                                        id="outlined-adornment-bookBuyRate"
                                        name="bookBuyRate"
                                        value={this.state.bookBuyRate}
                                        onChange={this.handleChange("bookBuyRate")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Dealers Rate (Offer)"
                                        id="outlined-adornment-bookSellRate"
                                        name="bookSellRate"
                                        value={this.state.bookSellRate}
                                        onChange={this.handleChange("bookSellRate")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Coupon Rate"
                                        // type="number"
                                        id="outlined-adornment-couponRate"
                                        name="couponRate"
                                        value={this.state.couponRate}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("couponRate")}
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
                                        label="Yield Rate"
                                        // type="number"
                                        id="outlined-adornment-yieldRate"
                                        name="yieldRate"
                                        value={this.state.yieldRate}
                                        // onChange={this.handleChange}
                                        onChange={this.handleChange("yieldRate")}
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
                                            // inputComponent: NumberFormatCustom,
                                            startAdornment: <InputAdornment position="start">Maturity</InputAdornment>,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                </DialogContent>

                {bondsDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                saveBondsProduct(this.state);
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
                                    updateBonds(this.state);
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
        closeNewBondsDialog: Actions.closeNewBondsDialog,
        closeEditBondsDialog: Actions.closeEditBondsDialog,
        saveBondsProduct: Actions.saveBondsProduct,
        updateBonds: Actions.updateBonds,
    }, dispatch);
}

function mapStateToProps({ bondsApp }) {
    return {
        bondsDialog: bondsApp.bonds.bondsDialog,
        bondsProduct: bondsApp.bonds.bondsProduct,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BondsProductsDialog);
