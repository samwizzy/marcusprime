import React, {Component} from 'react';
import {Button, Divider, Typography, InputAdornment, Icon} from '@material-ui/core';
import {TextFieldFormsy, FuseAnimate} from '../../../../@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from '../../../../app/auth/store/actions';
import Loader from 'react-loader-spinner'

class JWTLoginTab extends Component {

    state = {
        canSubmit: false,
        loading: false,
    };

    form = React.createRef();

    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };

    onSubmit = (model) => {
        this.setState({loading: true, canSubmit: false});
        this.props.submitLogin(model);
    };

    componentDidUpdate(prevProps, prevState)
    {
        if ( this.props.login.error && (this.props.login.error.email || this.props.login.error.password) )
        {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        } else if ( prevProps.login.error !== this.props.login.error )
        {
            this.enableButton();
            this.setState({loading: false});
        }

        return null;
    }

    render()
    {
        const {canSubmit, loading} = this.state;

        return (
            <div className="w-full">
                {this.props.login.success === false &&
                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography component="p" variant="body1" className="mb-6 font-light text-red-dark">
                            {this.props.login.error.error_description}
                        </Typography>
                    </FuseAnimate>
                }

                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="email"
                        label="Email"
                        autoComplete="off"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        label="Password"
                        autoComplete="off"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        disabled={!canSubmit}
                        value="legacy"
                    >
                        { loading && !canSubmit &&
                            <Loader type="Oval" color="#039be5" height={25} width={25} style={{display: 'flex', alignItems:'center', marginRight: '5px'}} />
                        }
                        Login
                    </Button>

                </Formsy>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({auth})
{
    console.log(auth, "Auth");
    return {
        login: auth.login,
        user : auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTLoginTab));
