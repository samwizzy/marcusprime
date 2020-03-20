import React from 'react';
import { withStyles, Paper, Grid, Button, Divider, Icon, Typography, TextField, MenuItem } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import { FusePageSimple } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../../app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import _ from 'lodash';
import BranchDropdown from './admins/BranchDropdown'

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
    root: {
        flexGrow: 1,
        '& input': {
            // margin: theme.spacing.unit,
        }
    },
    divider: {
        margin: '30px 0',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    textField: {
        width: '80%',
        marginRight: theme.spacing.unit
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            boxShadow: theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class NewAdmin extends React.Component {

    state = {
        form: this.props.form,
        canSubmit: false
    }

    componentDidMount() {
        this.props.getRoles();
        this.props.getBranches();
        this.props.getDepartments();
    }

    componentDidUpdate(props, state){
        if(props.admin !== this.props.admin){
            const {response} = this.props.admin
            if(response){
                this.setState({form: _.set(this.state.form, 'adUserID', response.aduserID)})
                this.setState({form: _.set(this.state.form, 'initials', response.initials)})
                this.setState({form: _.set(this.state.form, 'firstName', response.firstName)})
                this.setState({form: _.set(this.state.form, 'lastName', response.lastName)})
                this.setState({form: _.set(this.state.form, 'displayName', response.displayName)})
                this.setState({form: _.set(this.state.form, 'department', response.department)})
                this.setState({form: _.set(this.state.form, 'jobTitle', response.jobTitle)})
                this.setState({form: _.set(this.state.form, 'mobileNumber', response.mobileNumber)})
                this.setState({form: _.set(this.state.form, 'telephoneNumber', response.telephoneNumber)})
                this.setState({form: _.set(this.state.form, 'address', response.address)})
                this.setState({form: _.set(this.state.form, 'branchCode', response.branchCode)})
            } 
        }
    }

    updateAdminForm() {
        this.setState({ form: this.props.form });
    }

    formSubmitted() {
        const { firstName, lastName, email, displayName, department, telephoneNumber, mobileNumber, jobTitle, address } = this.state.form;
        if (firstName.length > 0 && lastName.length > 0  
            && email.length > 0
            // && displayName.length > 0 
            && department.length > 0 
            // && adUserID.length > 0 && initials.length > 0 
            && telephoneNumber.length > 0 
            && mobileNumber.length > 0 
            && jobTitle.length > 0 && address.length > 0) {
            this.setState({ canSubmit: true });
        }
    }

    canBeSubmitted() {
        const { firstName, lastName, email, role, department, adUserID, initials, telephoneNumber, mobileNumber, jobTitle, address } = this.state.form;
        return (
            firstName.length > 0 && lastName.length > 0 && email.length > 0 && adUserID.length > 0
            && department.length > 0 && initials.length > 0 && telephoneNumber.length > 0 && Number.isInteger(role.id)
            && mobileNumber.length > 0 && jobTitle.length > 0 && address.length > 0 &&
            !_.isEqual(this.props.form, this.state.form)
        );
    }

    handleChipChange = (event) => {
        const { name, value } = event.target
        this.setState({ form: _.set({ ...this.state.form }, name, {id: value}) });
    };

    handleChange = (event) => {
        this.formSubmitted();
        this.setState({ form: _.set({ ...this.state.form }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value) });
    };

    autoPopulateFormField = (event) => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.setState({ form: _.set({ ...this.state.form }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value) });
        if(event.target.value.match(mailformat)){
            this.props.getAdminByEmail({user: event.target.value})
            this.formSubmitted()
        }
    }

    autoPopulateFormField2 = (event) => {
        const { email } = this.state.form
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)){
            this.props.getAdminByEmail({user: email})
        }
    }

    handleADIdChange = (event) => {
        this.formSubmitted();
        this.setState({ form: _.set({ ...this.state.form }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : _.split(this.state.form.email, '@')[0]) });
    };

    handleDownChange = item => {
        const selectedBranch = this.props.branches.find(branch => branch.name === item)
        this.setState({ form: _.set({ ...this.state.form }, 'branchCode', selectedBranch.code) });
    };

    handleSubmit = (form) => {
        this.props.saveAdmin(form)
        this.setState({ form: this.props.form})
    }

    render() {
        const { classes, roles, departments, rights, user } = this.props;
        const { canSubmit, form } = this.state;
        // const sortedBranches = _.sortBy(branches, [function(o) { return o.name; }]);
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Admin Users'; });

        console.log(form, "Hear me")
        // console.log(r, "Single rights")

        return (
            <FusePageSimple
                content={
                    <div className="p-24">

                        <Typography className="mb-16" component="p">
                            <code>Creating an Admin</code> is the super administrator's role.
                        </Typography>

                        <Typography className="mt-32 mb-8" variant="h5">Create a New Administration User</Typography>

                        <div className={classes.root}>
                            <Grid container style={{margin: '4px 0'}}>
                                <Grid item xs={12} md={10}>
                                    <TextField
                                        label="Admin Email"
                                        required
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={this.handleChange}
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item md={2}>    
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        aria-label="AUTO-POPULATE"
                                        onClick={() => this.autoPopulateFormField2()}
                                    >
                                        populate field
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider className={classes.divider} />

                            <Grid container spacing={0} justify="space-evenly">
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16 min:w-5\/6"
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
                                </Grid>    
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Lastname"
                                        id="lastname"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>    
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Display Name"
                                        id="display-name"
                                        name="displayName"
                                        value={form.displayName}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                        
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="role"
                                        select
                                        label="Select role"
                                        name="role"
                                        className="mt-8 mb-16"
                                        value={form.role? form.role.id : 0}
                                        onChange={this.handleChipChange}
                                        SelectProps={{
                                        MenuProps: {
                                            className: "mt-8 mb-16",
                                        },
                                        }}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem key='0' value='0' disabled>
                                            Select role
                                        </MenuItem>
                                        {roles && roles.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="department"
                                        select
                                        label="Select department"
                                        name="department"
                                        className="mt-8 mb-16"
                                        value={form.department}
                                        onChange={this.handleChange}
                                        SelectProps={{
                                        MenuProps: {
                                            className: "mt-8 mb-16",
                                        },
                                        }}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {departments.map(option => (
                                            <MenuItem key={option.id} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>  
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Admin User ID"
                                        required
                                        id="adUserID"
                                        name="adUserID"
                                        value={form.adUserID}
                                        // value={_.split(form.email, '@')[0]}
                                        // onChange={this.handleADIdChange}
                                        onChange={this.handleChange}
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                    /> 
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="initials"
                                        select
                                        label="Select Initials"
                                        name="initials"
                                        className="mt-8 mb-16"
                                        value={form.initials}
                                        onChange={this.handleChange}
                                        SelectProps={{
                                        MenuProps: {
                                            className: "mt-8 mb-16",
                                        },
                                        }}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {initials.map(option => (
                                            <MenuItem key={option.label} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Telephone Number"
                                        id="telephone"
                                        name="telephoneNumber"
                                        value={form.telephoneNumber}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Mobile Number"
                                        id="mobile"
                                        name="mobileNumber"
                                        value={form.mobileNumber}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Job Title"
                                        id="job-title"
                                        name="jobTitle"
                                        value={form.jobTitle}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <BranchDropdown
                                        className="mt-8 mb-16"
                                        handleChange={this.handleDownChange} 
                                     />
                                </Grid>
                                    

                                <Grid item xs={12}>
                                    <TextField
                                        className="mt-8 mb-16"
                                        label="Address"
                                        id="address"
                                        multiline
                                        rows={4}
                                        rowsMax={4}
                                        placeholder="Enter your home address"
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
                                        aria-label="ADD ADMIN"
                                        // disabled={!canSubmit}
                                        disabled={!(r && r.cancreate && this.canBeSubmitted() || user.role && user.role.id === 1 && this.canBeSubmitted()) }
                                        value="legacy"
                                        onClick={() => this.handleSubmit(form)}
                                    >
                                        CREATE ADMIN
                                    </Button>

                                    {!(r && r.cancreate || user.role && user.role.id === 1) && 
                                        <Typography variant="subtitle2">You do not have the right to add a new admin</Typography>
                                    }
                                </Grid>
                            </Grid>

                        </div>

                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({ adminApp, auth }) => {
    const { admins, admin, departments } = adminApp;
    return {
        form: admins.form,
        admin: admin,
        roles: admins.roles,
        branches: admins.branch,
        departments: departments,
        user: auth.user.data,
        rights: auth.rights.right.rights,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveAdmin: Actions.saveAdmin,
        getRoles: Actions.getRoles,
        getAdminByEmail: Actions.getAdminByEmail,
        getBranches: Actions.getBranches,
        getDepartments: Actions.getDepartments,
    }, dispatch)
}

export default withReducer('adminApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(NewAdmin)));
