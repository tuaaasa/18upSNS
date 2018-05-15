import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {
    Scene,
    Router,
    Modal,
    Actions,
    Stack,
    Drawer,
} from 'react-native-router-flux';
import {
  checkLogin,
  logoutUser,
  getLoginUser,
  getPersonalInfo,
} from './pages/components/database.js';
import startPage from './pages/startPage.js';
import loginPage from './pages/loginPage.js';
import mainPage from './pages/mainPage.js';
import pushMessage from './pages/pushMessage.js';

class App extends Component {
  render() {
    logoutUser();
    return (
      <Router>
        <Scene key="root" hideNavBar={ true }>
          <Scene key='mainPage' component={mainPage}/>
          <Scene key='startPage' initial={true} component={startPage}/>
          <Scene key='loginPage' component={loginPage} title='ログイン'/>
          <Scene key='pushMessage' component={pushMessage} title='メッセージ'/>
        </Scene>
      </Router>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2ECCFA',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#FFF',
  },
});
