import React, { Component } from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { FusePageSimple } from '../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../store/withReducer';
import _ from 'lodash';
import WalletsLists from './components/WalletsLogLists';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const styles = theme => ({
});

class walletsLogApp extends Component {

    state = {
        value: 0
    };

    componentDidMount(){
        this.props.getWalletsLog();
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
                                }} label="Reconciliation Log"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 && (
                                <WalletsLists />
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
        getWalletsLog: Actions.getWalletsLog,
    }, dispatch);
}

function mapStateToProps({ walletsLogApp }) {
    return {
        walletslogs: walletsLogApp.walletslog.data
    }
}

export default withReducer('walletsLogApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(walletsLogApp))));
