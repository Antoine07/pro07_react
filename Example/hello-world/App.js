import React, { useState } from 'react';

import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const App = () => {

  const [sentence, setSentence ] = useState('');

 // w && w.length  condition pour ne pas prendre les caractères vides de manière équivalente if( w ) return w.length 
  const calcul = sentence => sentence.split(' ').map( w => { if( w ) return w.length }  ).filter(w => w !="").join(' ');

  const onPressReverse = () => setSentence( sentence.split(' ').map( word => word.split('').reverse().join('')).join(' ') );

  return (
    <View style={styles.container}>
      <Text>Saisir un texte</Text>
      <View style={styles.blue}>
       <TextInput
        onChangeText={ sentence => setSentence(sentence) }
        defaultValue={sentence}
         style = {{borderWidth : 1.0, height: 50}}
        />
       </View>
        { sentence != '' && 
        <>
          <View style={styles.sky}>
            <Text> { /* sentence.split(' ').map( w => w && w.length ).join(' ') */ 
            calcul(sentence) 
            } </Text>
          </View>
          <View style={{marginTop : 10}}>
            <Button 
              onPress={onPressReverse}
              title="Reverse sentence"
            />
            <Text>{sentence}</Text>
          </View>
        </>
        }
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    blue: {
        height: 50,
        backgroundColor: 'powderblue'
    },
    sky: {
        height: 50,
        backgroundColor: 'skyblue',
        padding: 10, fontSize: 42
    }
});