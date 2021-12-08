import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { getMetricDataInfo, timeToString } from '../utils/helpers';
import DateHeader from './DateHeader';
import Slider from './Slider';
import Stepper from './Stepper';

const SubmitBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Text>Submit</Text>
    </View>
  </TouchableOpacity>
);

export default class AddEntry extends Component {
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
    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));

    //Navigate home

    //save to DB

    //Clear local notifications
  };
  render() {
    const metaInfo = getMetricDataInfo();
    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon([key])}
              {type === 'slider' ? (
                <Slider
                  value={value}
                  onChange={() => this.slide(key, value)}
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
