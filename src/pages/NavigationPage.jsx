import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { useImageLabeler } from 'react-native-vision-camera-v3-image-labeling';
import Tts from 'react-native-tts';
import Constants from 'expo-constants';

const NavigationPage = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const device = useCameraDevice('back');
  const options = { minConfidence: 0.1 };
  const { scanImage } = useImageLabeler(options);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedObjects = scanImage(frame);
    
    // Process detected objects (cars, stairs, etc.)
    if (detectedObjects.length > 0) {
      detectedObjects.forEach((obj) => {
        if (obj.label === 'car') {
          notifyUser('Car approaching from nearby!');
        } else if (obj.label === 'stairs') {
          notifyUser('Stairs ahead!');
        } 
      });
    }
  }, []);

  const notifyUser = (message) => {
    Alert.alert('Warning', message);
    Tts.speak(message);  // Text-to-speech 
  };

  const handleActivateNavigation = () => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDucking(true);  // Lowers music volume while TTS is playing
    setCameraActive(true);
  };

  const handleExitNavigation = () => {
    setCameraActive(false);
  };

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <View style={StyleSheet.absoluteFill}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleExitNavigation}>
              <Text style={styles.buttonText}>Exit Navigation</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Navigation</Text>
          <Text style={styles.description}>
            Press the button below to start the navigation feature.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleActivateNavigation}>
            <Text style={styles.buttonText}>Activate Navigation</Text>
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default NavigationPage;
