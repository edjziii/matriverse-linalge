// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading for 3 seconds before going to Home
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show a GIF
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/loading.gif')}
        style={styles.media}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // you can change this color if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;
