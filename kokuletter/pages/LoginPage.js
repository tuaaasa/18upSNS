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
  Form,
  Item,
  Input,
  Label,
  Title,
} from 'native-base';
import {
  // checkLogin,
  // setPersonalInfo,
  checkUserId,
} from './components/database.js';

export default class loginPage extends Component {
  constructor(props){
    super(props);

    this.text = {};
    this.state = {
      userID: '',
      validation: false,
    };
  }

  _loginAction = () => {
    checkUserId(this.state.userID, (value) => {
      if(value){
        Actions.timeLine({
          userKey: this.state.userID,
        });
      }else{
        this.setState({validation: true});
      }
    });
  }

  render(){
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={Actions.pop}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Form style={{padding: 10}}>
            <Item
              stackedLabel
              underline
              last
              error={this.state.validation}
            >
              <Label>UserID</Label>
              <Input
                autoCapitalize={'none'}
                onChangeText={(userID) => this.setState({userID: userID})}
              />
            </Item>
          </Form>
          <Body>
            <Button onPress={this._loginAction}>
              <Text>Sign in</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}
