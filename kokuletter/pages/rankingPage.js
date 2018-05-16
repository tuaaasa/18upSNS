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
  Button,
  Icon,
  Body,
  Title,
  Fab,
  Spinner,
} from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Salsals from './Salsals.js';

export default class rankingPage extends Component {
  constructor(props){
    super(props);

    const rankingList = [];
    for(let i=0;i<this.props.salsalList.length;i++){
      if(this.props.salsalList[i].goodUserList && this.props.salsalList[i].goodUserList.length > 0){
        if(rankingList.length == 0){
          rankingList.push(this.props.salsalList[i]);
        }else{
          const maxLength = rankingList.length;
          for(let j=0;j<maxLength;j++){
            if(rankingList[j].goodUserList.length < this.props.salsalList[i].goodUserList.length){
              rankingList.splice(j, 0, this.props.salsalList[i]);
              break;
            }
          }
          if(maxLength == rankingList.length){
            rankingList.push(this.props.salsalList[i]);
          }
        }
      }
    }
    this.state = {
      rankingList: rankingList,
    }
  }

  render(){
    return(
      <Container>
        <Header>
          <Body>
            <Title>ランキング</Title>
          </Body>
        </Header>
        <ImageBackground
          style={{flex: 1}}
          source={this.props.image}
          resizeMode='cover'
        >
          <Content padder>
            <FlatList
              style={{flex: 1}}
              data={this.state.rankingList}
              execData={this.props.listUpdate}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
