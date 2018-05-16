import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Icon,
  Text,
  Body,
  Left,
  Right,
  Card,
  CardItem,
  // ActionSheet,
} from 'native-base';
import {
  setGood,
  removeSalsal,
} from './components/database.js';
// const BUTTONS = ["Delete", "Cancel"];

export default class Salsals extends Component{
  constructor(props){
    super(props);
  }

  alert = () => {
    // ActionSheet.show(
    //   {
    //     options: BUTTONS,
    //     cancelButtonIndex: 1,
    //     destructiveButtonIndex: 0,
    //     title: "メニュー",
    //   },
    //   buttonIndex => {
    //     if(buttonIndex == 0){
    //       removeSalsal(this.props.salsalKey);
    //     }
    //   }
    // );
    Alert.alert(
      '削除しますか',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => removeSalsal(this.props.salsalKey),
        },
      ],
      {cancelable: false},
    );
  }

  good = () => {
    setGood(this.props.goodUserKey, this.props.salsalKey);
    // いいね関数をいれる
  }

  render(){
    return(
      <Card>
        <CardItem bordered>
          <Left>
          <Text>{this.props.toName+'へ'}</Text>
          </Left>
          {(() => {
            if(this.props.goodUserKey.match(this.props.userKey)){
              return(
                <Right>
                  <Button small transparent onPress={this.alert}>
                    <Icon name='trash'/>
                  </Button>
                </Right>
              );
            }
          })()}
        </CardItem>
        <CardItem bordered>
          <Body>
            <Text>{this.props.salsal}</Text>
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <Left>
            <Text note>{this.props.date+'  '+this.props.time}</Text>
          </Left>
          <Right>
            <Button small transparent onPress={this.good}>
              {(() => {
                if(this.props.goodUserList){
                  if(this.props.goodUserList.indexOf(this.props.goodUserKey) >= 0){
                    return(<Icon active name="heart" style={{ color: '#ED4A6A' }}/>);
                  }else{
                    return(<Icon name="heart" style={{ color: '#ED4A6A' }}/>);
                  }
                }else{
                  return(<Icon name="heart" style={{ color: '#ED4A6A' }}/>);
                }
              })()}
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
