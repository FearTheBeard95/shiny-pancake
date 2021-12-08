import React from 'react';
import { View, Slider } from 'react-native';

export default function Sliders({ max, unit, step, value, onChange }) {
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChanges}
      />
    </View>
  );
}
