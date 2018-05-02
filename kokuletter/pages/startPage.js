import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import {
  checkLogin,
  setPersonalInfo,
  checkUserId,
} from './components/database.js';

export default class startPage extends Component {
  constructor(props) {
    super(props);

    this.id = {};
    this.state = {
      modalVisible: false,
      pushID: '',
      validation: '',
    };

    checkLogin((key) => {
      if(key){
        Actions.personalPage({
          userKey: key,
        });
        Actions.timeLine({
          userKey: key,
        });
      }
    });
  }

  _registerAction = () => {
    setPersonalInfo((key) => {
      Actions.personalPage({
        userKey: key,
      });
      Actions.timeLine({
        userKey: key,
      });
    });
  }

  _openForm = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  _loginAction = () => {
    checkUserId(this.state.pushID, (value) => {
      if(value){
        Actions.personalPage({
          userKey: this.state.pushID,
        });
        Actions.timeLine({
          userKey: this.state.pushID,
        });
        this.id.setNativeProps({ text: '' });
        this.setState({
          validation: '',
          modalVisible: !this.state.modalVisible,
        });
      }else{
        this.setState({validation: 'Not found'});
      }
    });
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.pageContainer}>
            <Text style={styles.text, {color: 'red', paddingHorizontal: 20}}>{this.state.validation}</Text>
            <TextInput
              style={styles.textInputUnderBar}
              placeholder='ID'
              autoCapitalize='none'
              multiline={false}
              autoFocus={true}
              ref={(ref) => { this.id = ref; }}
              onChangeText={(text) => {this.setState({pushID: text})}}
            />
            <TouchableOpacity style={styles.button} onPress={this._loginAction}>
              <Text style={styles.buttonText}>ログイン</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity style={styles.button} onPress={this._openForm}>
          <Text style={styles.buttonText}>アプリ以外で利用されている方</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._registerAction}>
          <Text style={styles.buttonText}>新規</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    borderWidth: 0.5,
    borderColor: '#d3d3d3',
    borderRadius: 2,
    backgroundColor: '#FFF',
  },
  textInputUnderBar: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderColor: '#d3d3d3',
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  button: {
    margin: 40,
  },
  text: {
    textAlign: 'center',
    backgroundColor: 'red',
  },
});
