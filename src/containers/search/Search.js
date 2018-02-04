import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';


import { loginRequired } from "../auth/helpers";
import { searchShoppingLists } from "../../dispatchers";


class SearchShoppingLists extends React.Component {
    constructor (props) {
        super(props);

        this.state = {term: ''}
    }

    handleSearchTermChange = (e) => {
        const key = e.target.name;
        let value = e.target.value;

        let obj = {};

        obj[key] = value;
        this.setState(obj);
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.searchShoppingLists(this.props.history, this.state.term)
    };

    componentWillUpdate = () => {
        console.log('update', this.props.search)
    };

    handleClick = url => e => {
        e.preventDefault();
        this.props.searchShoppingLists(this.props.history, '', url)
    };

    pageMetaData = (location) => {
        if (this.props.search.results) {
            const {
                items_in_page,
                current_page,
                next_page,
                total_pages,
                next_page_url,
                previous_page_url
            } = this.props.search.results;

            switch (location) {
                case 'up':
                    return (
                        <div className="pull-right">
                            <h4>{!isNaN(items_in_page) ? `${items_in_page} Items found` : ''}</h4>
                        </div>
                    );

                case 'down':
                    if (items_in_page > 0) {
                        return (
                            <div>
                                <button onClick={this.handleClick(next_page_url)} className="pull-right">Next Page { next_page }</button>
                                <span className="text-center">Page { current_page } of { total_pages }</span>
                                <button onClick={this.handleClick(previous_page_url)} className="pull-left">Previous Page</button>
                            </div>)
                    }

                    return '';

                default:
                    return ''
            }
        }
    };
    renderSearchResults = () => {
        if (this.props.search.results) {
            if (this.props.search.results.items_in_page !== 0) {
                return this.props.search.results.shoppinglists.map(
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
                                        <p className="text-justified"><Truncate lines={2} ellipsis={
                                            <span>...</span>}>{shl.description}</Truncate></p>
                                    </div>
                                    <div className="panel-footer"></div>
                                </div>
                            </div>
                        )
                    }
                )
            }
        }
    };

    render () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form className="navbar-form navbar-left" onSubmit={this.handleSearch}>
                        <div className="form-group">
                            <input type="text" name="term" onChange={this.handleSearchTermChange} className="form-control" placeholder="Search"/>
                        </div>
                        <button to='/shoppinglists/search'
                                type="submit"
                                className="btn btn-default">
                            Search
                        </button>
                    </form>
                    {this.pageMetaData('up')}
                </div>
                <div className="col-lg-12">
                    {this.renderSearchResults()}
                </div>
                <div className="col-lg-12">
                    {this.pageMetaData('down')}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({auth, search}) => {
    return {auth, search}
};

const mapDispatchToProps = dispatch => {
    return {
        searchShoppingLists: bindActionCreators(searchShoppingLists, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(loginRequired(SearchShoppingLists));