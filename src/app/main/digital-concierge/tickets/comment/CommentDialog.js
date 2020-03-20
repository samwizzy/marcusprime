import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import _ from 'lodash';

class CommentDialog extends Component {

    state = {
        composeDialog: false,
        from         : 'johndoe@creapond.com',
        to           : '',
        cc           : '',
        bcc          : '',
        subject      : '',
        message      : ''
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    render()
    {
        return (
            <div className="p-24">

                <Button
                    variant="contained"
                    color="primary"
                    className="w-full"
                    onClick={this.openComposeDialog}
                >
                    COMPOSE
                </Button>

                <Dialog
                    open={this.state.composeDialog}
                    onClose={this.closeComposeDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                New Message
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                        <TextField
                            className="mt-8 mb-16"
                            label="From"
                            id="from"
                            name="from"
                            value={this.state.from}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            disabled
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="To"
                            autoFocus
                            id="to"
                            name="to"
                            value={this.state.to}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Cc"
                            id="cc"
                            name="cc"
                            value={this.state.cc}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Bcc"
                            id="bcc"
                            name="bcc"
                            value={this.state.bcc}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            label="Subject"
                            id="subject"
                            name="subject"
                            value={this.state.subject}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />

                        <TextField
                            className="mt-8 mb-16"
                            id="message"
                            name="message"
                            onChange={this.handleChange}
                            label="Message"
                            type="text"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </DialogContent>

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button variant="contained" color="primary" onClick={this.closeComposeDialog}>
                                Send
                            </Button>
                            <IconButton>
                                <Icon>attach_file</Icon>
                            </IconButton>
                        </div>
                        <IconButton onClick={this.closeComposeDialog}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CommentDialog;
