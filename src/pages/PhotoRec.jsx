import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import Tts from 'react-native-tts'; // Import TTS
import { scanOCR } from 'vision-camera-image-labeler'; // Import text recognition

const TextRecognitionPage = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const device = useCameraDevice('back'); // Use back camera

  // Frame processor to detect text and trigger TTS
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const scannedOcr = scanOCR(frame);
    runOnJS(handleTextRecognition)(scannedOcr); // Run on JS thread
  }, []);

  const handleTextRecognition = (scannedOcr) => {
    if (scannedOcr && scannedOcr.text) {
      setRecognizedText(scannedOcr.text);
      Tts.speak(scannedOcr.text); // Speak the recognized text
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        {device && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5} // Adjust FPS for performance
          />
        )}
      </View>

      {/* Display the recognized text */}
      <View style={styles.textContainer}>
        <Text style={styles.recognizedText}>
          {recognizedText ? recognizedText : 'Recognizing text...'}
        </Text>
      </View>

      {/* Button to manually trigger TTS */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.speakButton}
          onPress={() => Tts.speak(recognizedText)}
        >
          <Text style={styles.buttonText}>Read Aloud</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
  },
  recognizedText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  speakButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TextRecognitionPage;
