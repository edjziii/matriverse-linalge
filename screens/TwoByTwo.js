import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function TwoByTwo() {
  const [matrix, setMatrix] = useState({ a: '', b: '', c: '', d: '' });
  const [result, setResult] = useState(null);

  // Pulsing animation for background
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const calculateInverse = () => {
    const { a, b, c, d } = matrix;
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c), D = parseFloat(d);
    const det = A * D - B * C;

    if (isNaN(det) || det === 0) {
      setResult('Matrix is not invertible');
      return;
    }

    const inverse = [
      [D / det, -B / det],
      [-C / det, A / det],
    ];
    setResult(inverse);
  };

  const reset = () => {
    setMatrix({ a: '', b: '', c: '', d: '' });
    setResult(null);
  };

  const formatNumber = (num) => {
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(4);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Pulsing gradient background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#121825', '#1F1170']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#1F1170', '#121825']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <BlurView intensity={80} tint="dark" style={styles.glassContainer}>
          <LinearGradient
            colors={['rgba(167,199,231,0.1)', 'rgba(118,158,198,0.05)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.title}>2×2 Matrix Inverse Calculator</Text>

            <Text style={styles.sectionLabel}>Enter Matrix Values:</Text>

            {/* Input Matrix */}
            <View style={styles.matrixInputContainer}>
              <View style={styles.matrixBracket} />
              <View style={styles.matrixContent}>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={matrix.a}
                    onChangeText={(text) => setMatrix({ ...matrix, a: text })}
                    keyboardType="numeric"
                    placeholder="a"
                    placeholderTextColor="#90c9ff"
                  />
                  <TextInput
                    style={styles.input}
                    value={matrix.b}
                    onChangeText={(text) => setMatrix({ ...matrix, b: text })}
                    keyboardType="numeric"
                    placeholder="b"
                    placeholderTextColor="#90c9ff"
                  />
                </View>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    value={matrix.c}
                    onChangeText={(text) => setMatrix({ ...matrix, c: text })}
                    keyboardType="numeric"
                    placeholder="c"
                    placeholderTextColor="#90c9ff"
                  />
                  <TextInput
                    style={styles.input}
                    value={matrix.d}
                    onChangeText={(text) => setMatrix({ ...matrix, d: text })}
                    keyboardType="numeric"
                    placeholder="d"
                    placeholderTextColor="#90c9ff"
                  />
                </View>
              </View>
              <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={calculateInverse}>
                <LinearGradient
                  colors={['#769ec6', '#5a8bb8']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>Calculate Inverse</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resetButton} onPress={reset}>
                <LinearGradient
                  colors={['#5a8bb8', '#4a7598']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>Reset</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Result */}
            {result && (
              <View style={styles.resultSection}>
                <Text style={styles.sectionLabel}>Result:</Text>
                {typeof result === 'string' ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{result}</Text>
                  </View>
                ) : (
                  <View style={styles.resultMatrixContainer}>
                    <View style={styles.matrixBracket} />
                    <View style={styles.resultMatrixContent}>
                      {result.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.resultRow}>
                          {row.map((val, colIndex) => (
                            <Text key={colIndex} style={styles.resultValue}>
                              {formatNumber(val)}
                            </Text>
                          ))}
                        </View>
                      ))}
                    </View>
                    <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
                  </View>
                )}
              </View>
            )}
          </LinearGradient>
        </BlurView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121825',
  },
  glassContainer: {
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  gradientOverlay: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a7c7e7',
    marginBottom: 16,
    textAlign: 'center',
  },
  matrixInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  matrixBracket: {
    width: 3,
    height: 120,
    backgroundColor: '#76d6ff',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  matrixBracketRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  matrixContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  input: {
    backgroundColor: 'rgba(118,158,198,0.15)',
    width: 80,
    height: 55,
    margin: 6,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(118,214,255,0.3)',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#769ec6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  resetButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#5a8bb8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  resultSection: {
    marginTop: 24,
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.4)',
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: '600',
    textAlign: 'center',
  },
  resultMatrixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118,214,255,0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(118,214,255,0.2)',
  },
  resultMatrixContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  resultValue: {
    fontFamily: 'monospace',
    fontSize: 18,
    color: '#fff',
    width: 90,
    textAlign: 'center',
    fontWeight: '600',
  },
});