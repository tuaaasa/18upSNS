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
  ImageBackground,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Salsals from './Salsals.js';
import {
  getSalsal,
  checkLogin,
  getLocalSalsal,
  setLocalSalsal,
  setGood,
} from './components/database.js';
import firebase from './components/firebase.js';
import send from './components/images/send.png';
import back from './components/images/back.png';
import header from './components/images/header.png';
import letter from './components/images/letter.png';

const db = firebase.database();
const ref = db.ref('salsals');
let date = new Date();

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.to = {};
    this.main = {};
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
      loginUserKey: false,
      pushTo: '',
      pushText: '',
      modalVisible: false,
    };
  }

  componentDidMount(){
    ref.on('child_added', (data) => {
      this.list.unshift({
        salsalKey: data.key,
        userKey: data.val().userKey,
        toName: data.val().toName,
        salsal: data.val().salsal,
        date: data.val().date,
        time: data.val().time,
        goodUserList: data.val().goodUserList,
      });
      this.setState({
        salsalList: this.list,
        listUpdate: this.state.listUpdate + 1,
      });
    });

    ref.on('child_changed', (data) => {
      for(let i=0;i<this.state.salsalList.length;i++){
        if(this.state.salsalList[i].salsalKey.match(data.key)){
          this.list.splice(i, 1);
          this.list.splice(i, 0, {
            salsalKey: data.key,
            userKey: data.val().userKey,
            toName: data.val().toName,
            salsal: data.val().salsal,
            date: data.val().date,
            time: data.val().time,
            goodUserList: data.val().goodUserList,
          });
          this.setState({
            salsalList: this.list,
            listUpdate: this.state.listUpdate + 1,
          });
          break;
        }
      }
    });

    ref.on('child_removed', (data) => {
      for(let i=0;i<this.state.salsalList.length;i++){
        if(this.state.salsalList[i].salsalKey.match(data.key)){
          this.list.splice(i, 1);
          this.setState({
            salsalList: this.list,
            listUpdate: this.state.listUpdate + 1,
          });
          break;
        }
      }
    });
  }

  sendMessage = () => {
    if(this.state.pushText.length > 0){
      let pushTo = this.state.pushTo;
      if(pushTo.length == 0){
        Alert.alert(
          '宛先を教えてください',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => this.setState({
                pushText: '',
                modalVisible: !this.state.modalVisible,
              }),
              style: 'cancel',
            },
            {text: 'OK'},
          ],
          { cancelable: false },
        );
      }else{
        ref.push().set({
          salsal: this.state.pushText,
          toName: pushTo,
          userKey: this.props.userKey,
          date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
          time: date.getMinutes() > 9
                ? date.getHours()+':'+date.getMinutes()
                : date.getHours()+':0'+date.getMinutes(),
        });
        this.to.setNativeProps({ text: '' });
        this.main.setNativeProps({ text: '' });
        this.setState({
          pushText: '',
          pushTo: '',
          modalVisible: !this.state.modalVisible,
        });
      }
    }else{
      Alert.alert(
        '本文を入力してください',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => this.setState({
              pushTo: '',
              modalVisible: !this.state.modalVisible,
            }),
            style: 'cancel',
          },
          {text: 'OK'},
        ],
        { cancelable: false },
      );
    }
  }

  back = () => {
    this.setState({modalVisible: !this.state.modalVisible});
    this.to.setNativeProps({ text: '' });
    this.main.setNativeProps({ text: '' });
  }

  modalSwitch = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <ImageBackground style={{flex: 1}} resizeMode={'stretch'} source={header}>
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={styles.pageContainer}>
              <View style={styles.navber}>
                <TouchableOpacity onPress={this.back}>
                  <Image style={styles.navImage} source={back}/>
                </TouchableOpacity>
                <Text style={styles.navText}>メッセージ</Text>
                <TouchableOpacity onPress={this.sendMessage}>
                  <Image style={styles.navImage} source={send}/>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.textInputUnderBar}
                placeholder='Dear'
                autoCapitalize='none'
                multiline={false}
                ref={(ref) => { this.to = ref; }}
                onChangeText={(text) => {this.setState({pushTo: text})}}
              />
              <TextInput
                style={styles.textInputMain}
                placeholder='本文'
                autoCapitalize='none'
                multiline={true}
                ref={(ref) => { this.main = ref; }}
                onChangeText={(text) => {this.setState({pushText: text})}}
              />
            </View>
          </Modal>
          {(() => {
            if(this.state.salsalList.length == 0){
              return(<ActivityIndicator size="large"/>);
            }
          })()}
          <FlatList
            style={{flex: 1}}
            data={this.state.salsalList}
            execData={this.state.listUpdate}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
          />
          <View style={styles.sendButton}>
            <TouchableOpacity onPress={this.modalSwitch}>
              <Image style={styles.image} source={send}/>
            </TouchableOpacity>
          </View>
          <KeyboardSpacer/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fdf5e6',
  },
  navber: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: (Platform.OS === 'ios') ? 40 : 30,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  navText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  navImage: {
    margin: 10,
    width: 20,
    height: 20,
  },
  textInputUnderBar: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: '#d3d3d3',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  textInputMain: {
    padding: 10,
    fontSize: 22,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  image: {
    margin: 15,
    width: 60,
    height: 60,
  },
  sendButton: {
    position: 'absolute',
    zIndex: 1,
    top: Dimensions.get('window').height-185,
    left: Dimensions.get('window').width-110,
  }
});
