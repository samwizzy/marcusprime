import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MUIDataTable from 'mui-datatables'
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../../../@fuse';
import withReducer from '../../../../../app/store/withReducer';
import reducer from './../../store/reducers';
import { Icon, IconButton, Typography } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import CustomToolbar from './components/CustomToolbar'
import * as Actions from '../../store/actions'
import AddButton from './components/AddButton'
import PreMaturedDialog from './components/PreMaturedDialog'
import PreMaturedLists from './components/PreMaturedLists'
import _ from 'lodash'

class PreMaturedTermApp extends React.Component {
    state = {
        canSubmit: false,
        composeDialog: false
    }

    componentDidMount(){
        this.props.getCalypsoBatchs()
    }

    openNewComposeDialog = () => {
        this.openComposeDialog()
    };

    openComposeDialog = () => {
        this.setState({composeDialog: true});
    };

    closeComposeDialog = () => {
        this.setState({composeDialog: false});
    };

    render() {
        const { classes } = this.props

        return (
            <FusePageSimple
                header={
                    <div className="flex flex-1 items-center justify-between p-24">
                        <div className="flex flex-col">
                            <Typography variant="h6">Pre-Matured Termination List</Typography>
                        </div>
                    </div>
                }
                content={
                    <div className="p-4 sm:p-24">
                        <PreMaturedLists />
                    </div>
                }  
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCalypsoBatchs: Actions.getCalypsoBatchs
    }, dispatch)
}

const mapStateToProps = ({preMaturedApp}) => {
    console.log(preMaturedApp, "preMaturedApp")
    return {
    }
}

export default withReducer("preMaturedApp", reducer)(connect(mapStateToProps, mapDispatchToProps)(PreMaturedTermApp));