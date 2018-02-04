import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  // Timers,
} from 'react-native';
import Salsals from './Salsals.js';
import {
  getSalsal,
} from './components/database.js';

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.state = {
      salsalList: [],
      listUpdate: 0,
    };

    getSalsal((data) => {
      if(data){
        this.list.push(data);
        this.setState({
          salsalList: this.list,
          listUpdate: this.state.listUpdate + 1,
        });
      }
    });
  }

  good = (index) = () => {
    console.log('いいね'+index);
    // いいね関数をいれる
  }

  // reload = () => {
  //   getSalsal((data) => {
  //     this.setState({ salsalList: data });
  //   });
  // }

  render() {
    return (
      <View style={styles.pageContainer}>
        <FlatList
          data={this.state.salsalList}
          execData={this.state.listUpdate}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <Salsals onGood={this.good(index)} {...item} />}
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
