import {
    StyleSheet
  } from 'react-native';
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#222',
      borderRadius: 5,
      padding: 10,
      margin: 20
    },
    containerStudent: {
      padding: 5,
      margin: 10
    },
    buttonText: {
      fontSize: 20,
      color: '#fff'
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    choices: {
      flex: 1,
      paddingTop: 22,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    itemChoice: {
      width: '50%' // is 50% of container width
    },
    number: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    paragraph: {
      paddingHorizontal: 20,
      fontSize: 20,
      marginBottom: 5
    }
  });
  
  export default styles;