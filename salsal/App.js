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
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     loginState: false,
  //     personalInfo: null,
  //     listUpdate: 0,
  //   };
  //
  //   if(this.state.loginState == false){
  //     checkLogin((value) => {
  //       if(value){
  //         getLoginUser((userKey) => {
  //           getPersonalInfo(userKey, (info) => {
  //             this.setState({
  //               loginState: true,
  //               personalInfo: info,
  //             });
  //             Actions.timeLine();
  //           });
  //         });
  //       }
  //     });
  //   }else{
  //     Actions.timeLine();
  //   }
  // }
  //
  // reload = () => {
  //   this.setState({ listUpdate: this.state.listUpdate + 1 });
  //   console.log('再更新回数:  '+this.state.listUpdate);
  // }

  render() {
    // logoutUser();
    // console.log(this.state.loginState);
    // <Scene key='startPage' initial={true} component={startPage} title='スタート画面'/>
    // <Scene key='personalPage' component={personalPage} title='プロフィール'/>
    // <Drawer key="drawer" contentComponent={DrawerContent} drawerWidth={ 300 } drawerImage={MenuIcon}>
    return (
      <Router>
        <Scene key="root" hideNavBar={ true }>
          <Scene key='tabbar' tabs={true} tabBarStyle={styles.tabBar}>
            <Scene key='timeLine' component={timeLine} title="タイムライン"/>
            <Scene key='chat' component={chat} title='チャット'/>
          </Scene>
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
