import React, { Component } from 'react';
import { withStyles, Tabs, Tab, Fab, Icon } from '@material-ui/core';
import { FusePageSimple, FuseAnimate } from '../../../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../../../../app/store/withReducer';
import _ from 'lodash';
import CreditedLists from './components/CreditedLists';
import DebitedLists from './components/DebitedLists';
import DebitedCreditedSidebarContent from './DebitedCreditedSidebarContent';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';

const styles = theme => ({
    button: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 99
    }
});

class DebitedCreditedApp extends Component {
    state = {
        value: 0
    };

    componentDidMount() {
        // this.props.getTransactions()
        this.props.getCreditsDebitsAccounts({direction: 'credit'})
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
                                label="Credited Wallets"/>
                            <Tab
                                classes={{
                                    root: "h-64"
                                }} label="Debited Wallets"/>
                        </Tabs>
                    }
                    content={
                        <div className="p-4 sm:p-24">
                            {value === 0 &&
                            (
                                <CreditedLists />
                            )}
                            {value === 1 && (
                                <DebitedLists />
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
        getTransactions: Actions.getTransactions,
        getCreditsDebitsAccounts: Actions.getCreditsDebitsAccounts,
    }, dispatch);
}

function mapStateToProps({ debitedCreditedApp }) {
    return {
    }
}

export default withReducer('debitedCreditedApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(DebitedCreditedApp))));
