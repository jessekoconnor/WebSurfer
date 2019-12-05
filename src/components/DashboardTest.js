import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';

import Agenda from './Agenda';
import CustomNavTest from './TabViewTest';
import { Container } from 'native-base';

import * as Font from 'expo-font';



export default class FlexDimensionsBasics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            widgetsAreLoading: true,
            fontLoading: true
        }
    }

    async componentWillMount() {
        // await Expo.Font.loadAsync({
        //     Roboto: font.Roboto,
        //     Roboto_medium: font.Roboto_medium,
        //     Ionicons: font.Ionicons,
        // });
        this.setState({ fontLoading: false });
    }

    componentDidMount() {
        return fetch('https://0uom921bke.execute-api.us-east-1.amazonaws.com/Prod/dashboard/' + this.props.dashboard)
            .then((response) => response.json())
            .then((responseJson) => {
                let widgets = responseJson;
                this.setState({
                    widgetsAreLoading: false,
                    widgets: widgets,
                    selectedWidget: widgets[0],
                    tileText: widgets.map((widget) => {
                        return widget.tileText;
                    })
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={{flex: 3}}>
                <CustomNavTest isLoading={this.state.widgetsAreLoading || this.state.fontLoading} widgets={this.state.widgets}/>
                {/*<View style={[styles.content, {flex: 3}]}>*/}
                    {/*<Agenda data={this.state.selectedWidget}/>*/}
                {/*</View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tileContainer: {
        flex: 1,
    },
    title: {flex: 1, backgroundColor: 'powderblue'},
    tiles: {flex: 2, backgroundColor: 'skyblue', flexDirection: 'row'},
    content: {backgroundColor: 'steelblue'}
});