import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { gray, purple, white } from '../utils/colors';

export default function Stepper({
  max,
  unit,
  step,
  value,
  onDecrement,
  onIncrement,
}) {
  return (
    <View style={[styles.row, { justifyContent: 'space-between' }]}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={Platform.OS === 'android' ? styles.androidBtn : styles.iosBtn}
        >
          <FontAwesome
            name='minus'
            size={30}
            color={white}
            onPress={onDecrement}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={Platform.OS === 'android' ? styles.androidBtn : styles.iosBtn}
        >
          <FontAwesome
            name='plus'
            size={30}
            color={white}
            onPress={onIncrement}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
        <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
