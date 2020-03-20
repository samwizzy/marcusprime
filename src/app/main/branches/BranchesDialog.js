import React, { Component } from 'react';
import { withStyles, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
// import Branches from './components/Branches';
// import Bsm from './components/Bsm';

const styles = theme => ({

    noSuggestions: {
        color: '#999',
        padding: '0.5rem',
    },
    suggestions: {
        color: '#999',
        // border: '1px solid #999',
        // borderTopWidth: 0,
        // spacing: value => value ** 2,
        // list-style: none,
        // margin - top: 0;
        // max - height: 143px;
        // overflow - y: auto;
        // padding-left: 0;
        // width: calc(300px + 1rem);
    }

    //   suggestions li {
    //     padding: 0.5rem;
    //   }

    //   suggestion-active,
    //   suggestions li:hover {
    //     background-color: #008f68;
    //     color: #fae042;
    //     cursor: pointer;
    //     font-weight: 700;
    //   }

    //   suggestions li:not(:last-of-type) {
    //     border-bottom: 1px solid #999;
    //   }

});

const newBranchState = {
    code: '',
    name: '',
    address: '',
    city: '',
    state: '',
    bsmId: '',
    htnId: '',
    // bsm: {adUserID: '', email: ''},
    // htn: {adUserID: '', email: ''},
};

const autoCompleteSate = {
    // The active selection's index
    activeSuggestionBranch: 0,
    // The active selection's index
    activeSuggestionBsm: 0,
    // The active selection's index
    activeSuggestionHt: 0,

    // The suggestions that match the user's input
    filteredSuggestionsBranch: [],
    // The suggestions that match the user's input
    filteredSuggestionsBsm: [],
    // The suggestions that match the user's input
    filteredSuggestionsHt: [],

    // Whether or not the suggestion list is shown
    showSuggestionsBranch: false,
    // Whether or not the suggestion list is shown
    showSuggestionsBsm: false,
    // Whether or not the suggestion list is shown
    showSuggestionsHt: false,
};

class BranchesDialog extends Component {

    state = {
        ...newBranchState,
        ...autoCompleteSate,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.rateDialog.props.open && this.props.rateDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.rateDialog.type === 'edit' &&
                this.props.rateDialog.data &&
                !_.isEqual(this.props.rateDialog.data, prevState)) {
                // console.log(this.props.rateDialog.data, 'this.props.rateDialog.data')
                this.setState({ ...this.props.rateDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.rateDialog.type === 'new' &&
                !_.isEqual(newBranchState, prevState)) {
                this.setState({ ...newBranchState });
            }
        }
    }

    handleChangeBranch = (event) => {

        const { allUBNBranches } = this.props;
        const branch = event.currentTarget.value;

        const filteredSuggestionsBranch = allUBNBranches.filter(
            suggestion =>
                suggestion.name.toLowerCase().indexOf(branch.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestionBranch: 0,
            filteredSuggestionsBranch,
            showSuggestionsBranch: true,
            name: event.currentTarget.value
        });
    };

    handleChangeBsm = (event) => {

        const { allAdmins } = this.props;
        const bsm = event.currentTarget.value;

        const filteredSuggestionsBsm = allAdmins.filter(
            suggestion =>
                suggestion.email.toLowerCase().indexOf(bsm.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestionBsm: 0,
            filteredSuggestionsBsm,
            showSuggestionsBsm: true,
            // bsm: {email: event.currentTarget.value }
            bsmId: event.currentTarget.value
        });
    };

    handleChangeHt = (event) => {

        const { allAdmins } = this.props;
        const ht = event.currentTarget.value;

        const filteredSuggestionsHt = allAdmins.filter(
            suggestion =>
                suggestion.email.toLowerCase().indexOf(ht.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestionHt: 0,
            filteredSuggestionsHt,
            showSuggestionsHt: true,
            // htn: {email: event.currentTarget.value }
            htnId: event.currentTarget.value
        });
    };


    handleClickBranch = event => {
        console.log(event.target.dataset.code, 'event.target.dataset.code')
        console.log(event.target.dataset, 'event.target.dataset')
        // console.log(event.target.dataset.email, 'event.target.dataset.email')
        this.setState({
            activeSuggestionBranch: 0,
            filteredSuggestionsBranch: [],
            showSuggestionsBranch: false,
            code: event.target.dataset.code,
            name: event.target.dataset.name,
            address: event.target.dataset.address,
            city: event.target.dataset.city,
            state: event.target.dataset.state,
        });
    };

    handleClickBsm = event => {
        this.setState({
            activeSuggestionBsm: 0,
            filteredSuggestionsBsm: [],
            showSuggestionsBsm: false,
            // bsm: { 
            //     adUserID: event.target.dataset.bsm, 
            //     email:  event.target.dataset.email
            // }
            bsmId: event.target.dataset.bsm
        });
    };

    handleClickHt = event => {
        this.setState({
            activeSuggestionHt: 0,
            filteredSuggestionsHt: [],
            showSuggestionsHt: false,
            // htn: { 
            //     adUserID: event.target.dataset.ht, 
            //     email:  event.target.dataset.email 
            // }
            htnId: event.target.dataset.ht
        });
    };


    onKeyDownBranch = e => {
        const { activeSuggestionBranch, filteredSuggestionsBranch } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                name: filteredSuggestionsBranch[activeSuggestionBranch]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestionBranch === 0) {
                return;
            }

            this.setState({ activeSuggestionBranch: activeSuggestionBranch - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestionBranch - 1 === filteredSuggestionsBranch.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestionBranch + 1 });
        }
    };

    onKeyDownBsm = e => {
        const { activeSuggestionBsm, filteredSuggestionsBsm } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestionBsm: 0,
                showSuggestionsBsm: false,
                // bsm: { email: filteredSuggestionsBsm[activeSuggestionBsm]}
                bsmId: filteredSuggestionsBsm[activeSuggestionBsm]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestionBsm === 0) {
                return;
            }

            this.setState({ activeSuggestionBsm: activeSuggestionBsm - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestionBsm - 1 === filteredSuggestionsBsm.length) {
                return;
            }

            this.setState({ activeSuggestionBsm: activeSuggestionBsm + 1 });
        }
    };

    onKeyDownHt = e => {
        const { activeSuggestionHt, filteredSuggestionsHt } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestionHt: 0,
                showSuggestionsHt: false,
                // htn: {email: filteredSuggestionsHt[activeSuggestionHt]}
                htnId: filteredSuggestionsHt[activeSuggestionHt]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestionHt === 0) {
                return;
            }

            this.setState({ activeSuggestionHt: activeSuggestionHt - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestionHt - 1 === filteredSuggestionsHt.length) {
                return;
            }

            this.setState({ activeSuggestionHt: activeSuggestionHt + 1 });
        }
    };


    closeComposeDialog = () => {
        this.props.rateDialog.type === 'edit' ? this.props.closeEditRateDialog() : this.props.closeNewRateDialog();
    };

    canBeSubmitted() {
        const { name, exRate, code } = this.state;

        if (this.props.rateDialog.type === 'new') {
            return (
                name !== null && code !== null
            );
        } else {
            return (
                exRate !== null
            );
        }
    }

    render() {
        const { rateDialog, addRate, updateRate, classes } = this.props;

        const { activeSuggestionBranch, filteredSuggestionsBranch, showSuggestionsBranch, activeSuggestionBsm, filteredSuggestionsBsm, showSuggestionsBsm, activeSuggestionHt, filteredSuggestionsHt, showSuggestionsHt, bsmId, name, htnId } = this.state;

        let suggestionsListComponentHt;
        let suggestionsListComponentBranch;
        let suggestionsListComponentBsm;

        if (showSuggestionsBranch && name) {
            if (filteredSuggestionsBranch.length) {
                suggestionsListComponentBranch = (
                    <ul className={classes.suggestions}>
                        {filteredSuggestionsBranch.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestionBranch) {
                                className = "suggestion-active";
                            }

                            return (

                                <li
                                    className={className}
                                    key={suggestion.code}
                                    data-code={suggestion.code}
                                    data-name={suggestion.name}
                                    data-address={suggestion.address}
                                    data-city={suggestion.city}
                                    data-state={suggestion.state}
                                    onClick={this.handleClickBranch}
                                >
                                    {suggestion.code}-{suggestion.name}
                                </li>

                                /*
                                                                <ListItem key={suggestion.code} onClick={() => this.handleClickBranch(suggestion.name)}>
                                                                    <ListItemText key={suggestion.code} primary={suggestion.name} />
                                                                </ListItem>
                                                                */

                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponentBranch = (
                    <div className={classes.noSuggestions}>
                        <em>No record found</em>
                    </div>
                );
            }
        }


        if (showSuggestionsBsm && bsmId) {
            if (filteredSuggestionsBsm.length) {
                suggestionsListComponentBsm = (
                    <ul className={classes.suggestions}>
                        {filteredSuggestionsBsm.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestionBsm) {
                                className = "suggestion-active";
                            }

                            return (

                                <li
                                    className={className}
                                    key={suggestion.adUserID}
                                    data-bsm={suggestion.adUserID}
                                    onClick={this.handleClickBsm}
                                    data-email={suggestion.email}
                                >
                                    {suggestion.email}
                                </li>

                                /*<ListItem key={suggestion.adUserID} onClick={() => this.handleClickBsm(suggestion.email)}>
                                    <ListItemText primary={suggestion.email} />
                                </ListItem>*/

                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponentBsm = (
                    <div className={classes.noSuggestions}>
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        if (showSuggestionsHt && htnId) {
            if (filteredSuggestionsHt.length) {
                suggestionsListComponentHt = (
                    <ul className={classes.suggestions}>
                        {filteredSuggestionsHt.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestionHt) {
                                className = "suggestion-active";
                            }

                            return (

                                <li
                                    className={className}
                                    key={suggestion.adUserID}
                                    data-ht={suggestion.adUserID}
                                    onClick={this.handleClickHt}
                                    data-email={suggestion.email}
                                >
                                    {suggestion.email}
                                </li>

                                /*
                                <ListItem key={suggestion.adUserID} onClick={() => this.handleClickHt(suggestion.email)}>
                                    <ListItemText primary={suggestion.email} />
                                </ListItem>
                                */

                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponentHt = (
                    <div className={classes.noSuggestions}>
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }


        console.log(this.state, 'this.state')
        // console.log(allAdmins, 'allAdmins')

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...rateDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {rateDialog.type === 'new' ? 'New Branch' : 'Edit Branch'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    <div>
                        <div className="flex">
                            <TextField
                                // className={classes.addButton}
                                className="mb-24"
                                label="Select Branch"
                                onChange={this.handleChangeBranch}
                                onKeyDown={this.onKeyDownBranch}
                                value={this.state.name}
                                variant="outlined"
                                required
                                fullWidth
                                type="text"
                            />
                        </div>

                        {suggestionsListComponentBranch}

                    </div>

                    <div>

                        <div className="flex">
                            <TextField
                                // className={classes.addButton}
                                className="mb-24"
                                label="Select BSM"
                                onChange={this.handleChangeBsm}
                                onKeyDown={this.onKeyDownBsm}
                                value={this.state.bsmId}
                                variant="outlined"
                                required
                                fullWidth
                                type="text"
                            />
                        </div>

                        {suggestionsListComponentBsm}

                    </div>

                    <div>
                        <div className="flex">
                            <TextField
                                // className={classes.addButton}
                                className="mb-24"
                                label="Select Head Teller"
                                onChange={this.handleChangeHt}
                                onKeyDown={this.onKeyDownHt}
                                value={this.state.htnId}
                                variant="outlined"
                                required
                                fullWidth
                                type="text"
                            />
                        </div>

                        {suggestionsListComponentHt}

                    </div>

                </DialogContent>

                {rateDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addRate(this.state);
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
                                    updateRate(this.state);
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
        closeNewRateDialog: Actions.closeNewRateDialog,
        closeEditRateDialog: Actions.closeEditRateDialog,
        addRate: Actions.addRate,
        updateRate: Actions.updateRate,
        // disableRate: Actions.disableRate
    }, dispatch);
}

function mapStateToProps({ branchesApp }) {
    return {
        rateDialog: branchesApp.branch.rateDialog,
        allUBNBranches: branchesApp.branch.allUBNBranches,
        allAdmins: branchesApp.branch.allAdmins,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BranchesDialog));
