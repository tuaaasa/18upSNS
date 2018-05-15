import React, { Component } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
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
  Fab,
  View,
} from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Salsals from './Salsals.js';
import firebase from './components/firebase.js';

const db = firebase.database();
const ref = db.ref('salsals');
let date = new Date();

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);

    this.list = [];
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
      loginUserKey: false,
      active: false,
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
    return(
      <Container>
        <Header>
          <Body>
            <Title>タイムライン</Title>
          </Body>
        </Header>
        <Content padder>
          <FlatList
            style={{flex: 1}}
            data={this.state.salsalList}
            execData={this.state.listUpdate}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
          />
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => Actions.pushMessage({userKey: this.props.userKey})}
        >
          <Icon name='send'/>
        </Fab>
      </Container>
    );
  }
}
