import { combineReducers, Reducer } from 'redux'

import author from './author'

import { SystemState } from '../types/author'

const rootReducer : Reducer<any>  = combineReducers({
    author : SystemState
})

export default rootReducer 