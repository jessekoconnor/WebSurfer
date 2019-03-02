import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
        //
        // this.date = {
        //     month: new Date().getMonth() + 1, //months from 1-12
        //     date: new Date().getDate(),
        //     year: new Date().getFullYear(),
        //     ymd: new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + (new Date().getDate())
        // }
        // console.log('date', this.date)
    }

    dataPrep() {
        // console.log('dataPrep', this.props.data);
        let preparedData = {};

        this.props.data.result.forEach((elem) => {
            let date = new Date(elem.rawDate),
                ymd = this.timeToString(date.getTime());

            if(!preparedData[ymd]) {
                preparedData[ymd] = []
            }
            preparedData[ymd].push(elem);
        });

        return preparedData;
        // ------------------------
        // Current looks like:
        // --
        // dataPrep Object {
        //  Object {
        //   "endTime": "10:30 AM",
        //   "humanDate": "Saturday December 29",
        //   "rawDate": "2018-12-29T09:30:00.000Z",
        //   "rawDateEnd": "2018-12-29T10:30:00.000Z",
        //   "startTime": "9:30 AM",
        //   "title": "Every Body- Katie B. (60 min)",
        // },
        // --
        // Needs to look like:
        // --
        //  "2019-02-17": Array [
        //   Object {
        //     "height": 50,
        //     "name": "Item for 2019-02-17",
        //   },
        //   Object {
        //     "height": 50,
        //     "name": "Item for 2019-02-17",
        //   },
        //   Object {
        //     "height": 121,
        //     "name": "Item for 2019-02-17",
        //   },
        // ],
        // ------------------------
    }

    render() {
        if(!this.props.data) {
            return(<View></View>);
        } else {
            let events = this.dataPrep();

            return (
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    // selected={this.date.ymd}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // markingType={'period'}
                    // markedDates={{
                    //    '2017-05-08': {textColor: '#666'},
                    //    '2017-05-09': {textColor: '#666'},
                    //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                    //    '2017-05-21': {startingDay: true, color: 'blue'},
                    //    '2017-05-22': {endingDay: true, color: 'gray'},
                    //    '2017-05-24': {startingDay: true, color: 'gray'},
                    //    '2017-05-25': {color: 'gray'},
                    //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                />
            );
        }
    }

    loadItems(day) {
        // console.log('loading items0', day);
        let events = this.dataPrep();

        // console.log('loading items1', Object.keys(events));

        for (let i = 0; i < 30; i++) {
            // console.log('day.timestamp', day, day.timestamp);
            const time = day.timestamp + (i) * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            // console.log('loading items2', strTime, this.state.items[strTime]?this.state.items[strTime].length:this.state.items[strTime]);
            if (!this.state.items[strTime]) {
                // console.log('loading items3', events[strTime] ? events[strTime].length: events[strTime]);
                this.state.items[strTime] = events[strTime] || [];
                // const numItems = Math.floor(Math.random() * 5);
                // for (let j = 0; j < numItems; j++) {
                //     this.state.items[strTime].push({
                //         name: 'Item for ' + strTime,
                //         height: Math.max(50, Math.floor(Math.random() * 150))
                //     });
                // }
            }
        }
        const newItems = {};


        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
            items: newItems
        });
        // console.log('loading items4');
        // for(let f in this.state.items) {
        //     console.log(f, this.state.items[f].length);
        // };
    }

    renderItem(item) {
        // console.log('renderItem', item)
        let title = item.title || item.name,
            time = item.startTime;

        if(item.endTime) {
            time += ' - ' + item.endTime;
        }
        return (
            <View style={[styles.item, {height: item.height}]}>
                <Text>{title}</Text>
                <Text>{time}</Text>
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});