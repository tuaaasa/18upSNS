import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity onPress={Actions.personalPage}>
          <Text style={styles.buttonText}>プロフィール</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.timeLine}>
          <Text style={styles.buttonText}>タイムライン</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: (Platform.OS === 'ios') ? 20 : 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignItems: 'stretch',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#2ECCFA',
    margin: 5,
    padding: 10,
  },
});
