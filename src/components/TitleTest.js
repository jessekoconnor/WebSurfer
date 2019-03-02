import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Thumbnail, Subtitle } from 'native-base';


/*
takes: {
    avatarUrl: url do use for thumbnail,
    title: title text,
    subtitle: subTitle text
}
 */
export default class TileTest extends Component {
    render() {
        const uri = this.props.avatarUrl,
            title = this.props.title,
            subTitle = this.props.subTitle;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Thumbnail style={{height: 32, width: 32}} source={{uri:uri}} />
                <View style={{flex: 3, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Title>{title}</Title>
                    <Subtitle>{subTitle}</Subtitle>
                </View>
            </View>
        );
    }
}