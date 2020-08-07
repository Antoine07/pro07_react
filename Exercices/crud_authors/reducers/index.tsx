import { combineReducers, Reducer, CombinedState } from 'redux'

import author from './author'

import {  RootReducer } from '../types/author'

const rootReducer : RootReducer = combineReducers({
    author
})

export default rootReducer