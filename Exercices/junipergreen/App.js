import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/index'

import thunk from 'redux-thunk'

import { persistStore } from 'redux-persist' // module permettant de faire de la persistance
import { PersistGate } from 'redux-persist/integration/react' // ré-hydrate l'arbre

import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import ScoreScreen from './screens/ScoreScreen'

const Stack = createStackNavigator()

const storageScoreMiddleware = store => next => action => {

  const returnValue = next(action)
  const { juniper, score } = store.getState()

  if ( juniper.choices.size > 0 &&  juniper.valid.size === 0 && score.status === true) {
    store.dispatch({ 
      type: 'SAVE_SCORE', 
      scores : juniper.choices,
      winner : juniper.winner
    })
  }

  return returnValue
}

// plusieurs middleware dans un tableau
const middlewares = [ storageScoreMiddleware, thunk ]

const store = createStore(
  reducer, applyMiddleware( ...middlewares )
)

const Nav = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const App = () => {
  let persistor = persistStore(store);
  // persistor.purge(); // pour le dev on reload le store pour ré-hydrater l'app

  return (
    <Provider store={store} >
      <PersistGate  persistor={persistor}>
        <Nav />
      </PersistGate>
    </Provider >
  );
}

export default App