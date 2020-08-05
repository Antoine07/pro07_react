import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import Denomination from './components/Denomination'

import reducer from './reducers/index'
import { setMemory } from './actions/actions-types'

// const middlewareMemory_v1 = store => next => action => {

// }

const middlewareMemory_v2 = store => {

  return next => {

    return action => {

      // 1. avant dispatch de l'action avant le code dans le reducer
      console.log('will dispatch', action)

      // l'algo dans le reducer est fait
      const returnValue = next(action)

      // 2. faire quelque chose après que l'algo dans le reducer est fait
      if (action.type === 'CALCUL_TOKENS') {
        const { d } = store.getState()

        // copy des tokens
        const tokens = new Map(d.tokens)
        const amount = tokens.get('amount')
        tokens.delete('amount')

        const day = (new Date()).toDateString()

        store.dispatch(setMemory({ day: day, amount: amount, tokens: tokens }))

      }

      return returnValue
    }
  }
}


const middlewares = [middlewareMemory_v2]

const store = createStore(reducer, applyMiddleware(...middlewares));

export default class App extends Component {

  render() {
    return (
      <Provider store={store} >
        <Denomination />
      </Provider>
    );
  }
}

