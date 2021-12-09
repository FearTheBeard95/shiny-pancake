import React from 'react';
import { Text, View } from 'react-native';
import { purple } from '../utils/colors';

export default function ({ date }) {
  return (
    <View>
      <Text style={{ fontSize: 25, color: purple }}>{date}</Text>
    </View>
  );
}
