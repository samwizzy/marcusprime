import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../store/withReducer';
import ActivityLogsList from './components/ActivityLogsList';
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

class ActivityLogs extends Component {

    componentDidMount() {
        const { getAllTempProducts } = this.props;

        getAllTempProducts();
    }

    handleLink = link => {
        this.props.history.push(link);
    }

    render() {

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                    }}
                    content={
                        <ActivityLogsList />
                    }
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllTempProducts: Actions.getAllTempProducts,
    }, dispatch);
}

function mapStateToProps({ activityLogsApp }) {
    return {}
}

export default withReducer('activityLogsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivityLogs))));
