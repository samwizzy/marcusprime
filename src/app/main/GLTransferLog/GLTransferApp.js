import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { FusePageSimple } from '../../../@fuse';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withReducer from '../../store/withReducer';
import GLTransferList from './components/GLTransferList';
import GLTransferDialog from './GLTransferDialog';
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

class GLTransferApp extends Component {

    componentDidMount() {
        this.props.getAllTransferLog();
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
                        <GLTransferList />
                    }
                />
                <GLTransferDialog />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllTransferLog: Actions.getAllTransferLog,
    }, dispatch);
}

function mapStateToProps({ glTransferApp }) {
    const { transferLog } = glTransferApp
    return {
        data: transferLog.data,
    }
}

export default withReducer('glTransferApp', reducer)(withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps, mapDispatchToProps)(GLTransferApp))));
