import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getUserShoppingListDetail } from "../../dispatchers";

class ShoppingListDetailComponent extends React.Component {

    componentWillMount = () => {
        const shlId = this.props.match.params.id;
        this.props.getUserShoppingListDetail(this.props.history, shlId)
    };

    render() {
        console.log(this.props);

        if (this.props.shoppingList.shlDetail) {
            const { name, description, created_on, updated_on, total_items, bought_items, items_not_bought } = this.props.shoppingList.shlDetail;
            return (
                <div>
                    <h3 className="page-header text-center">{ name }</h3>

                    <div className="well">
                        { description }
                        <hr/>
                        <Link
                            className="btn btn-info btn-xs"
                            to={`/shoppinglists/${this.props.match.params.id}/edit`}>
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
                                        to={`/shoppinglists/${this.props.match.params.id}/items/new`}>
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

const mapStateToProps = ({shoppingList}) => {
    return {shoppingList}
}

const mapDispatchToProps = dispatch => {
    return {
        getUserShoppingListDetail: bindActionCreators(getUserShoppingListDetail, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListDetailComponent);