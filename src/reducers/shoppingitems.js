import * as types from '../actions/ActionTypes'

export const initialState = {
    error_messages: '',
    shlItemDetail: {},
    items: []
}

export const shoppingItemReducer = (state=initialState, action) => {
    switch (action.type){
        case types.CREATE_SHOPPING_ITEM:
            return {};

        case types.CREATE_SHOPPING_ITEM_ERROR:
            return Object.assign({}, state, {
                error_messages: action.payload,
            });

        case types.FETCH_SHOPPING_ITEMS:
            return Object.assign({}, state, {
                error_messages: '',
                shlItemDetail: {},
                items: action.payload.data
            });

        case types.FETCH_SHOPPING_ITEMS_ERROR:
            return action.payload;

        default:
            return state
    }
}