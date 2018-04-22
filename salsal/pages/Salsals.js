import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  setGood,
} from './components/database.js';
import firebase from './components/firebase.js';
import good_before from './components/images/good_before.png';
import good_after from './components/images/good_after.png';

const db = firebase.database();
const ref = db.ref('salsals');

export default class Salsals extends Component{
  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //   console.log(this.props.salsalKey);
  //   db.ref('salsals/'+this.props.salsalKey+'/goodUserList').on('child_added', (data) => {
  //     // console.log(data.val());
  //     this.list.push(data.val());
  //     this.setState({
  //       goodUserList: this.list,
  //     });
  //   })
  // }

  good = () => {
    console.log(this.props.salsalKey);
    setGood(this.props.goodUserKey, this.props.salsalKey);
    // いいね関数をいれる
  }

  render(){
    return (
      <View style={styles.rowStyle}>
        <View style={styles.textStetas}>
          <Text style={styles.infoText}>{'  '+this.props.date+'  '+this.props.time}</Text>
          <Text style={styles.salsalText}>{this.props.toName+'へ'}</Text>
          <Text style={styles.salsalText}>{this.props.salsal}</Text>
        </View>
        {(() => {
          if(this.props.goodUserList){
            if(this.props.goodUserList.indexOf(this.props.goodUserKey) >= 0){
              return(
                <View style={styles.good}>
                  <Image style={styles.image} source={good_after}/>
                  <Text>{this.props.goodUserList.length}</Text>
                </View>
              );
            }else{
              return(
                <TouchableOpacity style={styles.good} onPress={this.good}>
                  <Image style={styles.image} source={good_before}/>
                  <Text>{this.props.goodUserList.length}</Text>
                </TouchableOpacity>
              );
            }
          }else{
            return(
              <TouchableOpacity style={styles.good} onPress={this.good}>
                <Image style={styles.image} source={good_before}/>
                <Text>0</Text>
              </TouchableOpacity>
            );
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowStyle: {
    borderColor: '#CCC',
    borderWidth: 1,
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
  good: {
    flex: 1,
    margin: 15,
    alignItems: 'flex-end',
  },
  image: {
    width: 30,
    height: 30,
  },
});
