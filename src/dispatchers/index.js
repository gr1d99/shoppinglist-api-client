import axios from 'axios';

import * as actions from "../actions";

import { BASE_URL, API_PREFIX } from '../components/Defaults';

const URL = `${ BASE_URL }${ API_PREFIX }`;
const DEFAULT_HEADER = 'application/x-www-form-urlencoded';

export const registerUser = (history, data) => {
    const _prefix = '/auth/register';
    const registerData = new FormData();

    registerData.set('username', data.username);
    registerData.set('email', data.email);
    registerData.set('password', data.password);
    registerData.set('confirm', data.confirm);

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, registerData, {
                headers: {'Content-Type': DEFAULT_HEADER }
            })
            .then(response => {
                history.push('/signup');
                dispatch(actions.RegisterUserSuccess(response));
            })
            .catch(error => {
                history.push('/signup');
                dispatch(actions.RegisterUserError(error))
            })
    }
};


export const LoginUser = (history, data) => {
    const _prefix = '/auth/login';
    const loginData = new FormData();

    loginData.set('username', data.username);
    loginData.set('password', data.password);

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, loginData, {
                headers: {'Content-Type': DEFAULT_HEADER }
            })
            .then(response => {
                dispatch(actions.LoginUserSuccess(response));
                history.push("/")
                window.location.reload()
            })
            .catch(error => {
                dispatch(actions.LoginUserError(error));
                history.push("/login")
            })
    }
};

export const LogoutUser = (history) => {
    const _prefix = '/auth/logout';
    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.delete(
            `${URL}${_prefix}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                dispatch(actions.LogoutUserSuccess(response))
                history.push('/');
                window.location.reload()
            })
            .catch(error => {
                history.push('/');
                dispatch(actions.LogoutUserError(error))
            })
    }
};


// shoppinglists
export const createShoppingList = (history, data) => {
    const _prefix = '/shopping-lists';
    const newData = new FormData();

    newData.set('name', data.name);
    newData.set('description', data.description);

    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.post(
            `${URL}${_prefix}`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                const newId = response.data.data.id;
                dispatch(actions.createShoppingListSuccess(response));
                history.push(`/shoppinglists`)
            })
            .catch(error => {
                dispatch(actions.createShoppingListError(error));
                history.push(`/shoppinglists/create`)
            })
    }
};

export const getUserShoppingLists = (history) => {
    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');

    return dispatch => axios.get(
        `${URL}${_prefix}`, {
            headers: {
                'Content-Type': DEFAULT_HEADER,
                'x-access-token': apiKey
            }
        })
        .then(response => {
            history.push('/shoppinglists')
            dispatch(actions.fetchShoppingListSuccess(response));
        })
        .catch(error => {
            dispatch(actions.fetchShoppingListError(error));
            history.push('/shoppinglists')
        })
};

export const getUserShoppingListDetail = (history, id) => {
    const _prefix = '/shopping-lists';
    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.get(
            `${URL}${_prefix}/${id}`, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                dispatch(actions.getUserShoppingListSuccess(response))
            })
            .catch(error => {
                dispatch(actions.getUserShoppingListError(error))
                history.push('/shoppinglists')
            })
    }
};

export const updateShoppingList = (history, id, new_data) => {
        const _prefix = '/shopping-lists';
        const newData = new FormData();

        newData.set('name', new_data.name);
        newData.set('description', new_data.description);

        let apiKey = localStorage.getItem('apiKey');

        return dispatch => {
            axios.put(
                `${URL}${_prefix}/${id}`, newData, {
                    headers: {
                        'Content-Type': DEFAULT_HEADER,
                        'x-access-token': apiKey
                    }
                })
                .then(response => {
                    history.push(`/shoppinglists/${id}`);
                    dispatch(actions.updateShoppingListSuccess(response))
                })
                .catch(error => {
                    history.push(`/shoppinglists/${id}`);
                    dispatch(actions.updateShoppingListError(error))
                });
        }
};

export const createShoppingItem = (history, id, data) => {
    const _prefix = '/shopping-lists';
    const newData = new FormData();

    newData.set('name', data.name);
    newData.set('price', data.price);
    newData.set('quantity_description', data.description);

    let apiKey = localStorage.getItem('apiKey');

    return dispatch => {
        axios.post(
            `${URL}${_prefix}/${id}/shopping-items`, newData, {
                headers: {
                    'Content-Type': DEFAULT_HEADER,
                    'x-access-token': apiKey
                }
            })
            .then(response => {
                history.push(`/shoppinglists/${id}`);
                dispatch(actions.createShoppingItemSuccess(response))
            })
            .catch(error => {
                history.push(`/shoppinglists/${id}/items/create`);
                dispatch(actions.createShoppingItemError(error))
            })
    }
};
