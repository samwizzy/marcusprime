import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import BranchList from './components/BranchList';

class BranchesList extends Component {

    render() {
        const { branches } = this.props;

        return (
            <BranchList
                data={branches}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        
    }, dispatch);
}

function mapStateToProps({ branchesApp }) {
    console.log(branchesApp, "branchesApp")
    return {
        branches: branchesApp.branch.branches,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BranchesList));
