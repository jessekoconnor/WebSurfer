import React, { Component } from 'react';
import { ActivityIndicator, Alert, AppRegistry, View, Text, StyleSheet } from 'react-native';

import Title from './Title';
import Tiles from './Tiles';
import Content from './Content';

export default class FlexDimensionsBasics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            widgetsAreLoading: true
        }
    }

    componentDidMount() {
        return fetch('https://0uom921bke.execute-api.us-east-1.amazonaws.com/Prod/dashboard/' + this.props.dashboard)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log('supsup1', responseJson);
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
        // const { navigate } = this.props.navigation;
        return (
            <View style={styles.tileContainer}>
                <View style={styles.title}>
                    <Title content={this.props.title}/>
                </View>
                <View style={styles.tiles}>
                    <Tiles tileText={this.state.tileText} isLoading={this.state.widgetsAreLoading} onPressHandler={(widgetIndex) => {
                        this.setState(previousState => {return {selectedWidget: previousState.widgets[widgetIndex]};});
                    }}/>
                </View>
                <View style={styles.content}>
                    <Content isLoading={this.state.widgetsAreLoading} data={this.state.widgetsAreLoading ? [] : this.state.selectedWidget.result} headers={this.state.widgetsAreLoading ? [] : this.state.selectedWidget.headers} onNav={() => {
                        console.log('Lets Nav Away');
                        // navigate('Details');
                    }}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tileContainer: {
        flex: 1,
        paddingTop: 10,
    },
    title: {flex: 1, backgroundColor: 'powderblue'},
    tiles: {flex: 2, backgroundColor: 'skyblue', flexDirection: 'row'},
    content: {flex: 6, backgroundColor: 'steelblue'}
}),
    data = {
        title: 'Night Life',
        dashboard: 'nightlife'
    };