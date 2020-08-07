
import {
  StyleSheet
} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
    margin: 10
  },
  item: {
    width: '45%', // is 50% of container width
    margin : "2%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  itemList : {
    margin : 10,
    height : 40
  }
})