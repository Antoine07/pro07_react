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
      containerLesson: {
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
      containerLoader: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
    });
  
    export default styles;