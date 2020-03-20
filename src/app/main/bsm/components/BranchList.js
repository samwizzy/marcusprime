import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NumberFormat from 'react-number-format';
import * as Actions from './../store/actions';
import _ from 'lodash'

const styles = theme => ({
   root: {
      width: '100%',
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
   },
   secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
   },
   icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
   },
   details: {
      alignItems: 'center',
   },
   column: {
      flexBasis: '33.33%',
   },
   helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
   },
   link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
         textDecoration: 'underline',
      },
   },
});


function BranchList(props) {
   const { classes, rights, branch, user } = props;
   const selectedBranch = branch && branch.find(br => br.bsmId === user.adUserID)
   const [bsmBranch, setBsmBranch] = React.useState({});

   const r = _.find(rights, function(o) { return o.module.moduleName === 'Branch Re-order Unit'; });

   console.log(selectedBranch, "selectedBranch inside render")
   console.log(bsmBranch, "bsmBranch inside render")

   React.useEffect(() => {
      props.getBranches()
   }, [])

   React.useEffect(() => {
      if(bsmBranch !== selectedBranch){
         setBsmBranch(selectedBranch)
      }
   })

   React.useEffect(() => {
      // setBsmBranch(selectedBranch)
      const { adUserID, role } = props.user
      
      // if(role && role.name === 'BSM'){
      //    props.getBranchByBsm(adUserID)
      // }
      // props.getBranchByBsm(adUserID)
   }, [])

   const handleChange = name => event => {
      const newBranch = { ...bsmBranch, [name]: event.target.checked };
      setBsmBranch(newBranch);
      props.approveBranch(newBranch)
   }

   return (
      <div className={classes.root}>
         <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
               <div className={classes.column}>
                  <Typography variant="h6" className={classes.heading}>Branch (Indicates branches with cash)</Typography>
               </div>
               <div className={classes.column}>
                  <Typography variant="h6" className={classes.secondaryHeading}>Select Status</Typography>
               </div>
            </ExpansionPanelSummary>
            {bsmBranch?
            (<ExpansionPanelDetails className={classes.details}>
               <div className={classes.column}>
                  <Typography variant="caption">
                  <strong>Branch Code:</strong> {bsmBranch.code}
                  </Typography>
                  <Typography variant="caption">
                  <strong>Address:</strong> &nbsp;
                  {bsmBranch.address}, &nbsp;
                  {bsmBranch.city}, &nbsp;
                  {bsmBranch.state}
                  </Typography>
               </div>
               <div className={classNames(classes.column, classes.helper)}>
                  <Typography variant="caption">
                     Does your branch have above re-order unit?
                     <Switch
                        checked={bsmBranch.funded}
                        onChange={handleChange('funded')}
                        value={"funded"}
                        disabled={(r && !r.authorize || user.role && user.role.id === 1)}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                     />
                     <br />
                     <a href="#sub-labels-and-columns" className={classes.link}>
                        Learn more
                     </a>
                  </Typography>
               </div>
            </ExpansionPanelDetails>
            ):
            (
               <ExpansionPanelDetails className={classes.details}>
                  <div className={classes.column}>
                  <Typography variant="subtitle1" color="textSecondary">
                     No Branch is assign to this user
                  </Typography>
                  </div>
               </ExpansionPanelDetails>
            )
            }
         </ExpansionPanel>
      </div>
   );
}

BranchList.propTypes = {
   classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({
      approveBranch: Actions.approveBranch,
      getBranchByBsm: Actions.getBranchByBsm,
      getBranches: Actions.getBranches,
   }, dispatch)
}

const mapStateToProps = ({branchApp, auth}) => {
   // console.log(branchApp, "branchApp in list")
   return {
         user  : auth.user.data,
         branch: branchApp.branch.data,
         rights: auth.rights.right.rights
   }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BranchList));