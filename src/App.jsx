import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, Camera, Navigation2 } from 'lucide-react-native';
import HomePage from './pages/HomePage';
import TutorialPage from './pages/TutorialPage';
import PhotoRecognitionPage from './pages/PhotoRecognitionPage';
import NavigationPage from './pages/NavigationPage';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;

            if (route.name === 'Home') {
              icon = <Home color={color} size={size} />;
            } else if (route.name === 'Tutorial') {
              icon = <BookOpen color={color} size={size} />;
            } else if (route.name === 'Photo Recognition') {
              icon = <Camera color={color} size={size} />;
            } else if (route.name === 'Navigation') {
              icon = <Navigation2 color={color} size={size} />;
            }

            return icon;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Tutorial" component={TutorialPage} />
        <Tab.Screen name="Photo Recognition" component={PhotoRecognitionPage} />
        <Tab.Screen name="Navigation" component={NavigationPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
