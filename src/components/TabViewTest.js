import * as React from 'react';
import {View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import TileTest from './TitleTest';
import Agenda from "./Agenda";

const CreateView = (widget) => {
    // console.log('createView', widget.route.result.length);
    return (
        <View style={{flex: 1}}>
            <Image
                style={{flex:1, maxHeight: 180}}
                source={{uri: widget.route.header.image}}
            />
            <Agenda style={{flex: 1}} data={widget.route}/>
        </View>
    );
}


export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
        return (
            <View style={{
                flexDirection: 'row',
                flex: 1,
                maxHeight: 48,
            }}>
                {props.navigationState.routes.map((route, i) => {

                    let title = route.header.title,
                        subTitle = route.header.subTitle,
                        avatarUrl = route.header.avatar32x32url;

                    return (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                alignItems: 'center',
                            }}
                            onPress={() => this.setState({ index: i })}
                            key={i} >
                            <TileTest title={title} subTitle={subTitle} avatarUrl={avatarUrl}/>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = (widgets) => {
        let scenes = {};
        widgets.forEach((w,i) => {
            scenes[w.key] = CreateView;
        })
        return SceneMap(scenes);
    }

    dataPrep = (widgets) => {
        return widgets.map((w, i) => {
            w.key = i.toString();
            return w;
        });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={{flex: 1}} justifyContent="center">
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
        // Add key onto widgets
        let widgets = this.dataPrep(this.props.widgets);
        this.state.routes = widgets;

        return (
            <TabView style={{flex: 1}}
                navigationState={this.state}
                renderScene={this._renderScene(widgets)}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}