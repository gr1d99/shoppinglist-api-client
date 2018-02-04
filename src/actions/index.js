import * as types from './ActionTypes'

// AUTHENTICATION ACTION CREATORS
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
    }
};

export const LoginUserError = error => {
    return {
        type: types.LOGIN_ERROR,
        payload: error.response.data
    }
};


export const LogoutUserSuccess = response => {
    localStorage.clear();
    return {
        type: types.LOGOUT,
    }
}

export const LogoutUserError = error => {
    return {
        type: types.LOGOUT_ERROR,
        payload: error.data
    }
}

export const fetchUserInfoSuccess = response => {
    return {
        type: types.USER_INFO,
        payload: response
    }
}

export const fetchUserInfoError = error => {
    return {
        type: types.USER_INFO_ERROR,
        payload: error.data
    }
}

export const updateUserInfoSuccess = response => {
    localStorage.clear();
    return {
        type: types.UPDATE_USER_INFO,
        payload: response
    }
}

export const updateUserInfoError = error => {
    return {
        type: types.USER_INFO_ERROR,
        payload: error.response.data
    }
}

export const getResetTokenSuccess = response => {
    return {
        type: types.GET_RESET_TOKEN,
        payload: response
    }
}

export const getResetTokenError = error => {
    return {
        type: types.GET_RESET_TOKEN_ERROR,
        payload: error.response.data
    }
}

export const resetPasswordSuccess = response => {
    return {
        type: types.RESET_PASSWORD,
        payload: response
    }
}

export const resetPasswordError = error => {
    return {
        type: types.RESET_PASSWORD_ERROR,
        payload: error.response.data
    }
}

// SHOPPING LISTS ACTION CREATORS
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

// SHOPPING ITEMS ACTION CREATORS
export const createShoppingItemSuccess = response => {
    return {
        type: types.CREATE_SHOPPING_ITEM,
        payload: response
    }
};

export const createShoppingItemError = error => {
    return {
        type: types.CREATE_SHOPPING_ITEM_ERROR,
        payload: error.response.data
    }
};

export const fetchShoppingItemsSuccess = response => {
    return {
        type: types.FETCH_SHOPPING_ITEMS,
        payload: response
    }
};

export const fetchShoppingItemsError = error => {
    return {
        type: types.FETCH_SHOPPING_ITEMS_ERROR,
        payload: error.response.data
    }
};

export const fetchShoppingItemDetailSuccess = response => {
    return {
        type: types.FETCH_SHOPPING_ITEM_DETAIL,
        payload: response
    }
};

export const fetchShoppingItemsDetailError = error => {
    return {
        type: types.FETCH_SHOPPING_ITEMS_ERROR,
        payload: error.response.data
    }
};

export const updateShoppingItemDetailSuccess = response => {
    return {
        type: types.UPDATE_SHOPPING_ITEM_DETAIL,
        payload: response
    }
};

export const updateShoppingItemsDetailError = error => {
    return {
        type: types.UPDATE_SHOPPING_ITEM_DETAIL_ERROR,
        payload: error.response.data
    }
};


export const itemToEditId = id => {
    return {
        type: types.ITEM_ID,
        payload: id
    }
}


// SHOPPING LISTS SEARCH ACTION CREATORS.
export const searchShoppingListsSuccess = response => {
    console.log('success', response)
    return {
        type: types.SEARCH,
        payload: response
    }
};

export const searchShoppingListsError = error => {
    return {
        type: types.SEARCH_ERROR,
        payload: error.response.data
    }
};


// ALERTS ACTION CREATORS
export const successfulOperation = msg => {
    return {
        type: types.SUCCESS_ALERT,
        payload: msg
    }
}

export const suspiciousOperation = error => {
    return {
        type: types.WARNING_ALERT,
        payload: error.response.data.message
    }
}

export const failedOperation = error => {
    let payload = null;
    if (error.response.data.message.token) {
        payload = error.response.data.message.token
    } else if(error.response.data.message.password) {
        payload = error.response.data.message.password
    } else {
        payload = error.response.data.message
    }

    return {
        type: types.ERROR_ALERT,
        payload: payload
    }
}

export const clearAlertMessage = () => {
    return {
        type: types.CLEAR_ALERT
    }
}

// actions creators for clearing intenal state such as form data after the
// operation has succeeded.
export const clearInternalState = () => {
    return {
        type: types.CLEAR_INTERNAL_STATE
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
// // Shopping ShoppingList CRUD action creators
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

