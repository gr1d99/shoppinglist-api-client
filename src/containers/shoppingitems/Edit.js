import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { updateShoppingList, getUserShoppingListDetail } from "../../dispatchers/index";
import SubmitButton  from '../../components/common/button';

class EditShoppingListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            price: '',
            quantity: '',
            bought: ''
        }

    }

    // componentWillMount = () => {
    //     const shlId = this.props.match.params.id
    //     this.props.getUserShoppingListDetail(this.props.history, shlId)
    //
    //     if (this.props.shoppingList.shlDetail) {
    //         const { name, description } = this.props.shoppingList.shlDetail;
    //         this.setState({name, description})
    //     }
    // }

    handleChange = e => {
        const key = e.target.name;
        const value = e.target.value;
        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSubmit = e => {
        const shlId = this.props.match.params.id
        e.preventDefault();
        this.props.updateShoppingList(
            this.props.history,
            shlId,
            this.state
        )
    };

    getErrorMessages = field => {
        if (this.props.shoppingList.error_messages) {
            if (this.props.shoppingList.error_messages.messages) {
                if (this.props.shoppingList.error_messages.messages.hasOwnProperty(field)) {
                    return (
                        this.props.shoppingList.error_messages.messages[field].map(error => {
                            return <p className="text-danger" key={error}>{error}</p>
                        })
                    )
                }
            }
        }
    };

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">

                <div className="thumbnail shoppinglist-edit">

                    <h3 className="text-center">Edit</h3>

                    <form className="form shopping-item-create" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                onChange={this.handleChange}
                                value={this.state.name}/>
                            {this.getErrorMessages('name')}
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                placeholder="Price"
                                onChange={this.handleChange}
                                value={this.state.price} step=".01"/>
                            {this.getErrorMessages('price')}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="quantity"
                                placeholder="Quantity description"
                                onChange={this.handleChange}
                                value={this.state.quantity}/>
                            {this.getErrorMessages('quantity')}
                        </div>

                        <SubmitButton
                            type='submit'
                            className='btn btn-success'
                            value='Submit' />

                    </form>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShoppingList: bindActionCreators(updateShoppingList, dispatch),
        getUserShoppingListDetail: bindActionCreators(getUserShoppingListDetail, dispatch),
    }
}

const mapStateToProps = ({shoppingList}) => {
    return {shoppingList}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShoppingListItem)