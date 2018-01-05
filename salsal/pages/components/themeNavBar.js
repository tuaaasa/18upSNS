import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TextInput,
    Modal,
} from 'react-native';
import {setSalsal} from './database.js';

export default class themeNavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  _onPress = () => {
    this.setState({ modalVisible: true });
  }

  _onPressSend = () => {
    setSalsal(this.salsal._lastNativeText);
    // console.log(this.salsal._lastNativeText);
    this.setState({ modalVisible: false });
  }

  _onPressCancel = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType={'slide'} transparent = {false} visible = {this.state.modalVisible}>
          <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
            <View style={styles.sendAndCancel}>
              <TouchableOpacity style={styles.sendButton} onPress={this._onPressCancel}>
                <Text style={styles.alignLeft}> ×</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={this._onPressSend}>
              <Text style={styles.alignRight}>送信</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.alignLeft}>名前</Text>
              <TextInput style={styles.textInput} ref={(ref) => { this.salsal = ref; }}/>
            </View>
          </View>
        </Modal>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>{this.props.title}</Text>
        <TouchableOpacity style={styles.sendButton} onPress={this._onPress}>
          <Text style={styles.alignRight}>送信</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 35,
    backgroundColor: '#2ECCFA',
  },
  sendAndCancel: {
    backgroundColor: '#2ECCFA',
    height: (Platform.OS === 'ios') ? 64 : 54,
    flexDirection: 'row',
    paddingTop: 35,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  sendButton: {
    flex: 1,
    paddingRight: 10,
  },
  textInput: {
    flex: 5,
    backgroundColor: '#FFF',
    padding: 10,
    alignItems: 'stretch',
  },
  alignLeft: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
  },
  alignRight: {
    flex: 1,
    textAlign: 'right',
  },
});
