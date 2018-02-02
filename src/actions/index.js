import * as types from './ActionTypes'


export const RegisterUserSuccess = response => {
    return {
        type: types.SIGNUP,
        payload: response
    }
};

export const RegisterUserError = error => {
    return {
        type: types.SIGNUP_ERROR,
        payload: error.response.data
    }
};

export const LoginUserSuccess = response => {
    let apiKey = response.data.data.auth_token;
    localStorage.setItem('apiKey', apiKey);
    return {
        type: types.LOGIN,
        payload: response
    }
};

export const LoginUserError = error => {
    return {
        type: types.LOGIN_ERROR,
        payload: error.response.data
    }
};


export const LogoutUserSuccess = response => {
    return {
        type: types.LOGOUT,
        payload: response
    }
}

export const LogoutUserError = error => {
    return {
        type: types.LOGOUT_ERROR,
        payload: error.data
    }
}

export const createShoppingListSuccess = response => {
    return {
        type: types.CREATE_SHOPPINGLIST,
        payload: response
    }
};

export const createShoppingListError = error => {
    return {
        type: types.CREATE_SHOPPINGLIST_ERROR,
        payload: error.response.data
    }
};

export const fetchShoppingListSuccess = response => {
    return {
        type: types.FETCH_SHOPPINGLISTS,
        payload: response
    }
};

export const fetchShoppingListError = error => {
    return {
        type: types.FETCH_SHOPPINGLISTS_ERROR,
        payload: error.response
    }
};

export const getUserShoppingListSuccess = response => {
    return {
        type: types.SHOPPINGLIST_DETAIL,
        payload: response
    }
};

export const getUserShoppingListError = error => {
    return {
        type: types.SHOPPINGLIST_DETAIL_ERROR,
        payload: error.response
    }
};


export const updateShoppingListSuccess = response => {
    return {
        type: types.UPDATE_SHOPPINGLIST,
        payload: response
    }
};

export const updateShoppingListError = error => {
    return {
        type: types.UPDATE_SHOPPINGLIST_ERROR,
        payload: error.response
    }
};





// export const getUserInfo = () => {
//     const _prefix = '/auth/users';
//     let apiKey = localStorage.getItem('apiKey');
//
//     const request = axios.get(
//         `${URL}${_prefix}`, {
//             headers: {
//                 'Content-Type': DEFAULT_HEADER,
//                 'x-access-token': apiKey
//             }
//         });
//
//     return {
//         type: actions.USER_INFO,
//         payload: request
//     }
// };
//
// // Shopping List CRUD action creators
//




//
// export const deleteShoppingList = (id, data) => {
//     const _prefix = '/shopping-lists';
//     const waitingData = new FormData();
//
//     waitingData.set('name', data.name);
//
//     let apiKey = localStorage.getItem('apiKey');
//
//     let url = `${URL}${_prefix}/${id}`;
//
//     const request = axios({
//         url: url,
//         method: 'delete',
//         data: {name: data.name},
//         headers: {
//             'Content-Type': DEFAULT_HEADER,
//             'x-access-token': apiKey
//         }
//     });
//
//     return {
//         type: actions.DELETE_SHOPPINGLIST,
//         payload: request
//     }
// };
//
// export const createShoppingItem = (id, data) => {
//     const _prefix = '/shopping-lists';
//     const newData = new FormData();
//
//     newData.set('name', data.name);
//     newData.set('price', data.price);
//     newData.set('quantity_description', data.description);
//
//     let apiKey = localStorage.getItem('apiKey');
//
//     const request = axios.post(
//         `${URL}${_prefix}/${id}/shopping-items`, newData, {
//             headers: {
//                 'Content-Type': DEFAULT_HEADER,
//                 'x-access-token': apiKey
//             }
//         });
//
//     return {
//         type: actions.CREATE_SHOPPING_ITEM,
//         payload: request
//     }
// };
//
