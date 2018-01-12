import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import Salsals from './Salsals.js';
import {
  getSalsal,
} from './components/database.js';

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   salsalList: [],
    // };

    getSalsal((data) => {
      if(data){
        this.state = {
          salsalList: data,
        };
      }
    });
  }

  _onPress = (index) => {
    console.log('いいね'+index);
    // いいね関数をいれる
  }

  reload = () => {
    getSalsal((data) => {
      this.setState({ salsalList: data });
    });
  }

  render() {
    console.log(this.state.salsalList);
    return (
      <View style={styles.pageContainer}>
        <TouchableOpacity style={styles.button} onPress={this.reload}>
          <Text style={styles.btntext}>更新</Text>
        </TouchableOpacity>
        <Text style={styles.text}>タイムラインをここに表示しています</Text>
        <FlatList
          data={this.state.salsalList}
          renderItem={({ item, index }) => <Salsals onGood={this._onPress(index)} {...item} />}
          keyExtractor={(item, index) => index}
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
