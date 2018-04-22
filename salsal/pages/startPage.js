import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import {
  checkLogin,
  setPersonalInfo,
} from './components/database.js';

export default class startPage extends Component {
  constructor(props) {
    super(props);

    checkLogin((key) => {
      if(key){
        Actions.personalPage({
          userKey: key,
        });
        Actions.timeLine({
          userKey: key,
        });
      }
    });
  }

  _registerAction = () => {
    setPersonalInfo((key) => {
      Actions.personalPage({
        userKey: key,
      });
      Actions.timeLine({
        userKey: key,
      });
    });
  }

  // _loginAction = () => {
  //
  // }

  render() {
    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity style={{ margin: 40 }} onPress={Actions.timeLine}>
          <Text style={styles.buttonText}>アプリ以外で利用されている方</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 40 }} onPress={this._registerAction}>
          <Text style={styles.buttonText}>新規</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignItems: 'stretch',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#2ECCFA',
    margin: 10,
    padding: 10,
  },
});
