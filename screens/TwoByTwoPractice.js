import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';

export default function TwoByTwoPractice({ navigation }) {
  const [problems, setProblems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [userInvertible, setUserInvertible] = useState(false);
  const [userInput, setUserInput] = useState({ a: '', b: '', c: '', d: '' });
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateProblems();
  }, []);

  const generateProblems = () => {
    const generated = [];
    for (let i = 0; i < 10; i++) {
      let a = Math.floor(Math.random() * 10) - 5;
      let b = Math.floor(Math.random() * 10) - 5;
      let c = Math.floor(Math.random() * 10) - 5;
      let d = Math.floor(Math.random() * 10) - 5;

      // Ensure some matrices are invertible and some are not
      if (i % 3 === 0) {
        // make invertible
        while (a * d - b * c === 0) {
          a = Math.floor(Math.random() * 10) - 5;
          b = Math.floor(Math.random() * 10) - 5;
          c = Math.floor(Math.random() * 10) - 5;
          d = Math.floor(Math.random() * 10) - 5;
        }
      } else {
        // make possibly non-invertible
        if (Math.random() > 0.5) {
          a = b = c = d = Math.floor(Math.random() * 5);
        }
      }

      const determinant = a * d - b * c;
      let correctInverse = null;

      if (determinant !== 0) {
        correctInverse = [
          [d / determinant, -b / determinant],
          [-c / determinant, a / determinant],
        ];
      }

      generated.push({
        id: i + 1,
        matrix: { a, b, c, d },
        determinant,
        correctInverse,
      });
    }
    setProblems(generated);
  };

  const checkAnswer = () => {
    const problem = problems[current];
    const isInvertible = problem.determinant !== 0;

    // Function to compare floating-point numbers with tolerance
    const nearlyEqual = (a, b, epsilon = 0.001) => Math.abs(a - b) < epsilon;

    let isCorrect = false;

    if (userInvertible === isInvertible) {
      if (!isInvertible) {
        isCorrect = true; // Correctly identified non-invertible
      } else {
        // Check if user’s inverse values are approximately equal
        isCorrect =
          nearlyEqual(parseFloat(userInput.a), problem.correctInverse[0][0]) &&
          nearlyEqual(parseFloat(userInput.b), problem.correctInverse[0][1]) &&
          nearlyEqual(parseFloat(userInput.c), problem.correctInverse[1][0]) &&
          nearlyEqual(parseFloat(userInput.d), problem.correctInverse[1][1]);
      }
    }

    const newAnswers = [
      ...answers,
      {
        question: `${problem.matrix.a}  ${problem.matrix.b}\n${problem.matrix.c}  ${problem.matrix.d}`,
        actualInvertible: isInvertible,
        userInvertible,
        userAnswer: userInput,
        isCorrect,
        correctInverse: problem.correctInverse,
        determinant: problem.determinant,
      },
    ];
    setAnswers(newAnswers);

    if (isCorrect) setScore(score + 1);

    if (current + 1 < problems.length) {
      setCurrent(current + 1);
      setUserInput({ a: '', b: '', c: '', d: '' });
      setUserInvertible(false);
    } else {
      setShowSummary(true);
    }
  };

  const resetPractice = () => {
    setShowSummary(false);
    setAnswers([]);
    setCurrent(0);
    setScore(0);
    setUserInput({ a: '', b: '', c: '', d: '' });
    generateProblems();
  };

  // ✅ Helper function for formatting numbers
  const formatNumber = (num) => {
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2);
  };

  // ✅ Summary Page
  if (showSummary) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Practice Summary</Text>
          <Text style={styles.scoreText}>
            Score: {score} / {problems.length}
          </Text>

          {answers.map((r, i) => (
            <View
              key={i}
              style={[
                styles.resultItem,
                { backgroundColor: r.isCorrect ? '#a8e6a3' : '#f8b4b4' },
              ]}
            >
              <Text style={styles.resultHeader}>Problem {i + 1}</Text>
              <Text style={styles.resultLabel}>Matrix:</Text>
              <Text style={styles.matrixText}>{r.question}</Text>

              <Text style={styles.resultLabel}>
                Actual Invertible: {r.actualInvertible ? 'Yes' : 'No'}
              </Text>
              <Text style={styles.resultLabel}>
                Your Answer: {r.userInvertible ? 'Yes' : 'No'}
              </Text>

              {!r.actualInvertible ? (
                <Text style={styles.resultLabel}>
                  Determinant: {r.determinant} (Not Invertible)
                </Text>
              ) : (
                <>
                  <Text style={styles.resultLabel}>
                    Determinant: {formatNumber(r.determinant)}
                  </Text>

                  <Text style={styles.resultLabel}>Correct Inverse:</Text>
                  <View style={styles.inverseMatrix}>
                    {r.correctInverse.map((row, rowIndex) => (
                      <View key={rowIndex} style={styles.row}>
                        {row.map((val, colIndex) => (
                          <Text key={colIndex} style={styles.inverseValue}>
                            {formatNumber(val)}
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>

                  {r.userAnswer && r.userInvertible ? (
                    <>
                      <Text style={styles.resultLabel}>Your Inverse:</Text>
                      <View style={styles.inverseMatrix}>
                        <View style={styles.row}>
                          <Text style={styles.inverseValue}>{r.userAnswer.a || '-'}</Text>
                          <Text style={styles.inverseValue}>{r.userAnswer.b || '-'}</Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={styles.inverseValue}>{r.userAnswer.c || '-'}</Text>
                          <Text style={styles.inverseValue}>{r.userAnswer.d || '-'}</Text>
                        </View>
                      </View>
                    </>
                  ) : null}
                </>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={resetPractice}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2c3e50' }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ✅ Practice Question Page
  const currentProblem = problems[current];

  if (!currentProblem) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Problem {current + 1} of {problems.length}</Text>
        <Text style={styles.matrixLabel}>Matrix:</Text>
        <View style={styles.matrix}>
          <Text style={styles.matrixRow}>
            {currentProblem.matrix.a} {currentProblem.matrix.b}
          </Text>
          <Text style={styles.matrixRow}>
            {currentProblem.matrix.c} {currentProblem.matrix.d}
          </Text>
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Is this matrix invertible?</Text>
          <Switch
            value={userInvertible}
            onValueChange={setUserInvertible}
            thumbColor={userInvertible ? '#4caf50' : '#ccc'}
          />
        </View>

        {userInvertible && (
          <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>Enter Inverse Matrix:</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="a"
                value={userInput.a}
                onChangeText={(text) => setUserInput({ ...userInput, a: text })}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="b"
                value={userInput.b}
                onChangeText={(text) => setUserInput({ ...userInput, b: text })}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="c"
                value={userInput.c}
                onChangeText={(text) => setUserInput({ ...userInput, c: text })}
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="d"
                value={userInput.d}
                onChangeText={(text) => setUserInput({ ...userInput, d: text })}
              />
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={checkAnswer}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🔹 Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b202eff',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  matrixLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  matrix: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  matrixRow: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleLabel: {
    color: '#fff',
    marginRight: 10,
    fontSize: 16,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#fff',
    width: 80,
    height: 50,
    margin: 5,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#769ec6ff',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  summaryContainer: {
    padding: 20,
  },
  summaryTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#769ec6ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
  },
  resultHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  resultLabel: {
    color: '#000',
    fontWeight: '600',
    marginTop: 5,
  },
  matrixText: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#000',
  },
  inverseMatrix: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
  },
  inverseValue: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#000',
    width: 60,
    textAlign: 'center',
  },
});
