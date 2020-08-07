import React, { useMemo } from 'react'
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'

import { useSelector, useDispatch, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

import { ArrayDataAuthor, DataAuthor, SystemStateAuthor, CombinateStateApp } from './types/author'

import { loadDataAuthorsAsync } from './actions/actions-types'

const store = createStore(reducer, applyMiddleware(thunk))

const App = () => {

  const dispatch = useDispatch()
  const { authors, authorId } = useSelector<CombinateStateApp, SystemStateAuthor>(state => state.author  )

  const fetchMemo = useMemo(
    () => {
      dispatch(loadDataAuthorsAsync())

    },
    [ authorId ],
  )

  const renderSeparator: React.FunctionComponent<{ style: StyleSheet }> = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
          marginTop: "5%",
          marginBottom: "5%"
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello</Text>
      {authors &&
        <FlatList<DataAuthor>
          data={authors}
          renderItem={({ item }: { item: DataAuthor }) => <Text style={{ height: 90, margin: 5 }}>Number :{item[1].number} Name : {item[1].name}</Text>}
          keyExtractor={((item: DataAuthor, index: number) => index.toString())}
          ItemSeparatorComponent={renderSeparator}
        // onEndReachedThreshold={0.5}
        // onEndReached={({ distanceFromEnd }) => {
        //   console.log('reload', distanceFromEnd)
        // }}

        />
      }
    </SafeAreaView>
  );
}

const WrapperApp = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default WrapperApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
})
