import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  // Timers,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import Salsals from './Salsals.js';
import {
  getSalsal,
  checkLogin,
  getLoginUser,
} from './components/database.js';

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
      loginUserKey: false,
    };

    if(this.state.listUpdate == 0){
      getSalsal((data) => {
        if(data){
          this.list.unshift(data);
          this.setState({
            salsalList: this.list,
            listUpdate: this.state.listUpdate + 1,
          });
        }
      });
    }

    checkLogin((value) => { //getSalsalと統合
      if(value){
        getLoginUser((userKey) => {
          this.setState({ loginUserKey: userKey });
        });
      }else{
        this.setState({ loginUserKey: false });
      }
    });
  }

  good = (index) => () => {
    console.log(this.state.salsalList[index].salsal);
    // いいね関数をいれる
  }

  render() {
    console.log(this.list.length);
    return (
      <View style={styles.pageContainer}>
        <FlatList
          data={this.state.salsalList}
          execData={this.state.listUpdate}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <Salsals onGood={this.good(index)} loginUser={this.state.loginUserKey} {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#87cefa',
    padding: 10,
    margin: 20,
  },
  btntext: {
    textAlign: 'center',
  },
});
