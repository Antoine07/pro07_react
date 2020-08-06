import React, { useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { initGame } from '../actions/actions-types';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {
  // Hook qui permet d'accéder à un store du combine reducer facilement à l'aide de sa clé (voir dans combineReducers pour les clés)
  const juniper = useSelector( state => state.juniper );
  const dispatch = useDispatch();

  useEffect(() => {
      // initialisation ou reload du jeu
      if(juniper.reload === true)
        dispatch(initGame());

  }, [juniper.reload])

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Score')}>
        <Text style={styles.buttonText}>Score</Text>
      </TouchableOpacity>
    </View>
  )
}
export default HomeScreen;