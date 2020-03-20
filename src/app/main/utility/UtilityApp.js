import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../store/withReducer';
import _ from 'lodash';
// import UtilityList from './components/UtilityList';
import UtilityList from './components/UtilityLists';
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

class UtilityApp extends Component {

    componentDidMount() {
        this.props.getDepartments()
        this.props.getAdmins()
    }

    render() {

        return (
            <React.Fragment>
                <FusePageSimple
                    content={
                        <UtilityList />
                    }
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDepartments : Actions.getDepartments,
        getAdmins : Actions.getAdmins,
    }, dispatch);
}

function mapStateToProps({ auth, UtilityApp }) {
    return {}
}

export default withReducer('UtilityApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(UtilityApp))));
