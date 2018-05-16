import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {
    Actions,
} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TimeLine from './timeLinePage.js';
import PersonalPage from './personalPage.js';
import header from './components/images/header.png';

export default class mainPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      viewPageNum: 0,
      listUpdate: 0,
      badge: false,
    }
  }

  render(){
    return(
      <Container>
        {(() => {
          if(this.state.viewPageNum == 0){
            return(
              <TimeLine
                image={header}
                userKey={this.props.userKey}
              />
            );
          }else{
            return(
              <PersonalPage
                image={header}
                userKey={this.props.userKey}
              />
            );
          }
        })()}
        <Footer>
          <FooterTab>
            <Button
              active={this.state.viewPageNum == 0 ? true : false}
              onPress={() => this.setState({viewPageNum: 0})}
            >
              <Icon active={this.state.viewPageNum == 0 ? true : false} name="home" />
            </Button>
            <Button
              active={this.state.viewPageNum == 1 ? true : false}
              onPress={() => this.setState({viewPageNum: 1})}
            >
              <Icon active={this.state.viewPageNum == 1 ? true : false} name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
