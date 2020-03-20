import React, {Component} from 'react';
import { FuseChipSelect } from '../../../../../@fuse';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../store/actions' 
import { withStyles, TextField, Input, InputLabel, Select, MenuItem, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import _ from 'lodash';

const styles = theme => ({
    root: {
      display: 'flex',
      color: green[600],
      '&$checked': {
        color: green[500],
      },
    },
    checked: {},
    formControl: {
        margin: theme.spacing.unit,
        display: 'flex'
    },
    group: {
        margin: theme.spacing[1, 0],
    },
});

class TicketsDialog extends Component {

    state = {
        form: {
            ticketId: this.props.ticket.id,
            comment: {
                comment: '',
                adminUserId: this.props.user.adUserID
            },
            dept: {id: ''}
        }

    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.ticket !== prevProps.ticket){
            const { id, comments, dept } = this.props.ticket
            this.setState({form: {...this.state.form, ticketId: id, dept: {id: dept.id}} })
        }/* else if(this.props.department !== prevProps.department){
            const { id, name } = this.props.department
            this.setState({form: {...this.state.form, dept: { id, name }} })
        } */
    }

    canBeSubmitted(){
        const { comment } = this.state.form;
        return (
            comment.comment.length > 0
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form.comment, event.target.name, event.target.value));
        console.log(this.state.form, "Form Change")
    };

    handleChipChange = event => {
        const { name, value } = event.target
        this.setState(_.set(this.state.form, name, { id: value }))
    }

    handleTicketSubmit(form){
        console.log(form, "Form Updated")
        const { mode } = this.props
        mode === "escalate"?
            this.props.escalateTicket(form):
            this.props.commentTicket(form);
        this.props.closeCommentDialog()
    }

    

    render()
    {
        const { classes, commentDialog, closeCommentDialog, departments, ticket, mode } = this.props;
        const { form } = this.state;

        console.log(ticket, "Comment Ticket")
        console.log(form, "Comment form")

        return (
            <div className="p-24">

                <Dialog
                    open={commentDialog}
                    onClose={closeCommentDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {mode === "escalate" ? "Escalate Ticket" : "Comment Ticket"}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    {mode === "escalate" ? 
                    (
                        <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                            <TextField
                                className="mt-8 mb-16"
                                label="Comment"
                                id="comment"
                                name="comment"
                                value={form.comment.comment}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                required
                            />

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="department">Select department</InputLabel>
                                <Select
                                    value={form.dept.id}
                                    onChange={this.handleChipChange}
                                    input={<Input name="dept" id="dept" />}
                                    autoWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        departments && departments.map((department, index) => 
                                        <MenuItem key={index} value={department.id}>{department.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </DialogContent>
                    ):  
                    (
                        <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                            <TextField
                                className="mt-8 mb-16"
                                label="Comment"
                                id="comment"
                                name="comment"
                                value={form.comment.comment}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                required
                            />
                        </DialogContent>
                    )
                    }
                    
                    

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleTicketSubmit(form)}>
                                Save
                            </Button>
                        </div>
                        <IconButton onClick={closeCommentDialog}>
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
        commentTicket: Actions.commentTicket, 
        escalateTicket: Actions.escalateTicket, 
        closeCommentDialog: Actions.closeCommentDialog, 
    }, dispatch);
}

function mapStateToProps({ticketsApp, fuse, auth})
{
    console.log(auth, "I am inside ticket area")
    const { department, tickets } = ticketsApp
    return {
        mainTheme : fuse.settings.mainTheme,
        user: auth.user.data,
        departments: department.data,
        department: department.department,
        ticket : tickets.ticket,
        commentDialog : tickets.commentDialog,
        mode: tickets.mode,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TicketsDialog));
