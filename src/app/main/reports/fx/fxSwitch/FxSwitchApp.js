import React, { Component } from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { FusePageSimple } from '../../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../store/withReducer';
import _ from 'lodash';
import GBPToUSDLists from './components/GBPToUSDLists';
import EURToUSDLists from './components/EURToUSDLists';
import EURToGBPLists from './components/EURToGBPLists';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

const styles = theme => ({
});

class FxSwitchApp extends Component {

    state = {
        value: 0
    };

    componentDidMount(){
        this.props.getFxSwitch();
    }

    handleChange = (event, value) => {
        this.setState({value});
        this.props.handleTabChange()
    };

    render() {
        const {value} = this.state;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-0 sm:p-0 pb-80",
                    }}
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
                                }} label="FX Switch (GBP/USD)"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="FX Switch (EUR/USD)"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="FX Switch (EUR/GBP)"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 && (
                                <GBPToUSDLists />
                            )}
                            {value === 1 && (
                                <EURToUSDLists />
                            )}
                            {value === 2 && (
                                <EURToGBPLists />
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
        getFxSwitch: Actions.getFxSwitch,
        handleTabChange: Actions.handleTabChange,
    }, dispatch);
}

function mapStateToProps({ fxswitchApp }) {
    return {
        fxswitch: fxswitchApp.fx.fxswitch
    }
}

export default withReducer('fxswitchApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FxSwitchApp))));
