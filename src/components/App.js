import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '../containers/shoppinglist/List';
import SignUp from '../containers/auth/Signup';
import Login from '../containers/auth/Login';
import Logout from '../containers/auth/Logout';
import CreateShoppingList from '../containers/shoppinglist/Create';
import ShoppingListDetail from '../containers/shoppinglist/Detail';
import EditShoppingList from '../containers/shoppinglist/Edit';

import AppLinks, { ShoppingListsLink } from './includes/AppLinks';

import '../static/App.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <nav className="navbar navbar-default">
                    <div className="container container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Shopping List Client</Link>
                            <ShoppingListsLink isAuthenticated={this.props.auth.isAuthenticated}/>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <form className="navbar-form navbar-left">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search"/>
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                            <AppLinks isAuthenticated={this.props.auth.isAuthenticated}/>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={() => ('')}/>
                        <Route path="/signup" component={SignUp}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/shoppinglists/create" component={CreateShoppingList}/>
                        <Route path="/shoppinglists/:id/edit" component={EditShoppingList}/>
                        <Route path="/shoppinglists/:id" component={ShoppingListDetail}/>
                        <Route path="/shoppinglists" component={List}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = ({auth, shoppingList}) => {
    return {auth, shoppingList}
};

export default connect(mapStateToProps, null)(App)