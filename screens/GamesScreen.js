import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';

import MLBGamedayApi from './../api/MLBGamedayApi';
import { DateBar } from '../components/app';

export default class GamesScreen extends React.Component {
  static navigationOptions = {
    title: 'Games',
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      date: new Date(2018, 4, 24),
      games: [],
    };
  }

  componentDidMount() {
    this.getGamesForDay();
  }

  getGamesForDay = () => {
    this.setState({isLoading: true});

    var year = this.state.date.getFullYear();
    var month = this.state.date.getMonth();
    var day = this.state.date.getDate();
    MLBGamedayApi.getListOfGamesForDay(year, month, day).then(function(data) {
      this.setState({games: data});
      this.setState({isLoading: false});
    }.bind(this));
  }

  onDateChange = (date) => {
    this.setState({date: date});
    this.getGamesForDay();
  }

  renderListItem = ({item}) => {
    var title = `${item.awayTeamName} @ ${item.homeTeamName}`;

    return (
      <ListItem
        key={item.key}
        title={title}
      />
    );
  }

  render() {
    // If loading, display activity indicator...
    if (this.state.isLoading) {
      return <ActivityIndicator animating={true} size="large" style={{paddingTop:40}} />
    }

    return (
      <ScrollView style={styles.container}>
        <DateBar onDateChange={this.onDateChange} date={this.state.date} />
        <FlatList
          data={this.state.games}
          renderItem={this.renderListItem}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
