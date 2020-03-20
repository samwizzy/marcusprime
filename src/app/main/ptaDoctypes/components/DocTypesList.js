import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import DocTypesDialog from './DocTypesDialog'
import { withStyles, Icon, IconButton, Button, Switch } from '@material-ui/core'
import * as Actions from '../store/actions'
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

const types = []

class DocTypesList extends React.Component {
   state = {
      data: [],
      ptadoctype: {},
      form: {
         doctypeId: '',
         fxCatId: 1
      }
   }

   componentDidMount(){}

   static getDerivedStateFromProps(props, state){
      if(props.ptadoctypes !== state.data){
         return {
               data: props.ptadoctypes
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
      const ptadoctype = _.set(documentType, name, value === 'false'? true : false)
      this.setState({ptadoctype})
      this.props.updateDocType(ptadoctype)
   }

   handleDocTypeSubmit = (form) => {

   }

   render() {

      const { ptadoctypes, doctypes, openComposeDialog, removePtaDocTypes, rights, user, classes } = this.props
      const { form } = this.state
      const r = _.find(rights, function(o) { return o.module.moduleName === 'User Document Types'; });

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
            name: "description",
            label: "Description",
            options: {
               filter: true,
               sort: false,
            }
         },
         {
            name: "id",
            label: "Action",
            options: {
               customBodyRender: id => {
                  return (
                     <Button
                     variant="contained"
                     disabled={!(r && r.cancreate || user.role && user.role.id === 1)}
                     color="primary"
                     onClick={(ev, dispatch) => {
                        ev.stopPropagation();
                        removePtaDocTypes({doctypeId: id, fxCatId: 1});
                     }}>
                        remove
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
         downloadOptions: {filename: 'PtaDocTypesList.csv', separator: ','},
      };

      return (
         <React.Fragment> 
            <div style={{ maxWidth: '100%' }}>
               <MUIDataTable
                  title={"PTA Document Type List"}
                  data={ptadoctypes}
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
        openComposeDialog      : Actions.openComposeDialog,
        openUpdateComposeDialog: Actions.openUpdateComposeDialog,
        getPtaDocTypes: Actions.getPtaDocTypes,
        removePtaDocTypes: Actions.removePtaDocTypes,
    }, dispatch)
}

const mapStateToProps = ({ptaDocTypesApp, auth}) => {
   const { ptadoctypes } = ptaDocTypesApp
   return {
      user: auth.user.data,
      rights: auth.rights.right.rights,
      ptadoctypes: ptadoctypes.data,
      doctypes: ptadoctypes.docdata,
      composeDialog: ptadoctypes.composeDialog,
   }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(DocTypesList));