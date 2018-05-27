import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Body,
  Left,
  Right,
  Form,
  Textarea,
  Item,
  Input,
  Title,
} from 'native-base';
import {
  Actions,
} from 'react-native-router-flux';
import {
  getSalsal,
  checkLogin,
  getLocalSalsal,
  setLocalSalsal,
  setGood,
  setRandMessage,
} from './components/database.js';
import firebase from './components/firebase.js';

const db = firebase.database();
const ref = db.ref('salsals');
let date = new Date();

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

  sendMessage = () => {
    // アラート→バリデーションに変更
    if(this.state.pushText.length > 0){
      let pushTo = this.state.pushTo;
      if(pushTo.length == 0){
        Alert.alert(
          '宛先を教えてください',
          '',
          [
            {
              text: 'Cancel',
              onPress: () => this.setState({
                pushText: '',
              }),
              style: 'cancel',
            },
            {text: 'OK'},
          ],
          { cancelable: false },
        );
      }else{
        const salsalKey = ref.push();
        setRandMessage(salsalKey.key, (key) => {
          const salsal = {
            salsal: this.state.pushText,
            toName: pushTo,
            userKey: this.props.userKey,
            sendUserKey: key,
            date: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            time: date.getMinutes() > 9
                  ? date.getHours()+':'+date.getMinutes()
                  : date.getHours()+':0'+date.getMinutes(),
          };
          salsalKey.set(salsal);
        });
        Actions.pop();
      }
    }else{
      Alert.alert(
        '本文を入力してください',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => this.setState({
              pushTo: '',
            }),
            style: 'cancel',
          },
          {text: 'OK'},
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    return(
      <Container style={{backgroundColor: '#fdf5e6'}}>
        <Header>
          <Left>
            <Button transparent onPress={Actions.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
          <Button transparent onPress={this.sendMessage}>
            <Icon name='send' />
          </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="宛先"
                ref={(ref) => { this.to = ref; }}
                onChangeText={(text) => {this.setState({pushTo: text})}}
              />
            </Item>
            <Textarea
              rowSpan={10}
              placeholder="本文"
              ref={(ref) => { this.main = ref; }}
              onChangeText={(text) => {this.setState({pushText: text})}}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
