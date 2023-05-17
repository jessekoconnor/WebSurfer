import * as React from 'react';
import {View, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import SubTile from './SubTile';
import Agenda from "./Agenda";

const styles = {
    tabBarItem: {
        notSelected: {
            flex: 1,
            alignItems: 'center',
            margin: 2,
        },
        selected: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'powderblue',
            // 1px of padding on left and right
            margin: 2,
        }
    },
}

const CreateView = (widget) => {
    // console.log('createView', widget.route.result.length);
    return (
        <View style={{flex: 1}}>
            <Image
                style={{flex:1, maxHeight: 180}}
                source={{uri: widget.route.header.imageFile}}
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
                        avatarUrl = route.header.avatar32x32url
                        isSelected = this.state.index === i;

                        console.log(`avatarUrl is ${avatarUrl}`);
                        console.log(`title is ${title}`);
                        console.log(`subTitle is ${subTitle}`);
                        console.log(`route.header is`, route.header);
                        console.log('isSelected is', isSelected);

                    return (
                        <TouchableOpacity
                            style={isSelected ? styles.tabBarItem.selected : styles.tabBarItem.notSelected}
                            onPress={() => this.setState({ index: i })}
                            key={i} >
                            <SubTile title={title} subTitle={subTitle} avatarUrl={avatarUrl}/>
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