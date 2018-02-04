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
} from 'react-native-router-flux';
import {
  checkLogin,
  logoutUser,
} from './pages/components/database.js';
import timeLine from './pages/timeLinePage.js';
import rankingPage from './pages/rankingPage.js';
import themePage from './pages/themePage.js';
import favoriteUserListPage from './pages/favoriteUserListPage.js';
import personalPage from './pages/personalPage.js';
import TabIcon from './pages/components/TabIcon.js';
import themeNavBar from './pages/components/themeNavBar.js';
import RegisterPage from './pages/RegisterPage.js';
import LoginPage from './pages/LoginPage.js';


class App extends Component {
  render() {
    // logoutUser();
    return (
      <Router>
        <Stack key='root'>
          <Scene key='tabbar' tabs={true} tabBarStyle={styles.tabBar}>
            <Scene key='timeLine' initial={true} component={timeLine} title="タイムライン" icon={TabIcon}/>
            <Scene key='rankingPage' component={rankingPage} title="ランキング" icon={TabIcon}/>
            <Scene key='themePage' navBar={themeNavBar} component={themePage} title="お題" icon={TabIcon}/>
            <Scene key='favoriteUserListPage' component={favoriteUserListPage} title="お気に入り" icon={TabIcon}/>
            <Scene key='personalPage' component={personalPage} title="自分" icon={TabIcon}/>
          </Scene>
          <Scene key='RegisterPage' component={RegisterPage} title='新規登録'/>
          <Scene key='LoginPage' component={LoginPage} title='ログイン'/>
        </Stack>
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
