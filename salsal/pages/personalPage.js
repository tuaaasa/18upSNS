import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ParallaxView from 'react-native-parallax-view';
import {
  getSalsal,
} from './components/database.js';
import firebase from './components/firebase.js';
import Salsals from './Salsals.js';
// import RegisterPage from './RegisterPage.js';
import header from './components/images/header.png';
import back from './components/images/back_arrow.png';

const db = firebase.database();
const ref = db.ref('salsals');

export default class personalPage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
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

  // good = (index) => () => {
  //   setGood(this.props.userKey, this.state.salsalList[index].salsalKey);
  //   // いいね関数をいれる
  // }

  render() {
    const myList = [];
    const goodList = [];
    for(let i=0;i<this.state.salsalList.length;i++){
      if(this.state.salsalList[i].goodUserList){
        if(this.state.salsalList[i].goodUserList.indexOf(this.props.userKey) >= 0){
          goodList.push(this.state.salsalList[i]);
        }
      }
      if(this.state.salsalList[i].userKey.match(this.props.userKey)){
        myList.push(this.state.salsalList[i]);
      }
    }
    return (
      <ParallaxView
        style={{backgroundColor: '#fff'}}
        backgroundSource={header}
        windowHeight={120}
        header={(
          <View style={styles.header}>
            <Text style={styles.headerText}>{'ID : '+this.props.userKey}</Text>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={Actions.timeLine}>
                <Image style={styles.image} source={back}/>
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <ScrollableTabView locked={true}>
          <FlatList
            tabLabel='投稿'
            // style={{flex: 1}}
            data={myList}
            execData={this.state.listUpdate}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
          />
          <FlatList
            tabLabel='いいね'
            // style={{flex: 1}}
            data={goodList}
            execData={this.state.listUpdate}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
          />
        </ScrollableTabView>
      </ParallaxView>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    alignItems: 'flex-start',
  },
  header: {
    marginTop: (Platform.OS === 'ios') ? 20 : 10,
    flexDirection: 'row',
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: 120,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  image: {
    width: 26,
    height: 26,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    left: 5,
    top: 5,
  }
});
