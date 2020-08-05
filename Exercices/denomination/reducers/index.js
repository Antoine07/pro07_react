import { combineReducers } from 'redux';

import denomination from './denomination';
import memory from './memory';

export default combineReducers({
    d : denomination,
    m : memory
})