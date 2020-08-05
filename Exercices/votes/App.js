import React, { useReducer, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const initialState = {
  candidates: [],
  choices: [],
  count: 0,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHOICE':
      return {
        ...state,
        choices: [...state.choices, { choice: action.choice, id: action.id }],
        count: state.count + 1,
      };

    case 'LOAD_CANDIDATES':
      return {
        ...state,
        candidates: action.candidates,
        isLoading: action.isLoading,
      };

    case 'RESET':
      return {
        ...initialState,
        isLoading: action.isLoading,
      };

    default:
      return state;
  }
};

const screen = Dimensions.get('screen');

const Favorite = ({ choices, reset, dimensions }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={dimensions.screen.width > dimensions.screen.height ?  { marginTop: 0 } : { marginTop: 50 } }>
        <FlatList
          data={choices}
          renderItem={({ item }) => (
            <Text style={styles.btnStyle}>{item.choice}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity onPress={reset}>
        <Text style={styles.btnStylReset}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, candidates, choices, isLoading } = state;
  const [dimensions, setDimensions] = useState({ screen });

  const fetchPromiseAPI = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const candidates = [
          { choice_1: 'Alan', choice_2: 'Juliette', id: 1 },
          { choice_1: 'Phi', choice_2: 'Bernard', id: 2 },
          { choice_1: 'Lisa', choice_2: 'Elise', id: 3 },
          { choice_1: 'Cecilia', choice_2: 'Alice', id: 4 },
        ];
        resolve(candidates);
      }, 500);
    });

  useEffect(() => {
    const fetchData = async () => {
      const candidates = await fetchPromiseAPI();
      dispatch({
        type: 'LOAD_CANDIDATES',
        candidates: candidates,
        isLoading: false,
      });
    };

    if (isLoading) fetchData(); // si true on execute le fetch
  }, [isLoading]); // au chargement, et à chaque fois que status va être modifié

  const onChange = ({ screen }) => {
    setDimensions({ screen });
  };

  useEffect(() => {

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  const reset = () => dispatch({ type: 'RESET', isLoading: true });

  if (isLoading)
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );

  if (candidates && count < candidates.length) {
    const { choice_1, choice_2, id } = candidates[count];

    return (
      <SafeAreaView style={styles.container}>
      <Text>{dimensions.screen.width > dimensions.screen.height ?  "LANDSCAPE" : "PORTRAIT" }</Text>
        <Text>
          {
            'width' +
            dimensions.screen.width +
            'heigth' +
            dimensions.screen.height}
        </Text>
        <View
          style={ dimensions.screen.width > dimensions.screen.height ?  { marginTop: 0 } : { marginTop: 50 }}>
          {[choice_1, choice_2].map((choice, index) => (
            <TouchableOpacity
              onPress={() =>
                dispatch({ type: `CHOICE`, choice: choice, id: id })
              }
              key={index}>
              <Text style={styles.btnStyle}>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return <Favorite choices={choices} reset={reset} dimensions={dimensions} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    // textAlign: 'center',
    marginTop: 50,
  },
  btnStyle: {
    color: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    backgroundColor: '#f9c2ff',
  },
  btnStylReset: {
    color: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    backgroundColor: '#333',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
