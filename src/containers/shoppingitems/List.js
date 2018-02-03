import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchShoppingItems } from "../../dispatchers";

class List extends React.Component {

    componentDidMount = () => {
        console.log(this.props)
        const shlId = this.props.match.params.id;
        this.props.fetchShoppingItems(this.props.history, shlId)
    }

    renderShoppingItems = () => {
        const shlId = this.props.match.params.id;
        if (this.props.shoppingItem.items.shopping_items) {
            return this.props.shoppingItem.items.shopping_items.map(
                item => {
                    let { id, name, price, bought, quantity_description, created_on, updated_on } = item;
                    return (
                        <tr key={id}>
                            <td>{ name }</td>
                            <td>{ price }</td>
                            <td>{ bought ? 'True': 'False' }</td>
                            <td>{ quantity_description }</td>
                            <td>{ created_on }</td>
                            <td>{ updated_on }</td>
                            <td>
                                <Link id="btn edit-item"
                                      className='btn btn-info btn-xs'
                                      to={`../../shoppinglist/${shlId}/items/${id}/edit`}>
                                    Edit
                                </Link>
                                <Link id="btn edit-delete"
                                      className='btn btn-danger btn-xs'
                                      to={`../../shoppinglist/${shlId}/items/${id}/delete`}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    )
                }
            )
        }
    };

    render () {
        return (
            <div className="row">
                <div className="create-link text-center">
                    <Link className="btn btn-success btn-xs"
                          to={`../../shoppinglists/${this.props.match.params.id}/items/create`}>
                        <span className="glyphicon glyphicon-plus-sign">
                        </span> Add new</Link>
                    <br/>
                    <br/>
                </div>
                <div className="col-lg-12">
                    <table className="table table-hover">
                        <caption className="text-center">
                            <h4>Items</h4>
                        </caption>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Bought</th>
                            <th>Quantity Description</th>
                            <th>Date Added</th>
                            <th>Date Modified</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderShoppingItems()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shoppingItem}) => {
    return {shoppingItem}
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShoppingItems: bindActionCreators(fetchShoppingItems, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)