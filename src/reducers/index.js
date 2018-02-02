import { combineReducers } from 'redux';

import auth from './auth';
import { shoppingList } from './shoppinglists';

export default combineReducers({auth, shoppingList});