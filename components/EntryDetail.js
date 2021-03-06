import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import MetricCard from './MetricCard';
import { white } from '../utils/colors';

class EntryDetail extends Component {
  navigationOptions = (route) => {
    const { entryId } = route.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`,
    };
  };
  componentDidMount() {
    const { route, navigation } = this.props;
    navigation.setOptions(this.navigationOptions(route));
  }
  render() {
    const { metrics, navigation } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(state, { route }) {
  console.log(route);
  const { entryId } = route.params;

  return {
    entryId,
    metrics: state[entryId],
  };
}

export default connect(mapStateToProps)(EntryDetail);
