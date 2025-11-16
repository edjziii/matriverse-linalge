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

export default function ThreeByThree() {
  const [matrix, setMatrix] = useState({
    a: '', b: '', c: '',
    d: '', e: '', f: '',
    g: '', h: '', i: '',
  });
  const [result, setResult] = useState(null);

  const calculateInverse = () => {
    const { a, b, c, d, e, f, g, h, i } = matrix;
    const A = parseFloat(a), B = parseFloat(b), C = parseFloat(c);
    const D = parseFloat(d), E = parseFloat(e), F = parseFloat(f);
    const G = parseFloat(g), H = parseFloat(h), I = parseFloat(i);

    const det =
      A * (E * I - F * H) -
      B * (D * I - F * G) +
      C * (D * H - E * G);

    if (isNaN(det) || det === 0) {
      setResult('Matrix is not invertible');
      return;
    }

    const adj = [
      [(E * I - F * H), -(B * I - C * H), (B * F - C * E)],
      [-(D * I - F * G), (A * I - C * G), -(A * F - C * D)],
      [(D * H - E * G), -(A * H - B * G), (A * E - B * D)],
    ];

    // 🔹 Show full decimal precision
    const inverse = adj.map(row => row.map(value => value / det));
    setResult(inverse);
  };

  const reset = () => {
    setMatrix({
      a: '', b: '', c: '',
      d: '', e: '', f: '',
      g: '', h: '', i: '',
    });
    setResult(null);
  };

  const renderMatrixInput = () => (
    <View style={styles.matrixContainer}>
      {Object.keys(matrix).map((key) => (
        <TextInput
          key={key}
          style={styles.input}
          value={matrix[key]}
          onChangeText={(text) => setMatrix({ ...matrix, [key]: text })}
          keyboardType="numeric"
        />
      ))}
    </View>
  );

  const renderResult = () => {
    if (!result) return null;
    if (typeof result === 'string') {
      return <Text style={styles.errorText}>{result}</Text>;
    }
    return (
      <View style={styles.matrixContainer}>
        {result.flat().map((val, idx) => (
          <View style={styles.resultBox} key={idx}>
            <Text style={styles.resultText}>{val}</Text>
          </View>
        ))}
      </View>
    );
  };

  const content = (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      <Text style={styles.title}>3 x 3 Inverse Calculator</Text>

      {renderMatrixInput()}

      <TouchableOpacity style={styles.equalButton} onPress={calculateInverse}>
        <Text style={styles.equalText}>=</Text>
      </TouchableOpacity>

      <View style={styles.resultWrapper}>{renderResult()}</View>
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
    width: 270,
    justifyContent: 'center',
  },
  input: {
    width: 70,
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
    width: 70,
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
