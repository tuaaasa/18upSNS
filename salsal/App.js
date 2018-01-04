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
import timeLine from './pages/timeLinePage.js';
import rankingPage from './pages/rankingPage.js';
import themePage from './pages/themePage.js';
import favoriteUserListPage from './pages/favoriteUserListPage.js';
import personalPage from './pages/personalPage.js';
import TabIcon from './pages/TabIcon.js';

// iosとandroidで分岐させたい時の書き方
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });



// 検索
// class rank extends Component {
//   render() {
//     return (
//       <TextInput style={styles.searchTextInput} ref={(ref) => {this.searchWord = ref;}}/>
//     );
//   }
// }

class App extends Component {
  render() {
    return (
      <Router>
        <Stack key='root'>
          <Scene key='tabbar' tabs={true}>
            <Scene key='timeLine' initial={true} component={timeLine} title="タイムライン" icon={TabIcon}/>
            <Scene key='rankingPage' component={rankingPage} title="ランキング" icon={TabIcon}/>
            <Scene key='themePage' component={themePage} title="お題" icon={TabIcon}/>
            <Scene key='favoriteUserListPage' component={favoriteUserListPage} title="お気に入り" icon={TabIcon}/>
            <Scene key='personalPage' component={personalPage} title="自分" icon={TabIcon}/>
          </Scene>
        </Stack>
      </Router>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  searchTextInput: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#FFF',
  },
});
