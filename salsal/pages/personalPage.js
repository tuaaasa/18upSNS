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
  getLoginUser,
  getPersonalInfo,
} from './components/database.js';
// import RegisterPage from './RegisterPage.js';


export default class personalPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginState: false,
      personalInfo: [],
    };
  }

  componentDidMount = () => {
    if(this.state.loginState == false){
      checkLogin((value) => {
        if(value){
          getLoginUser((userKey) => {
            getPersonalInfo(userKey, (info) => {
              this.setState({
                loginState: value,
                personalInfo: info,
              });
            });
          });
        }
      });
    }
  }
  // -----------------------------------------
  //                キーバインド
  // -----------------------------------------
  logout = () => {
    logoutUser();
    this.setState({ loginState: false });
  }

  login = () => {
    Actions.LoginPage();
  }

  register = () => {
    Actions.RegisterPage();
  }

  render() {
    const info = this.state.personalInfo;

    return (
      <View style={styles.pageContainer}>
        {(() => {
          if(this.state.loginState){
            return (
              <View style={styles.pageContainer}>
                <Text style={styles.levelText}>{'Lv.'+info.level+'  '+info.userName}</Text>
                <Text style={styles.commentText}>{info.comment}</Text>
                <TouchableOpacity style={{ margin: 40 }} onPress={this.logout}>
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
  levelText: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  commentText: {
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
