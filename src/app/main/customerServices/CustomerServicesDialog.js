import React, { Component } from 'react';
import { withStyles, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar, InputAdornment } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import { connect } from 'react-redux';
import _ from 'lodash';

const styles = theme => ({

    noSuggestions: {
        color: '#999',
        padding: '0.5rem',
    },
    suggestions: {
        color: '#999',
    }
});

const newRMState = {
    adminId: '',
    email: '',
    available: true,
};

class CustomerServicesDialog extends Component {

    state = {
        ...newRMState,
        // The active selection's index
        activeSuggestion: 0,
        // The suggestions that match the user's input
        filteredSuggestions: [],
        // Whether or not the suggestion list is shown
        showSuggestions: false,
    };

    componentDidMount() {
        const { getAllAdmins } = this.props;

        getAllAdmins();
    }


    componentDidUpdate(prevProps, prevState) {
        /**
         * After Dialog Open
         */
        if (!prevProps.rmDialog.props.open && this.props.rmDialog.props.open) {

            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.rmDialog.type === 'edit' &&
                this.props.rmDialog.data &&
                !_.isEqual(this.props.rmDialog.data, prevState)) {
                // let form = {};
                // _.setWith(form, 'id', this.props.rmDialog.data[0], Object);
                // _.setWith(form, 'initialVolume', this.props.rmDialog.data[1], Object);
                // _.setWith(form, 'totalVolume', this.props.rmDialog.data[2], Object);
                // _.setWith(form, 'couponRate', this.props.rmDialog.data[3], Object);
                // _.setWith(form, 'yieldRate', this.props.rmDialog.data[4], Object);
                // _.setWith(form, 'cleanPrice', this.props.rmDialog.data[5], Object);
                // _.setWith(form, 'maturity', this.props.rmDialog.data[6], Object);

                this.setState({ ...this.props.rmDialog.data });
                // this.setState({ ...form });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.rmDialog.type === 'new' &&
                !_.isEqual(newRMState, prevState)) {
                this.setState({ ...newRMState });
            }
        }
    }

    handleChange = (event) => {
        
        const { allAdmins } = this.props;
        const adminId = event.currentTarget.value;

        const filteredSuggestions = allAdmins.filter(
            suggestion =>
                suggestion.email.toLowerCase().indexOf(adminId.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            email: event.currentTarget.value
        });
    };

    handleClick = event => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            adminId: event.target.dataset.aduserid,
            email: event.target.dataset.email
        });
    };
    

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                email: filteredSuggestions[activeSuggestion]
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

    closeComposeDialog = () => {
        this.props.rmDialog.type === 'edit' ? this.props.closeEditRmDialog() : this.props.closeNewRmDialog();
    };

    canBeSubmitted() {
        const { initialVolume, totalVolume, rate, maturity } = this.state;
        return (
            initialVolume !== null && totalVolume !== null && rate !== null && maturity !== null
        );
    }

    render() {
        const { rmDialog, saveRM, updateRM, disableRM, classes } = this.props;

        const { activeSuggestion, filteredSuggestions, showSuggestions, email } = this.state;

        let suggestionsListComponent;

        if (showSuggestions && email) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className={classes.suggestions}>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li 
                                className={className} 
                                key={suggestion.adUserID} 
                                data-email={suggestion.email} 
                                data-aduserid={suggestion.adUserID} 
                                onClick={this.handleClick}
                                >
                                    {suggestion.email}
                                </li>

                                /*<ListItem key={suggestion.adUserID} onClick={this.handleClick}>
                                    <ListItemText data-id={suggestion.adUserID} primary={suggestion.email} />
                                </ListItem>*/
                                
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className={classes.noSuggestions}>
                        <em>No suggestions, you're on your own!</em>
                    </div>
                );
            }
        }

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...rmDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="sm"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {rmDialog.type === 'new' ? 'New Relation Manager' : 'Edit Relation Manager'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-24" }}>

                    <div className="flex">
                        <TextField
                            autoFocus
                            className={classes.addButton}
                            // className="mb-24"
                            onChange={this.handleChange}
                            onKeyDown={this.onKeyDown}
                            value={this.state.email}
                            variant="outlined"
                            required
                            fullWidth
                            type="text"
                        />
                    </div>

                    {suggestionsListComponent}

                    {/* <Autocomplete
                        suggestions={allAdmins}
                    /> */}

                </DialogContent>

                {rmDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                saveRM(this.state);
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
                                    updateRM(this.state);
                                    this.closeComposeDialog();
                                }}
                                disabled={!this.canBeSubmitted()}
                            >
                                Save
                        </Button>
                            <IconButton
                                onClick={() => {
                                    disableRM(this.state.id);
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
        closeNewRmDialog: Actions.closeNewRmDialog,
        closeEditRmDialog: Actions.closeEditRmDialog,
        saveRM: Actions.saveRM,
        updateRM: Actions.updateRM,
        disableRM: Actions.disableRM,
        getAllAdmins: Actions.getAllAdmins,
    }, dispatch);
}

function mapStateToProps({ customerServicesApp }) {
    return {
        rmDialog: customerServicesApp.customerServices.rmDialog,
        allAdmins: customerServicesApp.customerServices.allAdmins,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CustomerServicesDialog));
