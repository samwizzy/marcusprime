import React from 'react';
import MUIDataTable from "mui-datatables";
import { withStyles, Button, FormControl, FormLabel, FormControlLabel, FormGroup, FormHelperText, Checkbox, Divider, Icon, IconButton, Typography, TextField, InputAdornment } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { edit } from '@material-ui/icons'
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../../app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const styles = theme => ({
    divider: {
        margin: '30px 0',
    },
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

class RoleRights extends React.Component {
    
    state = {
        form: {
            role: {
                id: '',
            },
            rights: [
                {module: {id: ''}, cancreate: false, canview: false, canedit: false, candelete: false},
                {module: {id: ''}, cancreate: false, canview: false, canedit: false, candelete: false},
                {module: {id: ''}, cancreate: false, canview: false, canedit: false, candelete: false},
                {module: {id: ''}, cancreate: false, canview: false, canedit: false, candelete: false},
                {module: {id: ''}, cancreate: false, canview: false, canedit: false, candelete: false},
                {module: {id: ''}, cancreate: false, canview: false, canedit: false, candelete: false},
            ]
        },
        canSubmit: false,
        error: false
    };

    getModuleObject = () => {
        const modules_set = this.props.modules && this.props.modules.map(module => {
            return {
                module: {
                    id: module.id,
                },
                create : false,
                view   : false,
                delete : false,
                edit   : false
            }
        })
        return modules_set
    }

    componentDidMount(){
        const { match } = this.props;
        console.log(match);
        this.props.getRoles();
        this.props.getModules();
        this.props.getRoleRights();
    }

    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "#CCC000",
              fontSize: '14px'
            }
          },
          MUIDataTableHeadCell: {
            root: {
              backgroundColor: "#CCC000",
              fontSize: '14px'
            }
          }
        }
    })

    updateRoleForm(){
        this.setState({form: this.props.form});
        this.setState({options: this.props.roles});
    }

    formSubmitted(){
        const { form } = this.state;
        if(form.email.length > 0){
            this.setState({canSubmit: true});
        }
    }

    canBeSubmitted(){
        const {email} = this.state.form;
        return (
            email.length > 0 &&
            !_.isEqual(this.props.form, this.state.form)
        );
    }

    handleChipChange = (value, name) => {
        console.log(name, "Name");
        // this.setState({ ...this.state.form, role:{id:value.value} })
        this.setState({form: _.set({...this.state.form}, name, {id: value.value})});
        console.log(this.state.form.role, "Role OnChange")
    };

    handleChange = (event) => {
        this.formSubmitted();
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
        console.log(this.state.form, "Submitted form")
    };

    handleCheckChange = (event) => {
        this.setState({form: _.set({...this.state.form.rights}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChecksChange = (event, id, rowIndex) => {
        console.log(`You just clicked me ${id} own by ${event.target.name} on rowIndex ${rowIndex}`)
        const { rights } = this.state.form
        const value = event.target.type === "checkbox"? event.target.checked : event.target.value;
        rights[rowIndex].module.id = id;
        rights[rowIndex][event.target.name] = value;
        console.log(this.state.form, "Onchange")
    };

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { form } = this.state
        this.props.addRoleRight(form)
    }

    render(){
        const { classes, roles, modules, addRoleRight } = this.props;
        const { form, canSubmit, error } = this.state;
        const { rights } = form;

        const columns = [
            {
             name: "moduleName",
             label: "Module Name",
             options: {
              filter: true,
              sort: true,
             }
            },
            {
             name: "id",
             label: "View",
             options: {
                customBodyRender: (id, tableMeta) => {
                    return (
                        <IconButton
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                            }}
                        >
                            <Checkbox name="canview" onChange={(event) => this.handleChecksChange(event, id, tableMeta.rowIndex)} />
                        </IconButton>
                    );
                },
             }
            },
            {
             name: "id",
             label: "Create",
             options: {
                customBodyRender: (id, tableMeta) => {
                    return (
                        <IconButton
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                            }}
                        >
                            <Checkbox name="cancreate" onChange={(event) => this.handleChecksChange(event, id, tableMeta.rowIndex)} />
                        </IconButton>
                    );
                },
             }
            },
            {
             name: "id",
             label: "Edit",
             options: {
                customBodyRender: (id, tableMeta) => {
                    return (
                        <IconButton
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                            }}
                        >
                            <Checkbox name="canedit" onChange={(event) => this.handleChecksChange(event, id, tableMeta.rowIndex)} />
                        </IconButton>
                    );
        
                },
             }
            },
            {
             name: "id",
             label: "Delete",
             options: {
                customBodyRender: (id, tableMeta) => {
        
                    return (
                        <IconButton
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                            }}
                        >
                            <Checkbox name="candelete" onChange={(event) => this.handleChecksChange(event, id, tableMeta.rowIndex)} />
                        </IconButton>
                    );
        
                },
             }
            }
        ];
    
        
        const options = {
          filterType: 'dropdown',
          filter: true,
          responsive: 'stacked',
          selectableRows: 'none',
          onTableChange(){}
        };
        
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
                //                 <Typography color="textSecondary">Rights Modules</Typography>
                //             </div>
                //             <Typography variant="h6">Modules Rights</Typography>
                //         </div>
                //     </div>
                // }
                content={
                    <div className="p-24">
                        <Typography variant="h6">Modules Rights</Typography>

                        <Typography className="mb-16" component="p">
                            <code>Rights Assignment</code> gives administrators rights on modules.
                        </Typography>

                        <hr/>

                        <Typography className="mt-32 mb-8" variant="h5">Select User to Assign</Typography>


                            <div className="p-16 sm:p-24">
                                <div>

                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            form.roles && form.roles.map(item => ({
                                                value: item.value,
                                                label: item.label
                                            }))
                                        }
                                        onChange={(value) => this.handleChipChange(value, 'role')}
                                        placeholder="Select role"
                                        textFieldProps={{
                                            label          : 'Roles',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        options={
                                            roles && roles.map(item => ({
                                                value: item.id,
                                                label: item.name
                                            }))
                                        }
                                    />

                                    {/* <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={
                                            form.modules && form.modules.map(item => ({
                                                value: item.value,
                                                label: item.label
                                            }))
                                        }
                                        onChange={(value) => this.handleChipChange(value, 'modules')}
                                        placeholder="Select module"
                                        textFieldProps={{
                                            label          : 'Modules',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                        options={
                                            modules && modules.map(item => ({
                                                value: item.moduleName,
                                                label: item.moduleName
                                            }))
                                        }
                                    /> */}

                                    
                                    <Divider component="hr" variant="middle" className={classes.divider} />

                                    
                                    <MUIDataTable
                                        title={"Module Rights"}
                                        data={modules}
                                        columns={columns}
                                        options={options}
                                    />
                                    

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="ml-auto mt-16 normal-case"
                                        aria-label="ADD ROLE"
                                        disabled={canSubmit}
                                        value="legacy"
                                        onClick={this.handleFormSubmit}
                                    >
                                        ADD RIGHT
                                    </Button>

                                </div>
                            </div>
                        
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({rolesRight}) => {
    console.log(rolesRight, "MapToState");
    const { roles, rights } = rolesRight;
    return {
        form : rights.form,
        modules : rights.data,
        rights : rights.rights,
        right : rights.right,
        roles: roles.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRoles: Actions.getRoles,
        getRoleRights: Actions.getRoleRights,
        getModules: Actions.getModules,
        addRoleRight: Actions.addRoleRight,
    }, dispatch)
}

export default withReducer('rolesRight', reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RoleRights)));
