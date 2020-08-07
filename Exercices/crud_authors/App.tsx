import React, { useMemo, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ListRenderItem, SafeAreaView } from 'react-native'

import { ArrayDataAuthor, DataAuthor } from './types/author'

const App = () => {
  const [authors, setAuthors] = useState<ArrayDataAuthor | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);

  const fetchMemo = useMemo(
    () => {
      const fetchData = async () => {
        const results = await fetch("http://192.168.1.113:3000/authors")
        const data: ArrayDataAuthor = await results.json()
        setAuthors(data)
        console.log(data)
      }

      fetchData()
    },
    [authorId],
  )

  const renderSeparator : React.FunctionComponent<{ style : StyleSheet }> = () => {
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

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
})
