import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const TabIcon = (props) => (
  <Text style={{color: props.focused ? '#DF013A': '#000000'}}>{props.title}</Text>
);

export default TabIcon;
