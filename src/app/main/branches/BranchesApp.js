import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../app/store/withReducer';
import BranchesList from './BranchesList';
import BranchesDialog from './BranchesDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class BranchesApp extends Component {

    componentDidMount() {
        const { getBranches, getAllUBNBranches, getAllAdmins } = this.props;

        getBranches();
        getAllUBNBranches();
        getAllAdmins();
    }

    render() {

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar: "w-256 border-0",
                        header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    content={
                        <BranchesList />
                    }
                />
                <BranchesDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBranches: Actions.getBranches,
        getAllUBNBranches: Actions.getAllUBNBranches,
        getAllAdmins: Actions.getAllAdmins,
    }, dispatch);
}

function mapStateToProps({ branchesApp }) {
    return {    }
}

export default withReducer('branchesApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchesApp))));
