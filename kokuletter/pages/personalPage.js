import React, { Component } from 'react';
import {
  FlatList,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Body,
  Grid,
  Row,
  Title,
  Tabs,
  Tab,
} from 'native-base';
import {
    Actions,
} from 'react-native-router-flux';
import ParallaxView from 'react-native-parallax-view';
import {
  getSalsal,
} from './components/database.js';
import Salsals from './Salsals.js';

export default class personalPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const myList = [];
    const goodList = [];
    for(let i=0;i<this.props.salsalList.length;i++){
      if(this.props.salsalList[i].goodUserList){
        if(this.props.salsalList[i].goodUserList.indexOf(this.props.userKey) >= 0){
          goodList.push(this.props.salsalList[i]);
        }
      }
      if(this.props.salsalList[i].userKey.match(this.props.userKey)){
        myList.push(this.props.salsalList[i]);
      }
    }
    return(
      <Container>
        <ParallaxView
          style={{backgroundColor: '#fff'}}
          backgroundSource={this.props.image}
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
                execData={this.props.listUpdate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
              />
            </Tab>
            <Tab heading="受け取ったメッセージ">
              <FlatList
                data={this.props.receiveSalsalList}
                execData={this.props.receiveListUpdate}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
              />
            </Tab>
            <Tab heading="いいね">
              <FlatList
                data={goodList}
                execData={this.props.listUpdate}
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
