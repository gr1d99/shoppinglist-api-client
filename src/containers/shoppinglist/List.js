import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

import { getUserShoppingLists } from "../../dispatchers";

class List extends React.Component {

    componentDidMount = () => {
        this.props.getUserShoppingLists(this.props.history)
    }


    displayAlerts = () => {
        if (this.props.shoppingList.success_message) {
            return (
                <div className="alert alert-success alert-dismissible" role="alert">
                    <button type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    {this.props.shoppingList.success_message}
                </div>
            )
        }
    };

    renderShoppingLists = () => {
        if (this.props.shoppingList.shopping_lists) {
            return this.props.shoppingList.shopping_lists.map(
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
    }

    render () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    {this.displayAlerts()}
                </div>
                <div className="create-link text-center">
                    <Link className="btn btn-success btn-xs" to="shoppinglists/create"><span className="glyphicon glyphicon-plus-sign"></span> Add new</Link>
                    <br/>
                    <br/>
                </div>
                <div className="col-lg-12">
                    {this.renderShoppingLists()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shoppingList}) => {
    return {shoppingList}
}

const mapDispatchToProps = dispatch => {
    return {
        getUserShoppingLists: bindActionCreators(getUserShoppingLists, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)