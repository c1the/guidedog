import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const PhotoRecognitionPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Recognition</Text>
      <Text style={styles.description}>
        This feature will help you identify objects in your surroundings.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PhotoRecognitionPage;
