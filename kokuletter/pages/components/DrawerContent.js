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
        <View  style={styles.buttonStyle}>
          <TouchableOpacity onPress={Actions.personalPage}>
            <Text style={styles.buttonText}>プロフィール</Text>
          </TouchableOpacity>
        </View>
        <View  style={styles.buttonStyle}>
          <TouchableOpacity onPress={Actions.timeLine}>
            <Text style={styles.buttonText}>タイムライン</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 40 : 30,
    alignItems: 'flex-end',
    // backgroundColor: '#F5FCFF',
    alignItems: 'stretch',
  },
  buttonStyle: {
    margin: 10,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 2,
    backgroundColor: '#FFF',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'left',
    // backgroundColor: '#2ECCFA',
    margin: 5,
    padding: 10,
  },
});
