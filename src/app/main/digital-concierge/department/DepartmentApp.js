import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import { FusePageSimple } from '../../../../@fuse';
import withReducer from '../../../../app/store/withReducer';
import reducer from './../store/reducers';
import { Button, Icon, IconButton, Typography } from '@material-ui/core'
import * as Actions from '../store/actions'
import AddButton from './components/AddButton'
import DepartmentDialog from './components/DepartmentDialog'
import Loader from 'react-loader-spinner'
import _ from 'lodash'

class DepartmentApp extends React.Component {
    state = {
        canSubmit: false,
        composeDialog: false
    }

    componentDidMount(){
        this.props.getDepartments()
        this.props.getAdmins()
        console.log(this.props, "This props for theme")
    }

    openNewComposeDialog = () => {
        this.props.newDepartment()
        this.openComposeDialog()
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    render() {

        const { departments, admins, rights, user } = this.props
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Departments'; });
        console.log(r, "single departments rights")

        const columns = [
            {
                name: "id",
                label: "Id",
                options: {
                    display: 'excluded',
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "name",
                label: "Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "email",
                label: "Email",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "contactPersonId",
                label: "Contact Person",
                options: {
                    customBodyRender: contactPersonId => {
                        const admin = admins && admins.find(admin => admin.adUserID === contactPersonId)
                        if(admin){
                            return (
                                <Typography variant="subtitle2" color="textSecondary">
                                    {admin.email}
                                </Typography>
                            );
                        }
                    }
                }
            },
            {
             name: "id",
             label: " ",
             options: {
                customBodyRender: id => {
                    return (
                        <Button
                            variant="contained" 
                            color="primary"
                            disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                            onClick={(ev, dispatch) => {
                                ev.stopPropagation();
                                this.props.getDepartment(id);
                                this.openComposeDialog();
                            }}
                        >
                            edit
                        </Button>
                    );
                },
             }
            },
            {
                name: "id",
                label: "Delete",
                options: {
                    display: 'excluded',
                    customBodyRender: id => {
                        return (
                            <IconButton
                                onClick={(ev, dispatch) => {
                                    ev.stopPropagation();
                                    console.log(id, "Icon Button clicked")
                                    this.props.deleteDepartment(id);
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        );
           
                   },
                }
            }
        ];        

        const options = {
            filter: true,
            filterType: 'checkbox',
            responsive: 'stacked',
            selectableRows: 'none',
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" height={60} width={60} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                },
            },
            customToolbar: () => {
                return (
                    <AddButton
                        canCreate={(r && r.cancreate || user.role && user.role.id === 1)}
                        openNewDepartmentDialog={this.openNewComposeDialog}
                    />
                );
            },
            print: false,
            download: false,
            viewColumns: false,
            filter: false,
            rowsPerPage: 25,
            rowsPerPageOptions: [25,50,100],
            downloadOptions: {filename: 'departments.csv', separator: ','},
        };


      return (
        <FusePageSimple
            content={
                <div className="p-24">
                    <MUIDataTable
                        title={"Department List"}
                        data={departments}
                        columns={columns}
                        options={options}
                    />

                    <DepartmentDialog
                        closeComposeDialog={this.closeComposeDialog}
                        composeDialog={this.state.composeDialog}
                    />
                </div>
            }  
        />
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getDepartments   : Actions.getDepartments,
        newDepartment    : Actions.newDepartment,
        getDepartment    : Actions.getDepartment,
        deleteDepartment : Actions.deleteDepartment,
        getAdmins        : Actions.getAdmins,
    }, dispatch)
}

const mapStateToProps = ({departmentApp, auth}) => {
    const { department, admins } = departmentApp
    return {
        user        : auth.user.data,
        rights      : auth.rights.right.rights,
        departments : department.data,
        admins      : admins.data,
    }
}

export default withReducer("departmentApp", reducer)(connect(mapStateToProps, mapDispatchToProps)(DepartmentApp));