import React, { Component } from 'react';
import {
    Actions,
    ActionConst,
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
} from 'native-base';
import {
  checkLogin,
  setPersonalInfo,
} from './components/database.js';

export default class startPage extends Component {
  constructor(props) {
    super(props);

    this.id = {};
    this.state = {
      modalVisible: false,
      pushID: '',
      validation: '',
    };


  }

  componentWillMount(){
    checkLogin((key) => {
      if(key){
        Actions.mainPage({
          userKey: key,
        });
      }
    });
  }

  _registerAction = () => {
    setPersonalInfo((key) => {
      Actions.timeLine({
        userKey: key,
      });
    });
  }

  _loginAction = () => {
    Actions.loginPage();
  }

  render() {
    return (
      <Container>
        <Header/>
        <Content padder>
          <Grid>
            <Col>
              <Body>
                <Button onPress={this._loginAction}>
                  <Text>
                    Sign in
                  </Text>
                </Button>
              </Body>
            </Col>
            <Col>
              <Body>
                <Button onPress={this._registerAction}>
                  <Text>
                    Sign up
                  </Text>
                </Button>
              </Body>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
