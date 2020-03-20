import React, { Component } from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { FusePageSimple } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import _ from 'lodash';
import PaystackLogLists from './components/PaystackLogLists';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const styles = theme => ({
});

class paystackLogApp extends Component {

    state = {
        value: 0
    };

    componentDidMount(){
        this.props.getPaystackLogs({limit: 1, start: 0});
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
                                }} label="Paystack Log"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 && (
                                <PaystackLogLists />
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
        getPaystackLogs: Actions.getPaystackLogs,
    }, dispatch);
}

function mapStateToProps({ paystackLogApp }) {
    console.log(paystackLogApp, "paystackLogApp")
    return {
        paystacklogs: paystackLogApp.paystacklog.data
    }
}

export default withReducer('paystackLogApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(paystackLogApp))));
