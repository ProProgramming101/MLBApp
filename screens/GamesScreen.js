import React from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList, Button,
  ActivityIndicator, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

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
      isExpanded: false,
      date: new Date(),
      games: [],
    };

    // Setup animation values...
    this.chevronRotation = new Animated.Value(0);
    this.listItemHeight = new Animated.Value(0);
  }

  componentDidMount() {
    this.getGamesForDay(this.state.date);
  }

  getGamesForDay = (date) => {
    this.setState({isLoading: true});
   var year = date.getFullYear();
   var month = date.getMonth() + 1;
   var day = date.getDate();
    MLBGamedayApi.getAllGameDataForDay(year, month, day).then(function(data) {
      // Filter out null entries...
      data = data.filter(function(d) { return !!d; });

      this.setState({games: data});
      this.setState({isLoading: false});
    }.bind(this));
  }

  onDateChange = (date) => {
    this.setState({date: date});
    this.getGamesForDay(date);
  }

  onListItemPress = (item) => {
    // Rotate the chevron...
    var chevronToValue = (this.state.isExpanded) ? 0 : 1;
    Animated.timing(this.chevronRotation, {
      toValue: chevronToValue, duration: 150
    }).start();

    // Expand/Collpase the list item...
    var heightToValue = (this.state.isExpanded) ? 0 : 50;
    Animated.timing(this.listItemHeight, {
      toValue: heightToValue, duration: 150
    }).start();

    // Toggle the isExpanded state...
    this.setState({isExpanded: !this.state.isExpanded});
  }

  getChevronRotateStyle = () => {
    // Setup the animation...
    const rotate = this.chevronRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "90deg"],
    });

    // Return the style...
    return { transform: [{ rotate: rotate }] };
  }

  onVideosPress = (item) => {
    this.props.navigation.navigate("Videos", { item: item });
  }

  renderSubtitle = (item) => {
    return (
      <Animated.View style={{height: this.listItemHeight}}>
        <View>
          <Button title="Go to videos" onPress={() => this.onVideosPress(item)} />
        </View>
      </Animated.View>
    );
  }

  renderTitle = (item) => {
    return (
      <View>

        <View style={{flexDirection:"row"}}>
          <View style={{width:200}}>
            <Text style={{fontWeight:"bold"}}>{item.home_fname}</Text>
            <Text style={{fontSize:12, color: "gray"}}>{item.home_wins} - {item.home_loss}</Text>
          </View>

          <Text style={{fontSize:20}}>{item.home_team_runs}</Text>
        </View>

        <View style={{paddingTop:10}} />

        <View style={{flexDirection:"row"}}>
          <View style={{width:200}}>
            <Text style={{fontWeight:"bold"}}>{item.away_fname}</Text>
            <Text style={{fontSize:12, color: "gray"}}>{item.away_wins} - {item.away_loss}</Text>
          </View>

          <Text style={{fontSize:20}}>{item.away_team_runs}</Text>
        </View>

      </View>
    );
  }

  renderListItem = ({item}) => {
    const chevronStyle = this.getChevronRotateStyle();
    const title = this.renderTitle(item);
    const subtitle = this.renderSubtitle(item);

    return (
      <ListItem
        key={item.key}
        containerStyle={styles.listItemContainer}
        title={title}
        onPress={() => this.onListItemPress(item)}
        subtitle={subtitle}
        rightIcon={
          <AnimatedIcon 
            name="chevron-right" 
            size={30} 
            color="gray" 
            style={[chevronStyle, { alignSelf: "flex-start" }]}
          />
        }
      />
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.dateBarContainer}>
          <DateBar onDateChange={this.onDateChange} date={this.state.date} />
        </View>

        {
          (this.state.isLoading) 
            ? <ActivityIndicator animating={true} size="large" style={{paddingTop:40}} />
            : <FlatList
                data={this.state.games}
                renderItem={this.renderListItem}
              />
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', },
  listItemContainer: { backgroundColor: "white", },
  dateBarContainer: { borderBottomWidth: 1, borderColor: "gray", },
});
