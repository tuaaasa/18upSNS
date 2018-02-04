import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  getPersonalKey,
  loginUser,
  keyToName, //テスト
} from './components/database.js';
import {
    Actions,
} from 'react-native-router-flux';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {  //バリデーション設定が必要
    getPersonalKey(this.userName._lastNativeText, this.userPass._lastNativeText, (userKey) => {
      if(userKey){
        loginUser(userKey, (value) => {
          if(value){
            Actions.personalPage();
            Actions.refresh();
          }
        });
      }else{
        // ここにバリデーション
        console.log('ない');
      }
    });
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <Text style={styles.text}>名前</Text>
        <TextInput style={styles.textInput} ref={(ref) => { this.userName = ref; }}/>
        <Text style={styles.text}>パスワード</Text>
        <TextInput style={styles.textInput} ref={(ref) => { this.userPass = ref; }}/>
        <TouchableOpacity onPress={this._onPress}>
          <Text style={styles.buttonText}>ログイン</Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#2ECCFA',
    margin: 10,
    padding: 10,
  },
});
