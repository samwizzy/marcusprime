import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from 'lodash';

const newContactState = {
    id      : '',
    name    : '',
    notes   : '',
    description   : ''
};

class ProductCategoriesDialog extends Component {

    state = {...newContactState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.contactDialog.props.open && this.props.contactDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.contactDialog.type === 'edit' &&
                this.props.contactDialog.data &&
                !_.isEqual(this.props.contactDialog.data, prevState) )
            {
                this.setState({...this.props.contactDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.contactDialog.type === 'new' &&
                !_.isEqual(newContactState, prevState) )
            {
                this.setState({...newContactState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.contactDialog.type === 'edit' ? this.props.closeEditContactDialog() : this.props.closeNewContactDialog();
    };

    canBeSubmitted()
    {
        const {name} = this.state;
        return (
            name.length > 0
        );
    }

    render()
    {
        const {contactDialog, addContact, updateProductCategories} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...contactDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">web_asset</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Name"
                            autoFocus
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                </DialogContent>

                {contactDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addContact(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateProductCategories(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeEditContactDialog: Actions.closeEditContactDialog,
        closeNewContactDialog : Actions.closeNewContactDialog,
        addContact            : Actions.addContact,
        updateProductCategories : Actions.updateProductCategories,
        removeContact         : Actions.removeContact
    }, dispatch);
}

function mapStateToProps({productCategoriesApp})
{
    return {
        contactDialog: productCategoriesApp.productCategories.contactDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesDialog);
