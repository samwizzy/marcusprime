import React from 'react';
import { withStyles } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FusePageSimple } from '../../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../../../app/store/withReducer';
import reducer from './../store/reducers';
import * as Actions from './../store/actions';
import _ from 'lodash';
import BranchList from './../components/BranchList';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class BranchApp extends React.Component {

    componentDidMount(){
        this.props.getBranches()
        const { adUserID, role } = this.props.user
        if(role && role.name === 'BSM'){
            this.props.getBranchByBsm(adUserID)
        }
        this.props.getBranchByBsm(adUserID)
    }

    // componentDidUpdate(props, state){
    //     const { adUserID, role } = this.props.user
    //     if(role && role.name === 'BSM' && this.props.branch !== props.branch){
    //         this.props.getBranchByBsm(adUserID)
    //     }
    //     this.props.getBranchByBsm(adUserID)
    // }

    render(){
        
        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <BranchList />
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({branchApp, auth}) => {
    return {
        user: auth.user.data,
        branch: branchApp.branch.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBranches: Actions.getBranches,
        getBranchByBsm: Actions.getBranchByBsm,
    }, dispatch)
}

export default withReducer('branchApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(BranchApp)));
