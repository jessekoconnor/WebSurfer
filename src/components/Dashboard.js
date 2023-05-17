import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';

import Agenda from './Agenda';
import CustomNavTest from './TabViewTest';
import { Container } from 'native-base';

import * as Font from 'expo-font';

import { DASHBOARD_API_BASE_URL } from '../../env.js';

// function which delays X seconds
const delay = (seconds) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, seconds * 1000);
    });
}

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

    async fetchData({ attempt = 1, lastError } = {}) {
        let dashboardUrl = DASHBOARD_API_BASE_URL;
        if (attempt > 3) {
            return new Error("Could not fetch data", { dashboardUrl, lastError });
        }

        if(this.dash) {
            return Promise.resolve(this.dash);
        }

        console.log("**** Dashboard *****", { dashboardUrl });

        try {
            const res = await fetch(dashboardUrl + this.props.dashboard);
            const resJson = await res.json();
            this.dash = resJson;
            return resJson;
        } catch (error) {
            console.log("Error fetching dashboard, trying once more", { error, dashboardUrl });
            // Try another more time after 3 seconds
            await delay(3 * attempt);
            this.dash = await this.fetchData({ attempt: attempt + 1, lastError: error });
            return this.dash;
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        
        let dashboard = await this.fetchData();

        // console.log('DASHBOARS*********    ', dashboard)

        let widgets = dashboard.data;
        
        // console.log('widgets', widgets);

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