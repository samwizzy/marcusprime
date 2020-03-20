import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../app/store/withReducer';
import _ from 'lodash';
import HolidayCalendarList from './components/HolidayCalendarList';
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

class HolidayCalendarApp extends Component {

    componentDidMount() {
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
                        <HolidayCalendarList />
                    }
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ auth, HolidayCalendarApp }) {
    return {}
}

export default withReducer('HolidayCalendarApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(HolidayCalendarApp))));
