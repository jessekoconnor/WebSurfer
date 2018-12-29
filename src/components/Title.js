import React, { Component } from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';

export default class Title extends Component {
    render() {
        return (
            <View style={styles.tileContainer}>
                <Text style={styles.text}>{this.props.content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tileContainer: {
        flex: 1,
        justifyContent: 'flex-end',  // keep in bottom left
    },
    text: {
        fontSize: 30
    },
});