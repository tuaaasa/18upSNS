import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
  // Timers,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';

export default class chat extends Component {
  constructor(props){
    super(props);
  };

  render() {
    return (
      <View>
        <Text>チャットスペース</Text>
      </View>
    );
  }
}
