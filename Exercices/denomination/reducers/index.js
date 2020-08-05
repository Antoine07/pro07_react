import { combineReducers } from 'redux';

import denomination from './denomination';
import memory from './memory';
import counter from './counter';

export default combineReducers({
    d : denomination,
    m : memory,
    c: counter
})