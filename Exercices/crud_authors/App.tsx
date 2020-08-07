import React, { useMemo, Dispatch, SetStateAction } from 'react'
import { Text, View, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'

import styles from './styles'
import { DataAuthor, SystemStateAuthor, CombinateStateApp } from './types/author'

import { useSelector, useDispatch, Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

import { loadDataAuthorsAsync, addAuthor, setAuthor } from './actions/actions-types'

const store = createStore(reducer, applyMiddleware(thunk))

const App = () => {

  const dispatch = useDispatch()
  const { authors, authorId, author, message } = useSelector<CombinateStateApp, SystemStateAuthor>(state => state.author)

  // memoisation de la fonction n'est recalculée que si authorId change
  const fetchMemo = useMemo(
    () => {
      dispatch(loadDataAuthorsAsync())
      console.log(authorId)
    },
    [authorId],
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
      <View style={styles.item}>
        <Text>Name : </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => dispatch(setAuthor(text))}
          value={author}
        />

        <Text>{author}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={(): any => dispatch(addAuthor({ name : author }))}
        >
          <Text>Add Author</Text>
        </TouchableOpacity>
        {message != '' && <Text>{message}</Text>}
      </View>
      <View style={styles.item}>
        <Text>Liste des auteurs</Text>
        {authors &&
          <FlatList<DataAuthor>
            data={authors}
            renderItem={({ item }: { item: DataAuthor }) => <Text style={styles.itemList}>Number :{item[1].number} Name : {item[1].name}</Text>}
            keyExtractor={((item: DataAuthor, index: number) => index.toString())}
            ItemSeparatorComponent={renderSeparator}
          // onEndReachedThreshold={0.5}
          // onEndReached={({ distanceFromEnd }) => {
          //   console.log('reload', distanceFromEnd)
          // }}

          />
        }
      </View>
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

