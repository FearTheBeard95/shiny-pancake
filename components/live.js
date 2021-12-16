import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

import * as Location from 'expo-location';
import { calculateDirection } from '../utils/helpers';
import { Foundation } from '@expo/vector-icons';
import { purple, white } from '../utils/colors';

export default class Live extends Component {
  state = {
    status: 'granted',
    altitude: 0,
    speed: 0,
    direction: null,
    bounceValue: new Animated.Value(1),
  };

  componentDidMount() {
    Location.getBackgroundPermissionsAsync().then(({ status }) => {
      if (status === Location.PermissionStatus.GRANTED) {
        return this.setLocation();
      } else if (status === Location.PermissionStatus.UNDETERMINED) {
        return this.askPermission();
      } else {
        return this.setState(() => ({
          status,
        }));
      }
    });
  }
  askPermission = () => {
    Location.requestBackgroundPermissionsAsync().then(({ status }) => {
      if (status === Location.PermissionStatus.GRANTED) {
        return this.setLocation();
      }

      this.setState(() => ({
        status,
      }));
    });
  };

  setLocation = () => {
    Location.watchPositionAsync(
      {
        timeInterval: 1,
        distanceInterval: 1,
        accuracy: Location.Accuracy.Highest,
      },
      ({ coords }) => {
        console.log(coords);
        const newDirection = calculateDirection(coords.heading);
        const { direction, bounceValue } = this.state;

        if (newDirection !== direction) {
          Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
          ]).start();
        }

        return this.setState(() => ({
          altitude: coords.altitude,
          speed: coords.speed,
          status: 'granted',
          direction: newDirection,
        }));
      }
    );
  };
  render() {
    const { status, speed, altitude, direction, bounceValue } = this.state;

    if (status === null) {
      return <ActivityIndicator style={{ marginTop: 30 }} />;
    }

    if (status === 'denied') {
      return (
        <View style={Styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied location services, visit settings to enable location
            services for this app
          </Text>
        </View>
      );
    }

    if (status === 'undetermined') {
      return (
        <View style={Styles.center}>
          <Foundation name='alert' size={50} />
          <Text>You need to enable location services for this app</Text>
          <TouchableOpacity style={Styles.button} onPress={this.askPermission}>
            <Text style={Styles.buttonText}>enable</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={Styles.container}>
        <View style={Styles.directionContainer}>
          <Text style={[Styles.header, { color: purple }]}>
            Your direction is
          </Text>
          <Animated.Text
            style={[Styles.direction, { transform: [{ scale: bounceValue }] }]}
          >
            {direction}
          </Animated.Text>
        </View>
        <View style={Styles.metricContainer}>
          <View style={Styles.metric}>
            <Text style={Styles.header}>Altitude</Text>
            <Text style={Styles.subHeader}>
              {Math.round(altitude * 3.2008)} feet
            </Text>
          </View>
          <View style={Styles.metric}>
            <Text style={Styles.header}>Speed</Text>
            <Text style={Styles.subHeader}>
              {(speed * 2.2369).toFixed(1)} Km/h
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 30,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
    color: white,
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
    color: white,
  },
});
