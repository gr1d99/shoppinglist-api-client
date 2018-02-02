import { combineReducers } from 'redux';

import auth from './auth';
import { shoppingList } from './shoppinglists';
import { shoppingItem} from "./shoppingitems";

export default combineReducers({auth, shoppingList, shoppingItem});