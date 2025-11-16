import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ← use this now

export default function HomeScreen({ navigation }) {
  const [showCalcOverlay, setShowCalcOverlay] = useState(false);
  const [showPracticeOverlay, setShowPracticeOverlay] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* 🔹 Top Picture */}
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* 🔹 Title */}
        <Text style={styles.title}>Inverse Matrices</Text>

        {/* 🔹 Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('InverseMatricesCourse')}
          >
            <Text style={styles.buttonText}>Inverse Matrices Course</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowPracticeOverlay(true)}
          >
            <Text style={styles.buttonText}>Practice</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowCalcOverlay(true)}
          >
            <Text style={styles.buttonText}>Calculator</Text>
          </TouchableOpacity>
        </View>

        {/* 🔹 Practice Overlay */}
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
                <Text style={styles.overlayButtonText}>2 x 2 Practice</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.overlayButton}
                onPress={() => {
                  setShowPracticeOverlay(false);
                  navigation.navigate('ThreeByThreePractice');
                }}
              >
                <Text style={styles.overlayButtonText}>3 x 3 Practice</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowPracticeOverlay(false)}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 🔹 Calculator Overlay */}
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
                <Text style={styles.overlayButtonText}>2 x 2 Matrix</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.overlayButton}
                onPress={() => {
                  setShowCalcOverlay(false);
                  navigation.navigate('ThreeByThree');
                }}
              >
                <Text style={styles.overlayButtonText}>3 x 3 Matrix</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowCalcOverlay(false)}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b202eff',
  },
  container: {
    flex: 1,
    backgroundColor: '#0b202eff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#769ec6ff',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2c3e50',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
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
    alignItems: 'center',
    width: 250,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overlayButton: {
    backgroundColor: '#0b202eff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
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
