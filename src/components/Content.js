import React, { Component } from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';

export default class Content extends Component {

    dataPrep() {
        return this.props.data && this.props.headers ? this.props.data.map((point) => {
            return {
                title: point[this.props.headers[0]],
                data: point[this.props.headers[1]],
            };
        }) : [];
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }
        let sections = this.dataPrep();
        return (
            <View style={styles.container}>
                <SectionList
                    sections={sections}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                    onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                            console.log('closeToBottom NOW***')
                            this.props.onNav();
                        }
                    }}
                    scrollEventThrottle={400}
                />
            </View>
        );
    }
}

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 160;
    console.log('closeToBottom: ',layoutMeasurement.height + contentOffset.y,  '>=', contentSize.height + paddingToBottom)
    return layoutMeasurement.height + contentOffset.y >= contentSize.height + paddingToBottom;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        fontSize: 15,
        height: 30,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
})