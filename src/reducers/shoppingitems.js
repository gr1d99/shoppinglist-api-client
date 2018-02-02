import * as types from '../actions/ActionTypes'

export const initialState = {
    error_messages: '',
    error_message: '',
    success_message: '',
    shlItemDetail: {}
}

export const shoppingItem = (state=initialState, action) => {
    switch (action.type){
        case types.CREATE_SHOPPING_ITEM:
            return Object.assign({}, state, {
                success_message: action.payload.data.message,
                error_messages: '',
                error_message: ''
            });

        case types.CREATE_SHOPPING_ITEM_ERROR:
            if (action.payload.message) {
                return Object.assign({}, state, {
                    error_message: action.payload.message
                })
            } else {
                return Object.assign({}, state, {
                    error_messages: action.payload
                })
            }

        default:
            return state
    }
}