import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image,
  Modal,
  Platform,
} from 'react-native';
import {
  setGood,
} from '../components/database.js';
import Salsals from '../Salsals.js';

export default class myList extends Component{
  constructor(props){
    super(props);

    const salsalList = [];
    for(let i=0;i<this.props.salsalList.length;i++){
      if(this.props.salsalList[i].userKey.match(this.props.userKey)){
        salsalList.push(this.props.salsalList[i]);
      }
    }

    this.state = {
      salsalList: salsalList,
      listUpdate: 0,
    };
  }

  good = (index) => () => {
    setGood(this.props.userKey, this.state.salsalList[index].salsalKey);
    // いいね関数をいれる
  }

  render(){
    return(
      <FlatList
        style={{flex: 1}}
        data={this.state.salsalList}
        execData={this.state.listUpdate}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} onGood={this.good(index)} {...item} />}
      />
    );
  }
}
