import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Body,
  Left,
  Right,
  Grid,
  Col,
  Row,
　List,
  Card,
  CardItem,
  ListItem,
  Title,
  Tabs,
  Tab,
} from 'native-base';
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
    return(
      <Container>
        <ParallaxView
          style={{backgroundColor: '#fff'}}
          backgroundSource={header}
          windowHeight={120}
          header={(
            <Grid>
              <Row>
                <Body>
                  <Title>{'ID : '+this.props.userKey}</Title>
                </Body>
              </Row>
            </Grid>
          )}
        >
          <Tabs initialPage={0}>
            <Tab heading="投稿">
              <FlatList
                data={myList}
                execData={this.state.listUpdate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
              />
            </Tab>
            <Tab heading="いいね">
              <FlatList
                data={goodList}
                execData={this.state.listUpdate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
              />
            </Tab>
          </Tabs>
        </ParallaxView>
      </Container>
    );
  }
}
