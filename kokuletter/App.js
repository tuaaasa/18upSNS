import React, { Component } from 'react';
import {
    Scene,
    Router,
} from 'react-native-router-flux';
import {
  logoutUser,
  setRandMessage,
} from './pages/components/database.js';
import startPage from './pages/startPage.js';
import loginPage from './pages/loginPage.js';
import mainPage from './pages/mainPage.js';
import pushMessage from './pages/pushMessage.js';

class App extends Component {
  render() {
    // logoutUser();
    // setRandMessage();
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
