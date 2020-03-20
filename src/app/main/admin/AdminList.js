import React from 'react';
import {withStyles, Button, Icon, Typography, TextField } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FusePageSimple} from '../../../@fuse';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import withReducer from '../../../app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import _ from 'lodash';

const initials = [
    {
      value: 'Mr',
      label: 'Mr',
    },
    {
      value: 'Mrs',
      label: 'Mrs',
    },
    {
      value: 'Miss',
      label: 'Miss',
    },
    {
      value: 'Dr',
      label: 'Dr',
    },
];

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    textField: {
        width: '49.1%',
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    selectField: {
        width: '100%',
        marginBottom: theme.spacing.unit,
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class AdminList extends React.Component {

    state = {
        form : null,
        canSubmit: false
    }

    componentDidMount(){
        this.updateAdminForm();
        this.props.getRoles();
    }

    componentWillMount(){
        this.updateAdminForm();
    }

    updateAdminForm(){
        this.setState({form: this.props.form});
    }

    formSubmitted(){
        const { form } = this.state;
        if(form.firstName.length > 0){
            this.setState({canSubmit: true});
        }
    }

    canBeSubmitted(){
        const {name} = this.state.form;
        return (
            name.length > 0 &&
            !_.isEqual(this.props.product.data, this.state.form)
        );
    }

    handleChipChange = (event, name) => {
        this.setState({form: _.set({...this.state.form}, name, event.target.value)});
        console.log(this.state.form);
    };

    handleChange = (event) => {
        this.formSubmitted();
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    render(){
        const { classes, saveAdmin } = this.props;
        const { canSubmit, form } = this.state;
        
        return (
            <FusePageSimple
                header={
                    <div className="flex flex-1 items-center justify-between p-24">
                        <div className="flex flex-col">
                            <div className="flex items-center mb-16">
                                <Icon className="text-18" color="action">home</Icon>
                                <Icon className="text-16" color="action">chevron_right</Icon>
                                <Typography color="textSecondary">Components</Typography>
                                <Icon className="text-16" color="action">chevron_right</Icon>
                                <Typography color="textSecondary">Roles Assignment</Typography>
                            </div>
                            <Typography variant="h6">Create New Admin</Typography>
                        </div>
                    </div>
                }
                content={
                    <div className="p-24 max-w-2xl">

                        <Typography className="mb-16" component="p">
                            <code>Creating an Admin</code> is the super administrator's role.
                        </Typography>

                        <hr/>

                        <Typography className="mt-32 mb-8" variant="h5">Create a New Administration User</Typography>


                            <div className="p-16 sm:p-24 max-w-2xl">
                                <div className={classes.container}>

                                    <TextField
                                        id="initials"
                                        select
                                        label="Initial"
                                        name="initials"
                                        className={classes.textField}
                                        value={form.initials}
                                        onChange={ev => this.handleChipChange(ev, 'initials')}
                                        SelectProps={{
                                        native: true,
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                        }}
                                        variant="outlined"
                                    >
                                        {initials.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                        ))}
                                    </TextField>

                                    <TextField
                                        className={classes.textField}
                                        error={form.firstName === ''}
                                        required
                                        label="Firstname"
                                        autoFocus
                                        id="firstname"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className={classes.textField}
                                        error={form.lastName === ''}
                                        required
                                        label="Lastname"
                                        id="lastname"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className={classes.textField}
                                        error={form.displayName === ''}
                                        required
                                        label="Display Name"
                                        id="display-name"
                                        name="displayName"
                                        value={form.displayName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                    />

                                    <TextField
                                        className={classes.textField}
                                        error={form.mobileNumber === ''}
                                        required
                                        label="Mobile Number"
                                        id="mobile"
                                        name="mobileNumber"
                                        value={form.mobileNumber}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className={classes.textField}
                                        error={form.telephoneNumber === ''}
                                        required
                                        label="Telephone Number"
                                        id="telephone"
                                        name="telephoneNumber"
                                        value={form.telephoneNumber}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className={classes.textField}
                                        error={form.jobTitle === ''}
                                        required
                                        label="Job Title"
                                        id="job-title"
                                        name="jobTitle"
                                        value={form.jobTitle}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className={classes.textField}
                                        error={form.department === ''}
                                        required
                                        label="Department"
                                        id="department"
                                        name="department"
                                        value={form.department}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Admin Email"
                                        required
                                        id="email"
                                        error={form.email === ''}
                                        name="email"
                                        value={form.email}
                                        onChange={this.handleChange}
                                        type="email"
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Address"
                                        id="address"
                                        multiline={true}
                                        rows={4}
                                        rowsMax={4}
                                        placeholder="Enter your home address"
                                        error={form.address === ''}
                                        name="address"
                                        value={form.address}
                                        onChange={this.handleChange}
                                        
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="mr-auto mt-16 normal-case"
                                        aria-label="ADD ROLE"
                                        disabled={!canSubmit}
                                        value="legacy"
                                        onClick={() => saveAdmin(form)}
                                    >
                                        ADD ROLE
                                    </Button>
                                </div>
                            </div>
                        
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({adminListApp}) => {
    const { admins } = adminApp;
    return {
        form  : admins.form,
        roles : admins.roles
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveAdmin: Actions.saveAdmin,
        getRoles: Actions.getRoles
    }, dispatch)
}

export default withReducer('adminListApp', reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdminList)));
