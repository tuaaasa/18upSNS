import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Badge,
  Text,
} from 'native-base';
import {
    Actions,
} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TimeLine from './timeLinePage.js';
import PersonalPage from './personalPage.js';
import header from './components/images/header.png';
import firebase from './components/firebase.js';

const db = firebase.database();
const ref = db.ref('salsals');
let date = new Date();

export default class mainPage extends Component {
  constructor(props){
    super(props);

    this.list = [];
    this.state = {
      salsalList: this.list,
      listUpdate: 0,
      viewPageNum: 0,
      listUpdate: 0,
      judgeListCount: 0,
      badge: false,
    }
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
      if(this.state.viewPageNum == 0){
        this.setState({judgeListCount: this.state.listUpdate});
      }
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
          if(this.state.viewPageNum == 0){
            this.setState({judgeListCount: this.state.listUpdate});
          }
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
          if(this.state.viewPageNum == 0){
            this.setState({judgeListCount: this.state.listUpdate});
          }
          break;
        }
      }
    });
  }

  render(){
    return(
      <Container>
        {(() => {
          if(this.state.viewPageNum == 0){
            return(
              <TimeLine
                image={header}
                salsalList={this.state.salsalList}
                listUpdate={this.state.listUpdate}
                userKey={this.props.userKey}
              />
            );
          }else{
            return(
              <PersonalPage
                image={header}
                salsalList={this.state.salsalList}
                listUpdate={this.state.listUpdate}
                userKey={this.props.userKey}
              />
            );
          }
        })()}
        <Footer>
          <FooterTab>
            <Button
              badge={this.state.viewPageNum == 1 && this.state.listUpdate != this.state.judgeListCount}
              vertical
              active={this.state.viewPageNum == 0}
              onPress={() => this.setState({
                viewPageNum: 0,
                judgeListCount: this.state.listUpdate,
              })}
            >
              {(() => {
                if(this.state.viewPageNum == 1 && this.state.listUpdate != this.state.judgeListCount){
                  return(
                    <Badge primary>
                      <Text>
                        {this.state.listUpdate-this.state.judgeListCount}
                      </Text>
                    </Badge>
                  );
                }
              })()}
              <Icon active={this.state.viewPageNum == 0} name="home" />
            </Button>
            <Button
              vertical
              active={this.state.viewPageNum == 1}
              onPress={() => this.setState({viewPageNum: 1})}
            >
              <Icon active={this.state.viewPageNum == 1} name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
