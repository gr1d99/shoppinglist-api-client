import * as types  from "../actions/ActionTypes";

let _auth = !(localStorage.getItem('apiKey') === null);

const Authenticate = (
    state={isAuthenticated: _auth, userDetail: null}, action) => {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {
                isAuthenticated: _auth
            });

        case types.LOGIN_ERROR:
            return {login_errors: action.payload};

        case types.SIGNUP:
            return {success_message: action.payload.data.message};

        case types.SIGNUP_ERROR:
            return {signup_errors: action.payload};

        case types.LOGOUT:
            return state;

        case types.LOGOUT_ERROR:
            return {login_error: action.payload};

        case types.USER_INFO:
            return Object.assign({}, state, {
                userDetail: action.payload.data.data
            });

        case types.USER_INFO_ERROR:
            return action.payload;

        default:
            return state
    }
};

export default Authenticate;