import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [showCalcOverlay, setShowCalcOverlay] = useState(false);
  const [showPracticeOverlay, setShowPracticeOverlay] = useState(false);

  // 🔥 Pulsing background animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* 🔥 Background Gradient Pulse */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#121825', '#1B166D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#1B166D', '#121825']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      {/* MAIN UI */}
      <View style={styles.container}>

        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Inverse Matrices</Text>

        {/* BUTTONS */}
        <View style={styles.buttonContainer}>

          {/* COURSE */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('InverseMatricesCourse')}
          >
            <BlurView intensity={40} tint="light" style={styles.blurContainer}>
              <Text style={styles.buttonText}>Course</Text>
            </BlurView>
          </TouchableOpacity>

          {/* PRACTICE */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPracticeOverlay(true)}
          >
            <BlurView intensity={40} tint="light" style={styles.blurContainer}>
              <Text style={styles.buttonText}>Practice</Text>
            </BlurView>
          </TouchableOpacity>

          {/* CALCULATOR */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowCalcOverlay(true)}
          >
            <BlurView intensity={40} tint="light" style={styles.blurContainer}>
              <Text style={styles.buttonText}>Calculator</Text>
            </BlurView>
          </TouchableOpacity>

        </View>
      </View>

      {/* === PRACTICE OVERLAY === */}
      <Modal visible={showPracticeOverlay} transparent animationType="fade">
        <View style={styles.overlayBackground}>
          <View style={styles.overlayBox}>
            <Text style={styles.overlayTitle}>Select Practice Type</Text>

            <TouchableOpacity
              style={styles.overlayButton}
              onPress={() => {
                setShowPracticeOverlay(false);
                navigation.navigate('TwoByTwoPractice');
              }}
            >
              <Text style={styles.overlayButtonText}>2 × 2 Practice</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.overlayButton}
              onPress={() => {
                setShowPracticeOverlay(false);
                navigation.navigate('ThreeByThreePractice');
              }}
            >
              <Text style={styles.overlayButtonText}>3 × 3 Practice</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowPracticeOverlay(false)}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* === CALCULATOR OVERLAY === */}
      <Modal visible={showCalcOverlay} transparent animationType="fade">
        <View style={styles.overlayBackground}>
          <View style={styles.overlayBox}>
            <Text style={styles.overlayTitle}>Select Matrix Type</Text>

            <TouchableOpacity
              style={styles.overlayButton}
              onPress={() => {
                setShowCalcOverlay(false);
                navigation.navigate('TwoByTwo');
              }}
            >
              <Text style={styles.overlayButtonText}>2 × 2 Matrix</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.overlayButton}
              onPress={() => {
                setShowCalcOverlay(false);
                navigation.navigate('ThreeByThree');
              }}
            >
              <Text style={styles.overlayButtonText}>3 × 3 Matrix</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowCalcOverlay(false)}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  image: { width: 220, height: 220, marginBottom: 10 },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#769ec6ff',
    marginBottom: 30,
  },

  buttonContainer: { width: '100%', alignItems: 'center' },

  button: {
    width: '80%',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',

    elevation: 9,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 7,
  },

  blurContainer: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },

  buttonText: {
    color: '#eaf6ff',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowRadius: 6,
  },

  /* Overlays */
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: 260,
    alignItems: 'center',
  },

  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  overlayButton: {
    backgroundColor: '#0b202eff',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },

  overlayButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  closeText: {
    marginTop: 15,
    color: '#333',
    fontSize: 16,
  },
});
