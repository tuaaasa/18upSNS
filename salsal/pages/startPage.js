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
} from './components/database.js';

export default class startPage extends Component {
  constructor(props) {
    super(props);

    checkLogin((value) => {
      if(value){
        Actions.timeLine();
      }
    });
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity style={{ margin: 40 }} onPress={Actions.timeLine}>
          <Text style={styles.buttonText}>ログイン</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 40 }} onPress={Actions.timeLine}>
          <Text style={styles.buttonText}>新規登録</Text>
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
