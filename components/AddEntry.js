import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  getMetricDataInfo,
  timeToString,
  getDailyRemainder,
} from '../utils/helpers';
import DateHeader from './DateHeader';
import Slider from './Slider';
import Stepper from './Stepper';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { purple, white } from '../utils/colors';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={
      Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn
    }
  >
    <Text style={styles.submitTextBtn}>Submit</Text>
  </TouchableOpacity>
);

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricDataInfo(metric);

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count,
      };
    });
  };

  decrement = (metric) => {
    const { step } = getMetricDataInfo(metric);

    this.setState((state) => {
      const count = state[metric] - step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  slide = (metric, value) =>
    this.setState((state) => {
      return {
        ...state,
        [metric]: value,
      };
    });

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    //Update redux
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    );

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    //Navigate home

    //save to DB
    submitEntry({ entry, key });

    //Clear local notifications
  };

  reset = () => {
    const key = timeToString();
    const entry = this.state;

    //Update redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyRemainder(),
      })
    );

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    //Navigate home

    //save to DB
    removeEntry(key);

    //Clear local notifications
  };
  render() {
    const metaInfo = getMetricDataInfo();
    {
      flex: 1;
    }
    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={
              Platform.OS === 'android'
                ? 'ios-happy-outline'
                : 'md-happy-outline'
            }
            size={100}
            style={{ color: purple }}
          />
          <Text style={{ paddingBottom: 10, color: purple, fontSize: 20 }}>
            You already logged your information for today
          </Text>
          <TextButton onPress={this.reset} style={{ padding: 10 }}>
            Reset
          </TextButton>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
              {getIcon([key])}
              {type === 'slider' ? (
                <Slider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <Stepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitTextBtn: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

function mapStateToProps(state) {
  const key = timeToString();
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
}

export default connect(mapStateToProps)(AddEntry);
