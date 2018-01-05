import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  checkLogin,
  setPersonalInfo,
  loginUser,
  logoutUser,
} from './components/database.js';

export default class personalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginState: false,
    };

    checkLogin((value) => {
      this.setState({ loginState: value });
    });
  }

  logout = () => {
    logoutUser();
    this.setState({ loginState: false });
  }

  register = () => {
    setPersonalInfo(this.userName._lastNativeText, this.userPass._lastNativeText, (userKey) => {
      loginUser(userKey).then(() => {
        this.setState({ loginState: true });
      });
    });
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        {(() => {
          if(this.state.loginState){
            return (
              <View style={styles.pageContainer}>
                <Text style={styles.text}>個人ページ</Text>
                <TouchableOpacity onPress={this.logout}>
                  <Text style={styles.buttonText}>ログアウト</Text>
                </TouchableOpacity>
              </View>
            );
          }else{
            return (
              <View style={styles.pageContainer}>
                <Text style={styles.text}>名前</Text>
                <TextInput style={styles.textInput} ref={(ref) => { this.userName = ref; }}/>
                <Text style={styles.text}>パスワード</Text>
                <TextInput style={styles.textInput} ref={(ref) => { this.userPass = ref; }}/>
                <TouchableOpacity onPress={this.register}>
                  <Text style={styles.buttonText}>登録</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })()}
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
