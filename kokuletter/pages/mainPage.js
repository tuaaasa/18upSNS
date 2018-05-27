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
import {
  referenceMessage,
} from './components/database.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TimeLine from './timeLinePage.js';
import PersonalPage from './personalPage.js';
import RankingPage from './rankingPage.js';
import header from './components/images/header.png';
import firebase from './components/firebase.js';

const db = firebase.database();
const ref = db.ref('salsals');
let date = new Date();

export default class mainPage extends Component {
  constructor(props){
    super(props);

    this.list = [];
    this.receiveList = [];
    this.state = {
      salsalList: this.list,
      receiveSalsalList: this.receiveList,
      listUpdate: 0,
      viewPageNum: 0,
      receiveListUpdate: 0,
      judgeListCount: 0,
      judgeReceiveListCount: 0,
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

    const userPath = 'users/'+this.props.userKey+'/receiveMessage';
    db.ref(userPath).on('child_added', (data) => {
      if(data.val()){
        referenceMessage(data.val(), (salsal) => {
          this.receiveList.push(salsal);
          this.setState({
            reseiveSalsalList: this.receiveList,
            receiveListUpdate: this.state.receiveListUpdate + 1,
          });
          if(this.state.viewPageNum == 1){
            this.setState({judgeReceiveListCount: this.state.receiveListUpdate});
          }
        });
      }
    });

    db.ref(userPath).on('child_changed', (data) => {
      if(data.val()){
        for(let i=0;i<this.state.receiveSalsalList;i++){
          if(this.state.receiveSalsalList[i].salsalKey.match(data.val())){
            this.receiveList.splice(i, 1);
            this.receiveList.splice(i, 0, {
              salsalKey: data.key,
              userKey: data.val().userKey,
              toName: data.val().toName,
              salsal: data.val().salsal,
              date: data.val().date,
              time: data.val().time,
              goodUserList: data.val().goodUserList,
            });
            this.setState({
              reseiveSalsalList: this.receiveList,
              receiveListUpdate: this.state.receiveListUpdate + 1,
            });
            if(this.state.viewPageNum == 1){
              this.setState({judgeReceiveListCount: this.state.receiveListUpdate});
            }
            break;
          }
        }
      }
    });

    db.ref(userPath).on('child_removed', (data) => {
      if(data.val()){
        for(let i=0;i<this.state.receiveSalsalList.length;i++){
          if(this.state.receiveSalsalList[i].salsalKey.match(data.val())){
            this.receiveList.splice(i, 1);
            this.setState({
              reseiveSalsalList: this.receiveList,
              receiveListUpdate: this.state.receiveListUpdate + 1,
            });
            if(this.state.viewPageNum == 1){
              this.setState({judgeReceiveListCount: this.state.receiveListUpdate});
            }
            break;
          }
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
          }else if(this.state.viewPageNum == 1){
            return(
              <PersonalPage
                image={header}
                salsalList={this.state.salsalList}
                listUpdate={this.state.listUpdate}
                receiveSalsalList={this.state.receiveSalsalList}
                receiveListUpdate={this.state.receiveListUpdate}
                userKey={this.props.userKey}
              />
            );
          }else{
            return(
              <RankingPage
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
              badge={this.state.viewPageNum != 0 && this.state.listUpdate != this.state.judgeListCount}
              vertical
              active={this.state.viewPageNum == 0}
              onPress={() => this.setState({
                viewPageNum: 0,
                judgeListCount: this.state.listUpdate,
              })}
            >
              {(() => {
                if(this.state.viewPageNum != 0 && this.state.listUpdate != this.state.judgeListCount){
                  return(
                    <Badge primary>
                      <Text> </Text>
                    </Badge>
                  );
                }
              })()}
              <Icon active={this.state.viewPageNum == 0} name="home" />
            </Button>
            <Button
              vertical
              active={this.state.viewPageNum == 2}
              onPress={() => this.setState({viewPageNum: 2})}
            >
              <Icon active={this.state.viewPageNum == 2} name="star" />
            </Button>
            <Button
              badge={this.state.viewPageNum != 1 && this.state.receiveListUpdate != this.state.judgeReceiveListCount}
              vertical
              active={this.state.viewPageNum == 1}
              onPress={() => this.setState({
                viewPageNum: 1,
                judgeReceiveListCount: this.state.receiveListUpdate,
              })}
            >
              {(() => {
                if(this.state.viewPageNum != 1 && this.state.receiveListUpdate != this.state.judgeReceiveListCount){
                  return(
                    <Badge primary>
                      <Text>
                        {this.state.receiveListUpdate-this.state.judgeReceiveListCount}
                      </Text>
                    </Badge>
                  );
                }
              })()}
              <Icon active={this.state.viewPageNum == 1} name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
