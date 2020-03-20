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

const newProductCategoryState = {
    thresholdDown: '',
    thresholdUp: '',
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


NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};
class ProductCategoryDialog extends Component {

    state = { ...newProductCategoryState };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.productCategoryDialog.props.open && this.props.productCategoryDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.productCategoryDialog.type === 'edit' &&
                this.props.productCategoryDialog.data &&
                !_.isEqual(this.props.productCategoryDialog.data, prevState)) {
                this.setState({ ...this.props.productCategoryDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.productCategoryDialog.type === 'new' &&
                !_.isEqual(newProductCategoryState, prevState)) {
                this.setState({ ...newProductCategoryState });
            }
        }
    }

    // handleChange = (event) => {
    //     this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    // };

    closeComposeDialog = () => {
        this.props.productCategoryDialog.type === 'edit' ? this.props.closeEditProductCategoryDialog() : this.props.closeNewBondsDialog();
    };

    canBeSubmitted() {
        const { initialVolume, totalVolume, couponRate, yieldRate, cleanPrice, name, buyCleanPrice, maturity } = this.state;
        return (
            initialVolume !== null && totalVolume !== null && couponRate !== null && 
            yieldRate !== null && cleanPrice !== null && name !== null && buyCleanPrice !== null && maturity !== null
        );
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    render() {
        const { productCategoryDialog, saveBondsProduct, bondsProduct, updateProductCategory, classes, disableRate } = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...productCategoryDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {productCategoryDialog.type === 'new' ? 'New Product' : 'Edit Product'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    {productCategoryDialog.type === 'new' ? (
                        <div>
                            <div className="flex">
                                <TextField
                                    className="mb-24"
                                    label="Initial Volume"
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
                                    label="Total Volume"
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
                        </div>
                    ) : (
                            <div>
                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Threshold Down"
                                        autoFocus
                                        id="outlined-adornment-thresholdDown"
                                        name="thresholdDown"
                                        value={this.state.thresholdDown}
                                        onChange={this.handleChange("thresholdDown")}
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
                                        label="Threshold Up"
                                        id="outlined-adornment-thresholdUp"
                                        name="thresholdUp"
                                        value={this.state.thresholdUp}
                                        onChange={this.handleChange("thresholdUp")}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                </DialogContent>

                {productCategoryDialog.type === 'new' ? (
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
                                    updateProductCategory(this.state);
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
        closeEditProductCategoryDialog: Actions.closeEditProductCategoryDialog,
        updateProductCategory: Actions.updateProductCategory,
    }, dispatch);
}

function mapStateToProps({ productCategoryApp }) {
    return {
        productCategoryDialog: productCategoryApp.productCategories.productCategoryDialog,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryDialog);
