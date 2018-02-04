import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import { getUserShoppingLists } from "../../dispatchers";
import { loginRequired } from "../auth/helpers";

class List extends React.Component {

    componentWillMount = () => {
        const { isAuthenticated } = this.props.auth;
        switch (isAuthenticated) {
            case true:
                return this.props.getUserShoppingLists(this.props.history);

            case false:
                return this.props.history.push('/login');

            default:
                return this.props.history.push('/login');
        }
    };

    handleClick = url => e => {
        e.preventDefault();
        this.props.getUserShoppingLists(
            this.props.history,
            url)
    };

    pageMetaData = (location) => {
        const { total_items,
            current_page,
            next_page,
            total_pages,
            next_page_url,
            previous_page_url } = this.props.shoppingList;

        switch (location) {
            case 'up':
                return (
                    <div>
                        <p>Total Items { total_items }</p>
                    </div>
                );

            case 'down':
                return (
                    <div>
                        <button onClick={this.handleClick(next_page_url)} className="pull-right">Next Page { next_page }</button>
                        <span className="text-center">Page { current_page } of { total_pages }</span>
                        <button onClick={this.handleClick(previous_page_url)} className="pull-left">Previous Page</button>
                    </div>
                );

            default:
                return ''
        }
    };

    renderShoppingLists = () => {
        if (this.props.shoppingList.data) {
            return this.props.shoppingList.data.map(
                shl => {
                    return (
                        <div key={shl.id} className="col-sm-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h6 className="text-center">
                                        <Link to={`/shoppinglists/${shl.id}`}>{shl.name.toUpperCase()}</Link>
                                    </h6>
                                </div>
                                <div className="panel-body shoppinglist-box">
                                    <p className="text-justified"><Truncate lines={2} ellipsis={<span>...</span>}>{shl.description}</Truncate></p>
                                </div>
                                <div className="panel-footer"></div>
                            </div>
                        </div>
                    )
                }
            )
        }
    };

    render () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    {this.pageMetaData('up')}
                </div>
                <div className="create-link text-center">
                    <Link className="btn btn-success btn-xs" to="shoppinglists/create"><span className="glyphicon glyphicon-plus-sign"></span> Add new</Link>
                    <br/>
                    <br/>
                </div>
                <div className="col-lg-12">
                    {this.renderShoppingLists()}
                </div>
                <div className="col-lg-12">
                    {this.pageMetaData('down')}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shoppingList, auth}) => {
    return {shoppingList, auth}
};

const mapDispatchToProps = dispatch => {
    return {
        getUserShoppingLists: bindActionCreators(getUserShoppingLists, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(List));