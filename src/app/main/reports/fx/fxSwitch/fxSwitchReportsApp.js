import React, { Component } from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { FusePageSimple } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import _ from 'lodash';
import FxSwitchLists from './components/FxSwitchLists'
import CallDepositLists from './components/CallDepositLists';
import FDRateGuideLists from './components/FDRateGuideLists';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class fdcdReportsApp extends Component {

    state = {
        value: 0
    };

    componentDidMount() {
    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <React.Fragment>
                <FusePageSimple
                    contentToolbar={
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="off"
                            classes={{
                                root: "h-64 w-full border-b-1"
                            }}
                            >
                            <Tab
                                classes={{
                                    root: "h-64"
                                }}
                                label="Fixed Deposit"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="Call  Deposit"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="FD Rate Guide"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 &&
                            (
                                <FixedDepositLists />
                            )}
                            {value === 1 && (
                                <CallDepositLists />
                            )}
                            {value === 2 && (
                                <FDRateGuideLists />
                            )}
                        </div>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({ fdcdReportsApp }) {
    return {
    }
}

export default withReducer('fdcdReportsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(fdcdReportsApp))));
