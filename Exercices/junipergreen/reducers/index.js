import { persistCombineReducers } from 'redux-persist'

import AsyncStorage from '@react-native-community/async-storage'

import immutableTransform from 'redux-persist-transform-immutable'

import juniper from './juniper'
import score from './score'

const persistConfig = {
    transforms: [ immutableTransform() ],
    key: 'root', // clé unique pour la peristance de ton store
    storage: AsyncStorage, // quel storage on utilise 
}

export default persistCombineReducers(persistConfig, {
    juniper,
    score
})