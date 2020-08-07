import { combineReducers, Reducer, CombinedState } from 'redux'

import author from './author'

import { SystemStateAuthor, SystemAction } from '../types/author'

const rootReducer : Reducer<CombinedState<{author : SystemStateAuthor}>, SystemAction > = combineReducers({
    author 
})

export default rootReducer 