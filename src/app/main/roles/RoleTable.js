import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import RoleDialog from './components/RoleDialog'
import { withStyles, Button } from '@material-ui/core'
import * as Actions from './store/actions'
import CustomToolbar from './CustomToolbar'
import AddButton from './components/AddButton'
import Loader from 'react-loader-spinner'
import _ from 'lodash'

const styles = theme => ({
    root: {
        maxWidth: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
})    
class RoleTable extends React.Component {
    state = {
        data: [],
        composeDialog: false
    }

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({...this.state, composeDialog: false});
    };

    render() {

        const { classes, roles, user, rights } = this.props
        const r = _.find(rights, function(o) { return o.module.moduleName === 'Roles'; });

        const columns = [
            {
             name: "id",
             label: "ID",
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
             name: "description",
             label: "Description",
             options: {
              filter: true,
              sort: false,
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
                            disabled={!(r && r.canedit || user.role && user.role.name.toLowerCase() === 'super admin')}
                            onClick={(ev) => {
                                ev.stopPropagation();
                                this.props.getRole(id);
                                this.openComposeDialog();
                            }}
                        >
                            edit
                        </Button>
                    );
        
                },
             }
            }
        ];        

        const options = {
            filterType: "checkbox",
            responsive: "scrollMaxHeight",
            selectableRows: 'none',
            textLabels: {
                body: {
                    noMatch: <Loader type="Oval" color="#039be5" height={60} width={60} timeout={5000} />,
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Sort for ${column.label}`
                },
            },
            customToolbar: () => {
                return (
                    <AddButton
                        canCreate={r && r.cancreate || user.role && user.role.name.toLowerCase() === 'super admin'}
                        openNewRoleDialog={this.openComposeDialog}
                        newRole={this.props.newRole}
                    />
                );
            },
            filter: false,
        };


      return (
        <React.Fragment>  
            <div style={{ maxWidth: '100%' }}>
                <MUIDataTable
                    title={"Roles List"}
                    data={roles}
                    columns={columns}
                    options={options}
                />
            </div>
            <RoleDialog 
                composeDialog={this.state.composeDialog}
                closeComposeDialog={this.closeComposeDialog}
                form={this.props.form}
            />
        </React.Fragment>  
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getRole: Actions.getRole,
        newRole: Actions.newRole,
    }, dispatch)
}

const mapStateToProps = ({rolesApp, auth}) => {
    const { role } = rolesApp;
    return {
        form  : role.data,
        user  : auth.user.data,
        rights: auth.rights.right.rights,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(RoleTable));