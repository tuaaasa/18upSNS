import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  keyToName,
} from './components/database.js';


export default class Salsals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'No Name',
    };

    keyToName(this.props.userKey, (userName) => {
      this.setState({ userName: userName });
    });
  }

  render() {
    const {
      salsal,
      date,
      time,
      onPress,
    } = this.props;
    console.log('あ');
    console.log(salsal);

    return (
      <View style={styles.rowStyle}>
        <View style={styles.textStetas}>
          <Text style={styles.infoText}>{this.state.userName+'  '+date+'  '+time}</Text>
          <Text style={styles.salsalText}>{salsal}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.btntext}>いいね</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    borderColor: '#CCC',
    borderWidth: 2,
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  textStetas: {
    flex: 6,
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    minHeight: 50,
  },
  infoText: {
    flex: 1,
    color: '#333',
  },
  salsalText: {
    flex: 3,
    color: '#333',
  },
  button: {
    flex: 1,
    backgroundColor: '#87cefa',
    padding: 10,
    margin: 20,
  },
  btntext: {
    textAlign: 'center',
  },
});
