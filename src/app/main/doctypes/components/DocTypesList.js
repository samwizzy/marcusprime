import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import DocTypesDialog from './DocTypesDialog'
import { withStyles, Icon, IconButton, Button, Switch, Typography, withTheme } from '@material-ui/core'
import * as Actions from './../store/actions'
import AddButton from './AddButton'
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
});

class DocTypesList extends React.Component {
   state = {
      data: [],
      doctype: {},
   }

   componentDidMount(){}

   static getDerivedStateFromProps(props, state){
      if(props.doctypes !== state.data){
         return {
               data: props.doctypes
         }
      }
      return null
   }

   openComposeDialog = () => {
      this.setState({composeDialog: true});
   };

   closeComposeDialog = () => {
      this.setState({...this.state, composeDialog: false});
   };

   handleChange = (event, documentType) => {
      const { name, value } = event.target
      const doctype = _.set(documentType, name, value === 'false'? true : false)
      this.setState({doctype})
      this.props.updateDocType(doctype)
   }

   render() {

      const { doctypes, openComposeDialog, openUpdateComposeDialog, rights, user, classes } = this.props
      const { data, doctype } = this.state
      const r = _.find(rights, function(o) { return o.module.moduleName === 'Document Types'; });

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
               sort: false,
            }
         },
         {
            name: "type",
            label: "Type",
            options: {
               filter: true,
               sort: false,
            }
         },
         {
            name: "kyc",
            label: "KYC Status",
            options: {
               customBodyRender: kyc => {
                  return (
                        <IconButton>
                           {kyc? <Icon>done</Icon>:<Icon>close</Icon>}
                        </IconButton>
                  );
               },
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
            label: "Disabled",
            options: {
               customBodyRender: id => {
                  const doctype = doctypes && doctypes.find(dx => dx.id === id)
                  return (
                     <Switch
                        name="disable"
                        checked={doctype.disable}
                        disabled={!(r && r.canedit || user.role && user.role.id === 1)}
                        onChange={(ev) => this.handleChange(ev, doctype)}
                        value={doctype.disable}
                        color="secondary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                     />
                  );
               },
            }
         },
         {
            name: "id",
            label: "Edit",
            options: {
               customBodyRender: id => {
                  return (
                     <Button
                     variant="contained"
                     disabled={!(r && r.cancreate || user.role && user.role.id === 1)}
                     color="primary"
                     onClick={(ev, dispatch) => {
                        ev.stopPropagation();
                        openUpdateComposeDialog(id);
                     }}>
                        edit
                     </Button>
                  );
               },
            }
         }
      ];        

      const options = {
         filter: true,
         filterType: "checkbox",
         responsive: "scrollMaxHeight",
         selectableRows: 'none',
         textLabels: {
            body: {
               noMatch: <Loader type="Oval" color={this.props.theme.palette.secondary.light} height={60} width={60} timeout={5000} />,
               toolTip: "Sort",
               columnHeaderTooltip: column => `Sort for ${column.label}`
            },
         },
         customToolbar: () => {
            return (
                <AddButton
                  canCreate={(r && r.cancreate || user.role && user.role.id === 1)}
                  openComposeDialog={openComposeDialog}
                />
            );
         },
         filter: false,
         rowsPerPage: 25,
         rowsPerPageOptions: [25,50,100],
         downloadOptions: {filename: 'docTypesList.csv', separator: ','},
      };

      return (
         <React.Fragment> 
            <div style={{ maxWidth: '100%' }}>
               <MUIDataTable
                  title={"Document Type List"}
                  data={doctypes}
                  columns={columns}
                  options={options}
               />
            </div>
            <DocTypesDialog />
         </React.Fragment>  
      )
   }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateDocType          : Actions.updateDocType,
        openComposeDialog      : Actions.openComposeDialog,
        openUpdateComposeDialog: Actions.openUpdateComposeDialog,
    }, dispatch)
}

const mapStateToProps = ({docTypesApp, auth}) => {
   const { doctypes } = docTypesApp
   return {
      user: auth.user.data,
      rights: auth.rights.right.rights,
      doctypes: doctypes.data,
      composeDialog: doctypes.composeDialog,
   }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DocTypesList));