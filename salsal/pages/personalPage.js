import React, { Component } from 'react';
import {
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
  loginUser,
  logoutUser,
} from './components/database.js';
// import RegisterPage from './RegisterPage.js';


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
  // -----------------------------------------
  //                キーバインド
  // -----------------------------------------
  // onSetState = (value) => {
  //   this.setState({ loginState: value });
  // }
  //
  logout = () => {
    logoutUser();
    this.props.onSetState(false);
  }

  login = () => {
    Actions.LoginPage();
  }

  register = () => {
    Actions.RegisterPage();
  }
  //
  // register = (userName, userPass) => {
  //   setPersonalInfo(userName, userPass, (userKey) => {
  //     loginUser(userKey, (value) => {
  //       this.onSetState(value);
  //     });
  //   });
  // }

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
                <TouchableOpacity onPress={this.login}>
                  <Text style={styles.buttonText}>ログイン</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.register}>
                  <Text style={styles.buttonText}>新規登録</Text>
                </TouchableOpacity>
              </View>
            );
            // return (
            //   <RegisterPage onPress={this.register}/>
            // );
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
