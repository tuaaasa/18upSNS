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
import Salsals from '../Salsals.js';

export default class myList extends Component{
  constructor(props){
    super(props);

    const salsalList = [];
    for(let i=0;i<this.props.salsalList.length;i++){
      if(this.props.salsalList[i].goodUserList){
        if(this.props.salsalList[i].goodUserList.indexOf(this.props.userKey) >= 0){
          salsalList.push(this.props.salsalList[i]);
        }
      }
    }

    this.state = {
      salsalList: salsalList,
      listUpdate: 0,
    };
  }

  good = (index) => () => {
    console.log(this.state.salsalList[index].salsal);
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
