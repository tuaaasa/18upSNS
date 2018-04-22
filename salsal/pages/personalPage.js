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
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ParallaxView from 'react-native-parallax-view';
import {
  getSalsal,
} from './components/database.js';
import MyList from './profileTabs/myList.js';
import GoodList from './profileTabs/goodList.js';
// import RegisterPage from './RegisterPage.js';
import header from './components/images/header.png';
import back from './components/images/back_arrow.png';


export default class personalPage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
    };

    getSalsal((value) => {
      if(value){
        this.list.unshift(value);
        this.setState({
          salsalList: this.list,
          listUpdate: this.state.listUpdate + 1,
        });
      }
    });
  }
  // <View style={styles.pageContainer}>
  //   <Image style={styles.headerImage} resizeMode='center' source={header}/>
  // </View>

  render() {
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
        <ScrollableTabView>
          <MyList tabLabel='投稿' salsalList={this.state.salsalList} userKey={this.props.userKey}/>
          <GoodList tabLabel='いいね' salsalList={this.state.salsalList} userKey={this.props.userKey}/>
        </ScrollableTabView>
      </ParallaxView>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#F5FCFF',
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
    width: 20,
    height: 20,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    left: 5,
    top: 5,
  }
});
