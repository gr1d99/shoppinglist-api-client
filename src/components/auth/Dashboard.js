import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginRequired } from "../../containers/auth/helpers";

import { fetchUserInfo } from "../../dispatchers";


class Dashboard extends React.Component {
    componentWillMount = () => {
        this.props.fetchUserInfo(this.props.history)
    };

    componentDidMount = () => {
        console.log(this.props)
    };

    renderUserInfo = () => {
        if(this.props.auth.userDetail) {
            const { username, email, date_joined, updated } = this.props.auth.userDetail;
            return (
                <table className="table table-bordered">
                    <caption><h4 className="text-center">
                        {username}
                    </h4></caption>
                    <thead>
                    <tr>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Created on</td>
                        <td>Last Updated on</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{username}</td>
                        <td>{email}</td>
                        <td>{date_joined}</td>
                        <td>{updated}</td>
                    </tr>
                    </tbody>
                </table>
            )
        }
    };

    render () {
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col-md-6 col-sm-offset-3">
                        <h4 className="text-center">My Account</h4>
                        <div className="well account-info">
                            {this.renderUserInfo()}
                            <div className="text-center">
                                <Link className="btn btn-success btn-xs update-account-btn" to="/dashboard/account/edit">Update Account</Link>
                                <Link className="btn btn-info btn-xs update-account-password-btn" to="/forgot-password">Change Password</Link>
                                <Link className="btn btn-danger btn-xs delete-account-btn" to="/dashboard/account/delete">Delete Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({auth}) => {
    return {auth}
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserInfo: bindActionCreators(fetchUserInfo, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(Dashboard))