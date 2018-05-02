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
import timeLine from './pages/timeLinePage.js';
import chat from './pages/chat.js';
import themeNavBar from './pages/components/themeNavBar.js';
import startPage from './pages/startPage.js';
import personalPage from './pages/personalPage.js';
import MenuIcon from './pages/components/images/menu_burger.png';
import DrawerContent from './pages/components/DrawerContent.js';

class App extends Component {
  render() {
    // logoutUser();
    return (
      <Router>
        <Scene key="root" hideNavBar={ true }>
          <Drawer key="drawer"
            contentComponent={DrawerContent}
            drawerWidth={ 300 }
            drawerImage={MenuIcon}
          >
            <Scene key='timeLine' component={timeLine} title="タイムライン"/>
            <Scene key='personalPage' hideNavBar={ true } component={personalPage} title='プロフィール'/>
          </Drawer>
          <Scene key='startPage' initial={true} component={startPage} title='スタート画面'/>
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
