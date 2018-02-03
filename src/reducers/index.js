import { combineReducers } from 'redux';

import auth from './auth';
import { shoppingListReducer } from './shoppinglists';
import { shoppingItemReducer} from "./shoppingitems";
import { alertsReducer } from "./alerts";

export default combineReducers({
    auth,
    shoppingList: shoppingListReducer,
    shoppingItem: shoppingItemReducer,
    alerts: alertsReducer
});