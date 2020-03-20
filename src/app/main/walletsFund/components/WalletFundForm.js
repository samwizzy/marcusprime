import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletFundDialog from './WalletFundDialog'
import classNames from 'classnames'
import { withStyles, Grid, Paper, Icon, IconButton, Menu, MenuItem, InputLabel, ListItem, ListItemText, Select, OutlinedInput, Button, Card, CardContent, FormControl, FormControlLabel, TextField, Checkbox, Switch, Typography, withTheme } from '@material-ui/core'
import * as Actions from '../store/actions'
import AddButton from './AddButton'
import Loader from 'react-loader-spinner'
import _ from 'lodash'
import BranchDropDown from './BranchDropdown'

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

class WalletFundList extends React.Component {
   state = {
      uuid: "",
      form: {
         customerEmail: "",
         customerName: "",
         transactionReference: "",
         walletId: ""
      },
      readOnly: true,
      labelWidth: 112
   }

   static getDerivedStateFromProps(props, state){
      return null
   }

   componentDidUpdate(prevProps, prevState){
      if(prevProps.account !== this.props.account){
         const { walletId, email, username } = this.props.account
         this.setState({form: _.set(this.state.form, "walletId", walletId)}) 
         this.setState({form: _.set(this.state.form, "customerEmail", email)}) 
         this.setState({form: _.set(this.state.form, "customerName", username)}) 
         // console.log(this.props.account, "i am ready to update now")
      }
   }

   canBeSubmitted(){
        const {customerEmail, customerName, walletId, transactionReference} = this.state.form;
        return (
            customerName.length > 0 &&
            customerEmail.length > 0 &&
            walletId.length > 0 &&
            transactionReference.length > 0
        );
   }

   handleDownChange = item => {
      const selectedUser = this.props.accounts.find(account => account.username === item)
      this.setState(_.set(this.state, 'uuid', selectedUser.uuid));
      this.props.getUserProfileByUuid(selectedUser.uuid)
  };

   handleChange = (event) => {
      this.setState({form: _.set(this.state.form, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
   };

   handleAutoPopulate = (event) => {
      this.setState(_.set(this.state, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
      this.props.getUserProfileByUuid(event.target.value)
   }

   render() {
      const { fundWallet, getUserProfileByUuid, accounts, account, rights, user, classes } = this.props
      const { form, uuid, labelWidth, readOnly } = this.state
      
      const r = _.find(rights, function(o) { return o.module.moduleName === 'Fund Wallet'; });

      return (
         <React.Fragment> 
            <div style={{ maxWidth: '100%' }}>
            <Grid container>
               <Grid item xs={5}>
                  <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
                     <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-64 ">
                        <Typography variant="h6" className="md:w-full mb-32">FUND WALLET</Typography>

                        <form name="registerForm" noValidate className="flex flex-col justify-center w-full">

                           <BranchDropDown 
                              className="mb-16"
                              handleChange={this.handleDownChange} 
                           />

                           {/* <FormControl variant="outlined" className={classNames(classes.formControl, "mb-16")}>
                              <InputLabel ref={this.inputLabel} htmlFor="uuid">Select User</InputLabel>
                              <Select
                                 value={uuid}
                                 onChange={this.handleAutoPopulate}
                                 input={<OutlinedInput labelWidth={labelWidth} name="uuid" id="uuid" />}
                                 autoWidth
                              >
                                 <MenuItem value="">
                                    <em>None</em>
                                 </MenuItem>
                                 {
                                    accounts && accounts.map((user, index) => 
                                    <MenuItem key={index} value={user.uuid}>
                                       {user.lastName +' '+ user.firstName}
                                    </MenuItem>)
                                 }
                              </Select>
                           </FormControl> */}

                           <TextField
                              className="mb-16"
                              label="Customer Name"
                              autoFocus
                              inputProps={{
                                 readOnly: Boolean(readOnly),
                                 disabled: Boolean(readOnly),
                              }}
                              type="name"
                              name="customerName"
                              value={form.customerName}
                              onChange={this.handleChange}
                              variant="outlined"
                              required
                              fullWidth
                              helperText="Field can not be edited"
                           />

                           <TextField
                              className="mb-16"
                              label="Customer Email"
                              inputProps={{
                                 readOnly: Boolean(readOnly),
                                 disabled: Boolean(readOnly),
                              }}
                              type="name"
                              name="customerEmail"
                              value={form.customerEmail}
                              onChange={this.handleChange}
                              variant="outlined"
                              required
                              fullWidth
                              helperText="Field can not be edited"
                           />

                           <TextField
                              className="mb-16"
                              label="Wallet Id"
                              inputProps={{
                                 readOnly: Boolean(readOnly),
                                 disabled: Boolean(readOnly),
                              }}
                              type="name"
                              name="walletId"
                              value={form.walletId}
                              onChange={this.handleChange}
                              variant="outlined"
                              required
                              fullWidth
                              helperText="Field can not be edited"
                           />

                           <TextField
                              className="mb-16"
                              label="Transaction Reference"
                              type="email"
                              name="transactionReference"
                              value={form.transactionReference}
                              onChange={this.handleChange}
                              variant="outlined"
                              required
                              fullWidth
                           />

                           <Button variant="contained" onClick={() => fundWallet(form)} color="primary" className="w-full mx-auto mt-16" aria-label="Register"
                                 disabled={!(r && r.cancreate && this.canBeSubmitted() || user.role && user.role.id === 1 && this.canBeSubmitted()) }>
                              FUND WALLET
                           </Button>

                        </form>
                     </CardContent>
                  </Card>
               </Grid>

               <Grid item xs={7}>
                  <Paper square>
                     <div className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-64 md:items-start md:flex-no-shrink md:flex-1 md:text-left">
                        <Typography variant="h6" className="md:w-full mb-32">CAUTION (DISCLAIMER)</Typography>
                        <Typography variant="body2" className="md:w-full mb-32">
                           This is a restricted section and its only referred at any time there's a wallet transfer failure.
                        </Typography>
                     </div>
                  </Paper>
               </Grid>
            </Grid>
               
            </div>
            <WalletFundDialog />
         </React.Fragment>  
      )
   }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fundWallet             : Actions.fundWallet,
        getUserProfileByUuid   : Actions.getUserProfileByUuid,
        openComposeDialog      : Actions.openComposeDialog,
        openUpdateComposeDialog: Actions.openUpdateComposeDialog,
    }, dispatch)
}

const mapStateToProps = ({walletFundApp, auth}) => {
   const { walletFund, users } = walletFundApp
   return {
      user: auth.user.data,
      rights: auth.rights.right.rights,
      walletFund: walletFund.data,
      accounts: users.data,
      account: users.user,
      composeDialog: walletFund.composeDialog,
   }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(WalletFundList));