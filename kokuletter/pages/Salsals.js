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
  removeSalsal,
} from './components/database.js';
import Swipeout from 'react-native-swipeout';
import firebase from './components/firebase.js';
// import menu from './components/images/menu.png';
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
    if(this.props.goodUserKey.match(this.props.userKey)){
      const swipeoutBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => {
          removeSalsal(this.props.salsalKey);
        },
      }];

      // <TouchableOpacity style={styles.button, styles.menu}>
      //   <Image style={styles.image} source={menu}/>
      // </TouchableOpacity>

      return(
        <Swipeout style={styles.whiteBack} right={swipeoutBtns}>
          <View style={styles.textStetas}>
            <View style={styles.toStyle}>
              <Text style={styles.toText}>{this.props.toName+'へ'}</Text>
            </View>
            <Text style={styles.salsalText}>{this.props.salsal}</Text>
            <View style={styles.infoStyle}>
              <Text style={styles.infoText}>{'  '+this.props.date+'  '+this.props.time}</Text>
              {(() => {
                if(this.props.goodUserList){
                  if(this.props.goodUserList.indexOf(this.props.goodUserKey) >= 0){
                    return(
                      <View style={styles.button}>
                        <Image style={styles.image} source={good_after}/>
                        <Text style={styles.goodCount}>{this.props.goodUserList.length}</Text>
                      </View>
                    );
                  }else{
                    return(
                      <TouchableOpacity style={styles.button} onPress={this.good}>
                        <Image style={styles.image} source={good_before}/>
                        <Text style={styles.goodCount}>{this.props.goodUserList.length}</Text>
                      </TouchableOpacity>
                    );
                  }
                }else{
                  return(
                    <TouchableOpacity style={styles.button} onPress={this.good}>
                      <Image style={styles.image} source={good_before}/>
                      <Text style={styles.goodCount}>0</Text>
                    </TouchableOpacity>
                  );
                }
              })()}
            </View>
          </View>
        </Swipeout>
      );
    }else{
      return (
        <View style={styles.textStetas}>
          <View style={styles.toStyle}>
            <Text style={styles.toText}>{this.props.toName+'へ'}</Text>
          </View>
          <Text style={styles.salsalText}>{this.props.salsal}</Text>
          <View style={styles.infoStyle}>
            <Text style={styles.infoText}>{'  '+this.props.date+'  '+this.props.time}</Text>
            {(() => {
              if(this.props.goodUserList){
                if(this.props.goodUserList.indexOf(this.props.goodUserKey) >= 0){
                  return(
                    <View style={styles.button}>
                      <Image style={styles.image} source={good_after}/>
                      <Text style={styles.goodCount}>{this.props.goodUserList.length}</Text>
                    </View>
                  );
                }else{
                  return(
                    <TouchableOpacity style={styles.button} onPress={this.good}>
                      <Image style={styles.image} source={good_before}/>
                      <Text style={styles.goodCount}>{this.props.goodUserList.length}</Text>
                    </TouchableOpacity>
                  );
                }
              }else{
                return(
                  <TouchableOpacity style={styles.button} onPress={this.good}>
                    <Image style={styles.image} source={good_before}/>
                    <Text style={styles.goodCount}>0</Text>
                  </TouchableOpacity>
                );
              }
            })()}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textStetas: {
    // flex: 6,
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    borderRadius: 2,
    // minHeight: 50,
  },
  toStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#d3d3d3',
  },
  toText: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 5,
    fontSize: 14,
  },
  salsalText: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  infoStyle: {
    borderTopWidth: 0.5,
    borderColor: '#d3d3d3',
    flexDirection: 'row',
  },
  infoText: {
    flex: 1,
    fontSize: 10,
    color: '#333',
  },
  button: {
    paddingRight: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  menu: {
    alignItems: 'center',
    marginRight: 5,
  },
  image: {
    backgroundColor: '#fff',
    width: 16,
    height: 16,
  },
  goodCount: {
    backgroundColor: '#fff',
    marginLeft: 3,
  },
  whiteBack: {
    backgroundColor: 'transparent',
  },
});
