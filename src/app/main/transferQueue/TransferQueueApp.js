import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../store/withReducer';
import TransferQueueList from './components/TransferQueueList';
import TransferQueueDialog from './TransferQueueDialog';
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

class TransferQueueApp extends Component {

    componentDidMount() {
        const { getAllTransferQueue } = this.props;

        getAllTransferQueue();
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
                        <TransferQueueList />
                    }
                />
                <TransferQueueDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllTransferQueue: Actions.getAllTransferQueue,
    }, dispatch);
}

function mapStateToProps({ transferQueueApp }) {
    return {
        tempProducts: transferQueueApp.transferQueue.tempProducts,
    }
}

export default withReducer('transferQueueApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(TransferQueueApp))));
