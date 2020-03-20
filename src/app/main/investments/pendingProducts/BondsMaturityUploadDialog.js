import React, { Component } from 'react';
import { Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { connect } from 'react-redux';
import CsvParse from '@vtex/react-csv-parse'
import _ from 'lodash';

const newRateState = {
    data: null,
    error: null,
};


class BondsMaturityUploadDialog extends Component {

    state = { ...newRateState };

    componentDidUpdate(prevProps, prevState) {
        /**
         * After Dialog Open
         */
        if (!prevProps.bondsMaturity.props.open && this.props.bondsMaturity.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.bondsMaturity.type === 'edit' &&
                this.props.bondsMaturity.data &&
                !_.isEqual(this.props.bondsMaturity.data, prevState)) {
                this.setState({ ...this.props.bondsMaturity.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.bondsMaturity.type === 'new' &&
                !_.isEqual(newRateState, prevState)) {
                this.setState({ ...newRateState });
            }
        }
    }

    closeComposeDialog = () => {
        this.props.bondsMaturity.type === 'edit' ? this.props.closeEditBondsMaturityUpload() : this.props.closeNewBondsMaturityUpload();
    };


    // handleForce = data => {
    //     // const d = data.length;
    //     const d = data;
    //     console.log(d);

    //     const newArr = [];

    //     d.map(id => {

    //         const newObj = {
    //             initialVolume: id[1],
    //             maturity: id[2],
    //             couponRate: id[3],
    //             yieldRate: id[4],
    //             cleanPrice: id[5],
    //             totalVolume: id[6],
    //             status: id[7]
    //         };

    //         newArr.push(newObj);
    //     });

    //     console.log(newArr, "newArr");

    //     newArr.map(cc => {
    //         console.log(cc, 'ccccccccccc');
    //     })
    // };

    handleData = data => {
        this.setState({ data })

        if(this.props.bondsMaturity.type === 'new'){
            data.map(id => {
                this.props.saveBondsProduct(id);
            })

        } else {

            data.map(id => {
                this.props.updateBonds(id);
            })
        }
    }

    handleError = error => {
        console.log(error, 'csv error')
        this.setState({ error })
    }


    render() {
        const { bondsMaturity } = this.props;

        const keys = [
            'id',
            'name',
            'initialVolume',
            'maturity',
            'couponRate',
            'yieldRate',
            'bid',
            'offer',
            'dealersRateBid',
            'dealersRateOffer',
            'productId',
        ];


        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...bondsMaturity.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {bondsMaturity.type === 'new' ? 'Bonds Upload File' : 'Bonds Re-Upload File'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    <div>
                        <div className="flex">

                            <CsvParse
                                keys={keys}
                                onDataUploaded={this.handleData}
                                onError={this.handleError}
                                render={onChange => <input type="file" accept=".csv" onChange={onChange} />}
                            />

                            {/* {this.state.data && (
                                    <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                                )}

                                {this.state.error && (
                                    <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
                                )} */}

                            {/* <CSVReader
                                    cssClass="react-csv-input"
                                    label="Select CSV with secret Death Star statistics"
                                    onFileLoaded={this.handleForce}
                                /> */}

                        </div>
                    </div>
                </DialogContent>

                <DialogActions className="justify-between pl-16">
                    <IconButton
                        onClick={() => {
                            this.closeComposeDialog();
                        }}
                    >
                        <Icon>clear</Icon>
                    </IconButton>
                </DialogActions>
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

        closeNewBondsMaturityUpload: Actions.closeNewBondsMaturityUpload,
        closeEditBondsMaturityUpload: Actions.closeEditBondsMaturityUpload,
    }, dispatch);
}

function mapStateToProps({ pendingProductsApp }) {
    return {
        bondsDialog: pendingProductsApp.bonds.bondsDialog,
        bondsMaturity: pendingProductsApp.bonds.bondsMaturity,
        bondsProduct: pendingProductsApp.bonds.bondsProduct,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BondsMaturityUploadDialog);
