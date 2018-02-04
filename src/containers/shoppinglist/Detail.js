import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getUserShoppingListDetail } from "../../dispatchers";
import { loginRequired } from "../auth/helpers";
import { backButton } from "../../components/common/BackButton";

class ShoppingListDetailComponent extends React.Component {

    componentWillMount = () => {
        const { isAuthenticated } = this.props.auth;
        switch (isAuthenticated) {
            case true:
                const shlId = this.props.match.params.id;
                this.props.getUserShoppingListDetail(this.props.history, shlId);
                return;

            case false:
                return this.props.history.push('/login');

            default:
                return this.props.history.push('/login');
        }
    };

    render() {

        if (this.props.shoppingList.shlDetail) {
            const { name,
                description,
                created_on,
                updated_on,
                total_items,
                bought_items,
                items_not_bought } = this.props.shoppingList.shlDetail;

            return (
                <div>

                    <h3 className="page-header text-center">{ name }</h3>

                    <div className="well">
                        { description }
                        <hr/>
                        <Link
                            className="btn btn-info btn-xs"
                            to={`/shoppinglists/${this.props.match.params.id}/items`}>
                            View Items
                        </Link>
                    </div>

                    <div className="shoppinglist-detail">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Created on</th>
                                <th>Updated on</th>
                                <th>Total Items</th>
                                <th>Items Bought</th>
                                <th>Items not Bought</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{ created_on }</td>
                                <td>{ updated_on }</td>
                                <td>{ total_items }</td>
                                <td>{ bought_items }</td>
                                <td>{ items_not_bought }</td>
                                <td>
                                    <Link
                                        className="btn btn-success btn-xs"
                                        to={`/shoppinglists/${this.props.match.params.id}/items/create`}>
                                        <span className="glyphicon glyphicon-plus-sign"></span> Add items
                                    </Link>
                                    <br/>
                                    <Link
                                        className="btn btn-info btn-xs"
                                        to={`/shoppinglists/${this.props.match.params.id}/edit`}>
                                        <span className="glyphicon glyphicon-pencil"></span> Edit
                                    </Link>
                                    <br/>
                                    <Link
                                        className="btn btn-danger btn-xs"
                                        to={`/shoppinglists/${this.props.match.params.id}/delete`}>
                                        <span className="glyphicon glyphicon-trash"></span> Delete
                                    </Link>
                                    <br/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Loading..</h1>
                </div>
            )
        }
    }
}

const mapStateToProps = ({shoppingList, shoppingItem, auth}) => {
    return {shoppingList, shoppingItem, auth}
}

const mapDispatchToProps = dispatch => {
    return {
        getUserShoppingListDetail: bindActionCreators(getUserShoppingListDetail, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(backButton(ShoppingListDetailComponent)));