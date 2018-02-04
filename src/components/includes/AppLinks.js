import React from 'react';
import { Link } from 'react-router-dom';


const AppLinks = props => {
    if (props.isAuthenticated) {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        )
    } else {
        return (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        )
    }
}

export default AppLinks;

export const ShoppingListsLink = (props) => {
    if (props.isAuthenticated) {
        return (
            <ul className="nav navbar-nav">
                <li className="active"><Link to="/shoppinglists">My Shopping Lists <span className="sr-only">(current)</span></Link></li>
                <li><Link to='/shoppinglists/search'>Search</Link></li>

            </ul>
        )
    } else {
        return ''
    }
}