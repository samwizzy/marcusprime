import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../store/actions' 
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

class TncDialog extends Component {

    state = {
        form: {
            name: '',
            description: ''
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.form && prevProps.form !== this.props.form){
            this.setState({ form: this.props.form })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.type !== "new"
    }

    canBeSubmitted(){
        const {name, description} = this.state.form;
        return (
            name.length > 0 && description.length > 0
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        console.log(this.state.form, "Form Change")
    };

    handleUpdateRole(form){
    }

    render()
    {
        const { composeDialog, closeComposeDialog } = this.props;
        const { form } = this.state

        return (
            <div className="p-24">

                <Dialog
                    open={composeDialog}
                    onClose={closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                Create Tnc
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="Name"
                            id="name"
                            name="name"
                            autoFocus
                            value={form.name}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Description"
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            required
                        />

                        <div className="pt-8">
                           
                        </div>
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleUpdateRole(form)}>
                                Send
                            </Button>
                            
                        </div>
                        <IconButton onClick={() => closeComposeDialog()}>
                            <Icon>close</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({tncApp, fuse})
{
    return {
        mainTheme : fuse.settings.mainTheme,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TncDialog);
