import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import SubmitButton  from '../../components/common/button';
import { LoginUser } from "../../dispatchers";

class Login extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        let obj = {};
        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.props.history, this.state);
    };

    getErrorMessages = field => {
        if (this.props.auth.login_errors) {
            if (this.props.auth.login_errors.messages) {
                if (this.props.auth.login_errors.messages.hasOwnProperty(field)) {
                    return (
                        this.props.auth.login_errors.messages[field].map(error => {
                            return <p className="text-danger" key={error}>{error}</p>
                        })
                    )
                }
            }
        }
    }

    getErrorMessage = () => {
        if (this.props.auth.login_errors) {
            if (this.props.auth.login_errors.message) {
                return (
                    <p className="text-danger text-justified">{this.props.auth.login_errors.message}</p>
                )
            }
        }
    }

    getSuccessMessage = () => {
        if (this.props.auth.success_message) {
            return <p className="text-success text-center">{this.props.auth.success_message}</p>
        }
    }

    render () {
        return (

            <div className="col-sm-6 col-sm-offset-3">
                <div className="thumbnail signin">

                    {this.getSuccessMessage()}
                    {this.getErrorMessage()}

                    <h3 className="text-center">Login</h3>

                    <form className="signup-form" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   name="username"
                                   placeholder="Your username"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('username')}
                        </div>

                        <div className="form-group">
                            <input type="password"
                                   className="form-control"
                                   name="password"
                                   placeholder="Your password"
                                   onChange={this.handleChange}/>
                            {this.getErrorMessages('password')}
                        </div>

                        <SubmitButton
                            type='submit'
                            className='btn btn-success'
                            value='Login'/>
                    </form>

                </div>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: bindActionCreators(LoginUser, dispatch)
    }
};

const mapStateToProps = ({auth}) => {
    return {auth}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)