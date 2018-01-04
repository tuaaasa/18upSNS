import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    tabText: {
        color: 'black',
    },
    tabTextActive: {
        color: 'red',
    },
});

const TabIcon = (props) => (
  <Text style={props.selected ? styles.tebTextActive : styles.tabText}>{props.title}</Text>
);

export default TabIcon;
