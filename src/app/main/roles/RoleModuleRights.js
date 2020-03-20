import React from 'react';
import MUIDataTable from "mui-datatables";
import { withStyles, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Input, OutlinedInput, FormControlLabel, FormGroup, FormHelperText, Checkbox, Divider, Icon, IconButton, Typography, TextField, InputAdornment } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { edit } from '@material-ui/icons'
import CustomToolbar from './CustomToolbar'
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../../app/store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AddRightButton from './components/AddRightButton'
import RoleRightsDialog from './components/RoleRightsDialog'

const styles = theme => ({
    divider: {
        margin: '30px 0',
    },
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: 360,
        display: 'flex'
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


class RoleModuleRights extends React.Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        data: [],
        form: {
            id: '',
            role: {id: ''},
            rights: [],
        },
        canSubmit: false,
        error: false,
        labelWidth: 75
    };

    componentDidMount(){     
        this.props.getRoles();
        this.props.getModules();
        this.props.getRoleRights();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.right !== this.props.right && this.props.right.id){
            this.setState({form: this.props.right})
        }
    }

    formSubmitted(){
        const { form } = this.state;
        if(form.email.length > 0){
            this.setState({canSubmit: true});
        }
    }

    handleChipChange = (event, name) => {
        const { value } = event.target
        this.props.getRoleRight(value);
    };

    handleCheckChange = (event, bool, index) => {
        const { name, value} = event.target
        const { rights } = this.state.form
        const currentState = rights
        currentState[index][name] = event.target.checked;
        this.setState({form: _.set({...this.state.form}, "rights", currentState)});
    };

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { form } = this.state
        this.props.updateRoleRight(form)
    }

    render(){
        const { classes, roles, modules, openNewRightDialog, user, rrights, addRoleRight, right } = this.props;
        const r = _.find(rrights, function(o) { return o.module.moduleName === 'Roles'; });
        const { form, canSubmit, error, labelWidth } = this.state;
        const { rights } = form;
        const selectedRoles = roles && roles.filter(role => role.id !== 1);

        console.log(modules, "Modules modiles")

        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    display: 'excluded',
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "module.moduleName",
                label: "Module Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "canview",
                label: "View",
                options: {
                    customBodyRender: (canview, tableMeta) => {
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                }}
                            >
                                <Checkbox name="canview" checked={canview} onChange={(event) => this.handleCheckChange(event, canview, tableMeta.rowIndex)} />
                            </IconButton>
                        );
                    },
                }
            },
            {
                name: "cancreate",
                label: "Write",
                options: {
                    customBodyRender: (cancreate, tableMeta) => {
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                }}
                            >
                                <Checkbox name="cancreate" checked={cancreate} onChange={(event) => this.handleCheckChange(event, cancreate, tableMeta.rowIndex)} />
                            </IconButton>
                        );
                    },
                }
            },
            {
                name: "canedit",
                label: "Edit",
                options: {
                    customBodyRender: (canedit, tableMeta) => {
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                }}
                            >
                                <Checkbox name="canedit" checked={canedit} onChange={(event) => this.handleCheckChange(event, canedit, tableMeta.rowIndex)} />
                            </IconButton>
                        );
            
                    },
                }
            },
            {
                name: "candelete",
                label: "Delete",
                options: {
                    customBodyRender: (candelete, tableMeta) => {
            
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                }}
                            >
                                <Checkbox name="candelete" checked={candelete} onChange={(event) => this.handleCheckChange(event, candelete, tableMeta.rowIndex)} />
                            </IconButton>
                        );
            
                    },
                }
            },
            {
                name: "authorize",
                label: "Authorize",
                options: {
                    customBodyRender: (authorize, tableMeta) => {
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                }}
                            >
                                <Checkbox name="authorize" checked={authorize} onChange={(event) => this.handleCheckChange(event, authorize, tableMeta.rowIndex)} />
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
            customToolbarSelect: (selectedRows, roles) => <CustomToolbar selectedRows={selectedRows} />,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            customToolbar: () => {
                return (
                    <AddRightButton
                        canCreate={(r && r.cancreate || user.role && user.role.id === 1)}
                        openComposeDialog={openNewRightDialog}
                    />
                );
            },
        };
        
        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <Typography variant="h6">Role Modules Rights</Typography>

                        <Typography className="mb-16" component="p">
                            <code>Rights Assignment</code> gives administrators rights on modules.
                        </Typography>

                        <div className="">

                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel ref={this.inputLabel} htmlFor="role">Select role</InputLabel>
                                <Select
                                    value={form.role? form.role.id : ''}
                                    onChange={(value) => this.handleChipChange(value, 'role')}
                                    input={<OutlinedInput labelWidth={labelWidth} name="role" id="role" />}
                                    autoWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        selectedRoles && selectedRoles.map((role, index) => 
                                        <MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                            
                            <Divider component="hr" variant="middle" className={classes.divider} />

                            <MUIDataTable
                                title={"Module Rights"}
                                data={rights}
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
                                UPDATE RIGHT
                            </Button>
                            
                            <RoleRightsDialog />
                        </div>
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({modulesRight, auth}) => {
    console.log(modulesRight, "MapToState");
    const { roles, rights } = modulesRight;
    return {
        form : rights.form,
        modules : rights.data,
        rights : rights.rights,
        right : rights.right,
        roles: roles.data,
        user: auth.user.data,
        rrights: auth.rights.right.rights,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRoles: Actions.getRoles,
        getRoleRights: Actions.getRoleRights,
        getRoleRight: Actions.getRoleRight,
        updateRoleRight: Actions.updateRoleRight,
        getModules: Actions.getModules,
        addRoleRight: Actions.addRoleRight,
        openNewRightDialog: Actions.openNewRightDialog
    }, dispatch)
}

export default withReducer('modulesRight', reducer)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RoleModuleRights)));
