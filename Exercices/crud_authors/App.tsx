import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ListRenderItem } from 'react-native'

interface Author{
  'id' : string;
  'name' : string;
  "bio" : string;
  "shop_name" : string;
  "books" : string[];
}

const App = () => {
  const [authors, setAuthors] = useState<Author[]| null >(null);
  const [authorId, setAuthorId] = useState<string | null >(null);

  const fetchMemo = useMemo(
    () => {
      const fetchData = async () => {
        const results = await fetch("http://192.168.1.113:3000/authors")
        const data : Author[] = await results.json()

        setAuthors(data)
      }

      fetchData()
    },
    [authorId],
  )

  const renderSeparator = () => {
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {authors &&
        <FlatList<Author>
          data={authors}
          renderItem={ ({ item }: { item: Author })  => <Text>ID :{item.id} Name : {item.name}</Text>}
          keyExtractor={  ((item: Author, index: number)   => item.id  ) }
          ItemSeparatorComponent={renderSeparator}

        />
      }
    </View>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
