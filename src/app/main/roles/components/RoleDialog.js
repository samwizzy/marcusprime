import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../store/actions' 
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

class RoleDialog extends Component {

    state = {
        form: {
            name: '',
            description: '',
            updatedBy: null,
            addedBy: null,
            createdBy: null,
            createdAt: null,
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
        const { mode } = this.props
        mode === "new"?
        this.props.addRole(form) :
        this.props.updateRole(form);
        this.props.closeComposeDialog()
    }

    render()
    {
        const { composeDialog, closeComposeDialog, mode } = this.props;
        const { form } = this.state;
        console.log(form, "State Form Coming in")
        console.log(this.props.form, "Props Form Coming in")

        return (
            <div className="p-24">

                <Dialog
                    disableRestoreFocus={true}
                    open={composeDialog}
                    onClose={closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {mode === "new" ? "New Role" : "Update Role"}
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
        updateRole: Actions.updateRole,
        addRole: Actions.addRole,
    }, dispatch);
}

function mapStateToProps({rolesApp, fuse})
{
    console.log(rolesApp, "Tired of this shit")
    const { roles, role } = rolesApp;
    return {
        mainTheme : fuse.settings.mainTheme,
        roles: roles.data,
        mode: role.mode,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleDialog);
