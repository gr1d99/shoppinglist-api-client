import * as types  from "../actions/ActionTypes";

let _auth = !(localStorage.getItem('apiKey') === null);

const Authenticate = (
    state={isAuthenticated: _auth}, action) => {
    console.log(action.type)
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {
                isAuthenticated: _auth
            });

        case types.LOGIN_ERROR:
            return {login_errors: action.payload}

        case types.SIGNUP:
            return {success_message: action.payload.data.message}

        case types.SIGNUP_ERROR:
            return {signup_errors: action.payload}

        case types.LOGOUT:
            localStorage.clear();
            return state;

        case types.LOGOUT_ERROR:
            return {login_error: action.payload}

        default:
            return state
    }
};

export default Authenticate;