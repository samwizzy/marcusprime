import React, { Component } from 'react';
import { withStyles, Tabs, Tab, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../../app/store/withReducer';
import _ from 'lodash';
import AccountTransferLists from './components/AccountTransferLists';
import WalletTransferLists from './components/WalletTransferLists';
import TransferReportsSidebarContent from './TransferReportsSidebarContent';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class TransferReportsApp extends Component {

    state = {
        value: 0
    };

    componentDidMount() {
        // this.props.getTransactions()
        this.props.getTransfers({type: 'Wallet Transfer'})
    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {value} = this.state;

        return (
            <React.Fragment>
                <FusePageSimple
                    // classes={{
                    //     contentCardWrapper: "p-16 sm:p-24 pb-80",
                    //     leftSidebar: "w-256 border-0",
                    //     header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    // }}
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
                                label="Wallet Transfer"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="Account Transfer"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 &&
                            (
                                <WalletTransferLists />
                            )}
                            {value === 1 && (
                                <AccountTransferLists />
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
        getTransfers: Actions.getTransfers,
        getTransactions: Actions.getTransactions,
    }, dispatch);
}

function mapStateToProps({ transferReportsApp }) {
    return {
    }
}

export default withReducer('transferReportsApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferReportsApp))));
