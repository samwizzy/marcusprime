import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import PtaRequestList from './components/PtaRequestList';
import _ from 'lodash';

class PtaRequestsList extends Component {

    render() {
        const { ptaRequests } = this.props;

        return (
            <PtaRequestList
                data={ptaRequests}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({ ptaRequestsApp }) {
    return {
        ptaRequests: ptaRequestsApp.pta.ptaRequests,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PtaRequestsList));
