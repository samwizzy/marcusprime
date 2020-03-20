import React from 'react';
import { withStyles, Button, Icon, Typography, TextField, InputAdornment } from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FuseExample, FusePageSimple, FuseChipSelect } from '../../../@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withReducer from '../../store/withReducer';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import WalletFundForm from './components/WalletFundForm';

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

class WalletFundApp extends React.Component {

    state = {
        tabValue: 0,
        form    : {},
        options : null,
        canSubmit: false
    };

    componentDidMount(){
        this.props.getUsers()
    }
    
    render(){
        const { classes } = this.props
        
        return (
            <FusePageSimple
                content={
                    <div className="p-24">
                        <WalletFundForm />
                    </div>
                }
            />
        )
    };
};

const mapStateToProps = ({walletFundApp}) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fundWallet: Actions.fundWallet,
        getUsers: Actions.getUsers,
    }, dispatch)
}

export default withReducer('walletFundApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(WalletFundApp)));