import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

export default function TwoByTwo() {
  const [matrix, setMatrix] = useState({ a: '', b: '', c: '', d: '' });
  const [result, setResult] = useState(null);

  const calculateInverse = () => {
    const { a, b, c, d } = matrix;
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c), D = parseFloat(d);
    const det = A * D - B * C;

    if (isNaN(det) || det === 0) {
      setResult('Matrix is not invertible');
      return;
    }

    // 🔹 No rounding — show full precision
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

  const content = (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.title}>2 x 2 Inverse Calculator</Text>

      {/* 🔹 Input Matrix */}
      <View style={styles.matrixContainer}>
        {['a', 'b', 'c', 'd'].map((key) => (
          <TextInput
            key={key}
            style={styles.input}
            value={matrix[key]}
            onChangeText={(text) => setMatrix({ ...matrix, [key]: text })}
            keyboardType="numeric"
          />
        ))}
      </View>

      {/* 🔹 Equal Button */}
      <TouchableOpacity style={styles.equalButton} onPress={calculateInverse}>
        <Text style={styles.equalText}>=</Text>
      </TouchableOpacity>

      {/* 🔹 Result */}
      {result && (
        <View style={styles.resultWrapper}>
          {typeof result === 'string' ? (
            <Text style={styles.errorText}>{result}</Text>
          ) : (
            <View style={styles.matrixContainer}>
              {result.flat().map((val, i) => (
                <View style={styles.resultBox} key={i}>
                  <Text style={styles.resultText}>{val}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );

  return Platform.OS === 'android' ? (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#0b202eff" barStyle="light-content" />
      {content}
    </SafeAreaView>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b202eff',
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    backgroundColor: '#0b202eff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resetButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#2c3e50',
    padding: 8,
    borderRadius: 8,
  },
  resetText: { color: '#fff', fontSize: 14 },
  title: {
    color: '#769ec6ff',
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  matrixContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
    justifyContent: 'center',
  },
  input: {
    width: 80,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    margin: 5,
    fontSize: 18,
  },
  equalButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 20,
  },
  equalText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resultWrapper: { alignItems: 'center', marginTop: 10 },
  resultBox: {
    width: 80,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: { fontSize: 16, color: '#000' },
  errorText: {
    fontSize: 16,
    color: 'red',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
});
