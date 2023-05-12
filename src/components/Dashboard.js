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

        this.dash = false;
        // this.fetchData();
    }

    async fetchData() {
        if(this.dash) {
            return Promise.resolve(this.dash);
        }

        let dashboardUrl = 'https://cqrwy3vn9e.execute-api.us-east-1.amazonaws.com/Prod';

        // console.log("**** Dashboard *****");

        if (__DEV__) {
            console.log('Development mode, pinging localhost');
            dashboardUrl = 'http://localhost:3000/';
        } else {
            // console.log('Production');
        }

        // Fetch the data as soon as possible
        return new Promise((res,rej) => {
            fetch(dashboardUrl + this.props.dashboard)
            .then((response) => response.json())
            .then(data => {
                this.dash = data;
                res(data);
            })
            .catch((error) => {
                console.log("Error, trying once more", error);
                // Try one more time
                fetch(dashboardUrl + this.props.dashboard)
                .then((response) => response.json())
                .then(data => {
                    this.dash = data;
                    res(data);
                }).catch((error) => {
                    console.error(error);
                    rej(error)
                });
            });
        })
    }

    async componentDidMount() {
        this._isMounted = true;
        
        let dashboard = await this.fetchData();

        console.log('DASHBOARS*********    ', dashboard)

        let widgets = dashboard.data;
        
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