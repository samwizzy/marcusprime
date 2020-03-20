import React, { Component } from 'react';
import { withStyles, Fab, Icon, Tabs, Tab } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../store/withReducer';
import _ from 'lodash';
import FxSwitchRateList from './components/FxSwitchRateList'
import FxSalesRateList from './components/FxSalesRateList'
import PtaRateList from './components/PtaRateList'
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
});

class FxRateMakerCheckerApp extends Component {

    state = {
        value: 0
    };

    componentDidMount(){
        this.props.getFxRates();
        this.props.getCurrencies();
    }

    handleChange = (event, value) => {
        this.setState({value});
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
                                }} label="FX Switch Rate"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="FX Sales Rate"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="PTA Rate"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 && (
                                <FxSwitchRateList />
                            )}
                            {value === 1 && (
                                <FxSalesRateList />
                            )}
                            {value === 2 && (
                                <PtaRateList />
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
        getRateByType : Actions.getRateByType,
        getFxRates    : Actions.getFxRates,
        getCurrencies : Actions.getCurrencies,
    }, dispatch);
}

function mapStateToProps({ auth, fxSwitchApp }) {
    console.log(fxSwitchApp, "fxSwitchApp Maker Checker")
    return { 
    }
}

export default withReducer('fxSwitchApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(FxRateMakerCheckerApp))));
