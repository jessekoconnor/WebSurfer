import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';

import Agenda from './Agenda';
import CustomNavTest from './TabViewTest';
import { Container } from 'native-base';

import * as Font from 'expo-font';



export default class FlexDimensionsBasics extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            widgetsAreLoading: true,
            fontLoading: true
        }
    }

    componentDidMount() {
        this._isMounted = true;

        let dashboardUrl = 'https://0uom921bke.execute-api.us-east-1.amazonaws.com/Prod/dashboard/';

        console.log('Fetching dashboard...', 'https://0uom921bke.execute-api.us-east-1.amazonaws.com/Prod/dashboard/' + this.props.dashboard);

        if (__DEV__) {
            console.log('Development mode, pinging localhost');
            dashboardUrl = 'http://localhost:3000/';
        } else {
            console.log('Production');
        }

        return fetch(dashboardUrl + this.props.dashboard)
            .then((response) => response.json())
            .then((responseJson) => {
                
                let widgets = responseJson.data;
                
                console.log('widgets', widgets);

                if(this._isMounted) {
                    this.setState({
                        widgetsAreLoading: false,
                        widgets: widgets,
                        fontLoading: false,
                        selectedWidget: widgets[0],
                        tileText: widgets.map((widget) => {
                            return widget.tileText;
                        })
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
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