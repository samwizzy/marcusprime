import React from 'react';
import { withStyles, Button, Icon, Typography, TextField, InputAdornment } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../../app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import RoleTable from './RoleTable';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
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

const rights = [
    {
        value: "Read",
        label: "Read"
    },
    {
        value: "Write",
        label: "Write"
    },
    {
        value: "Update",
        label: "Update"
    },
    {
        value: "Delete",
        label: "Delete"
    }
].map(item => ({
    value: item.value,
    label: item.label
}));

console.log(rights);

class RoleApp extends React.Component {

    state = {
        tabValue: 0,
        form    : {
            name : '',
            email: '',
            roles : [],
            description: ''
        },
        options : null,
        canSubmit: false
    };

    componentDidMount(){
        const { match } = this.props;
        console.log(match);
        this.props.getRoles();
        this.updateRoleForm();
    }

    componentWillMount(){
        if( !_.isEqual(this.props.form, this.state.form) ){
            this.updateRoleForm();
        }
    }

    updateRoleForm(){
        this.setState({form: this.props.form});
        this.setState({options: this.props.roles});
    }

    formSubmitted(){
        const { form } = this.state;
        if(form.name.length > 0){
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

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    handleChange = (event) => {
        this.formSubmitted();
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    render(){
        const { classes, roles, addRole } = this.props;
        const { form, canSubmit } = this.state;

        console.log(form, "Form Shit");
        
        return (
            <FusePageSimple
                // header={
                //     <div className="flex flex-1 items-center justify-between p-24">
                //         <div className="flex flex-col">
                //             <div className="flex items-center mb-16">
                //                 <Icon className="text-18" color="action">home</Icon>
                //                 <Icon className="text-16" color="action">chevron_right</Icon>
                //                 <Typography color="textSecondary">Components</Typography>
                //                 <Icon className="text-16" color="action">chevron_right</Icon>
                //                 <Typography color="textSecondary">Roles Management</Typography>
                //             </div>
                //             <Typography variant="h6">Create New Role</Typography>
                //         </div>
                //     </div>
                // }
                content={
                    <div className="p-24">
                        <Typography variant="h6">Create New Role</Typography>
                        <Typography className="mb-16" component="p">
                            <code>Creating new roles </code>  is an administrator right.
                        </Typography>
                        <hr/>

                        <RoleTable roles={roles} />
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({rolesApp}) => {
    console.log(rolesApp, "MapToState");
    const { roles, role } = rolesApp;
    return {
        form : roles.form,
        roles: roles.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRoles: Actions.getRoles,
        getRole: Actions.getRole,
        addRole: Actions.addRole,
    }, dispatch)
}

export default withReducer('rolesApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(RoleApp)));
