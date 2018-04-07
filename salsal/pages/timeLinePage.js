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
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Salsals from './Salsals.js';
import {
  getSalsal,
  checkLogin,
  getLoginUser,
  getLocalSalsal,
  setLocalSalsal,
} from './components/database.js';
import firebase from './components/firebase.js';
import send from './components/images/send.png';

const db = firebase.database();
const ref = db.ref('salsals');
let date = new Date();

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.ref = {};
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
      loginUserKey: false,
      pushText: '',
    };

    ref.on('child_added', (data) => {
      this.list.unshift(data.val());
      this.setState({salsalList: this.list});
    });
  }

  good = (index) => () => {
    console.log(this.state.salsalList[index].salsal);
    // いいね関数をいれる
  }

  sendMessage = () => {
    if(this.state.pushText.length > 0){
      ref.push().set({
        salsal: this.state.pushText,
        date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
        time: date.getMinutes() > 9
              ? date.getHours()+':'+date.getMinutes()
              : date.getHours()+':0'+date.getMinutes(),
      });
      this.ref.setNativeProps({ text: '' });
      this.setState({pushText: ''});
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <FlatList
          style={{flex: 1}}
          data={this.state.salsalList}
          execData={this.state.listUpdate}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <Salsals onGood={this.good(index)} {...item} />}
        />
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            placeholder='投稿'
            autoCapitalize='none'
            maxHeight={40}
            multiline={true}
            ref={(ref) => { this.ref = ref; }}
            onChangeText={(text) => {this.setState({pushText: text})}}
          />
          <TouchableOpacity onPress={this.sendMessage}>
            <Image style={styles.image} source={send}/>
          </TouchableOpacity>
        </View>
        <KeyboardSpacer/>
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
  row: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 40,
  },
  textInput: {
    margin: 5,
    backgroundColor: '#d3d3d3',
    width: Dimensions.get('window').width-50,
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  image: {
    marginTop: 5,
  },
});
