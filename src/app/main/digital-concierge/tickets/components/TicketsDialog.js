import React, {Component} from 'react';
import { FuseChipSelect } from '../../../../../@fuse';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../store/actions'
import { withStyles, TextField, FormControl, Input, InputLabel, MenuItem, Select, FormLabel, FormControlLabel, Radio, RadioGroup, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import _ from 'lodash';

const severity = [
    {code: 0, name: 'Low'},
    {code: 1, name: 'Normal'},
    {code: 2, name: 'High'},
    {code: 3, name: 'Urgent'}
];

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
        display: 'flex',
        minWidth: 360
    },
    group: {
        margin: theme.spacing[1, 0],
    },
});

const initialState = {
    requestName: '',
    description: '',
    dept: {id: '', name: ''},
    status: ''
}

class TicketsDialog extends Component {

    state = {
        form: {
            requestName: '',
            description: '',
            severity: 0,
            dept: {id: '', name: ''},
            status: ''
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.ticket !== prevProps.ticket){
            this.setState({ form: this.props.ticket })
        }
    }

    canBeSubmitted(){
        const {requestName, dept, description} = this.state.form;
        return (
            requestName.length > 0 && description.length > 0
        );
    }

    handleChange = (event) => {
        this.setState(_.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
        console.log(this.state.form, "Form Change")
    };

    handleChipChange = event => {
        const { name, value } = event.target
        this.setState(_.set(this.state.form, name, {id: value}));
    }

    handleTicketSubmit(form){
        console.log(form, "Form Updated")
        const { mode } = this.props
        mode !== "update" ? 
            this.props.createTicket(form) :
            this.props.updateTicketStatus(form);
            
        this.setState({form: initialState})
    }

    render()
    {
        const { classes, composeDialog, closeTicketDialog, departments, ticket, mode } = this.props;
        const { form } = this.state;

        // console.log(departments, "This is me")
        // console.log(ticket, "Ticket")
        // console.log(mode, "Mode hsit")
        console.log(composeDialog, "Compose Dialog")
        console.log(form, "Form form")

        return (
            <div className="p-24">

                <Dialog
                    open={composeDialog}
                    onClose={closeTicketDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <AppBar position="static">
                        <Toolbar className="flex w-full">
                            <Typography variant="subtitle1" color="inherit">
                                {mode !== "update" ? "Create New Ticket" : "Update Ticket"}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    { mode !== "update" ?
                    (
                        <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>

                            <TextField
                                className="mt-8 mb-16"
                                label="Request Name"
                                id="requestName"
                                name="requestName"
                                autoFocus
                                value={form.requestName}
                                onChange={this.handleChange}
                                variant="outlined"
                                fullWidth
                                required
                            />

                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="severity">Select severity</InputLabel>
                                <Select
                                    value={form.severity}
                                    onChange={this.handleChange}
                                    input={<Input name="severity" id="severity" />}
                                    autoWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        severity && severity.map((severe, index) => 
                                        <MenuItem key={index} value={severe.code}>{severe.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>

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
                        </DialogContent>
                    ) :
                    (
                        <DialogContent classes={{root: "p-16 pb-0 sm:p-24 sm:pb-0"}}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Change Status</FormLabel>
                                <RadioGroup
                                aria-label="Status"
                                name="status"
                                className={classes.group}
                                value={`${form.status}`}
                                onChange={this.handleChange}
                                >
                                    <FormControlLabel value="0" control={<Radio />} label="New" />
                                    <FormControlLabel value="1" control={<Radio />} label="In-Progress" />
                                    <FormControlLabel value="2" control={<Radio />} label="Closed" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                    )
                    }

                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <div>
                            <Button type="submit" disabled={!this.canBeSubmitted()} variant="contained" color="primary" onClick={() => this.handleTicketSubmit(form)}>
                                {mode !== "update" ? "Create" : "Update changes"}
                            </Button>
                        </div>
                        <IconButton onClick={closeTicketDialog}>
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
        createTicket      : Actions.createTicket,
        updateTicketStatus: Actions.updateTicketStatus,
        closeTicketDialog: Actions.closeTicketDialog,
    }, dispatch);
}

function mapStateToProps({ticketsApp, fuse})
{
    console.log(ticketsApp, "Ticket Dialoggingg")
    const { department, tickets } = ticketsApp
    return {
        mainTheme : fuse.settings.mainTheme,
        departments: department.data,
        ticket : tickets.ticket,
        composeDialog : tickets.composeDialog,
        mode: tickets.mode,
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TicketsDialog));
