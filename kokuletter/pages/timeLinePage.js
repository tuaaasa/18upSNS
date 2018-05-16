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

export default class timeLinePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container>
        <Header>
          <Body>
            <Title>タイムライン</Title>
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
              ListEmptyComponent={() => <Spinner />}
              data={this.props.salsalList}
              execData={this.props.listUpdate}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <Salsals goodUserKey={this.props.userKey} {...item} />}
            />
          </Content>
        </ImageBackground>
        <Fab
          active={false}
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
