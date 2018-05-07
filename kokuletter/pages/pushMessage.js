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

export default class pushMessage extends Component {
  constructor(props){
    super(props);

    this.to = {};
    this.main = {};
    this.state = {
      pushTo: '',
      pushText: '',
    };
  }

  render() {
    return(
      <View style={styles.pageContainer}>
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
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fdf5e6',
  },
});
