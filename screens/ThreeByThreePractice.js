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
  Animated,
  Easing,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function ThreeByThreePractice({ navigation }) {
  const [problems, setProblems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [userInvertible, setUserInvertible] = useState(false);
  const [userInput, setUserInput] = useState({
    a: '', b: '', c: '',
    d: '', e: '', f: '',
    g: '', h: '', i: ''
  });
  const [score, setScore] = useState(0);

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

  useEffect(() => {
    generateProblems();
  }, []);

  // Calculate determinant of 3x3 matrix
  const calculateDeterminant = (matrix) => {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  };

  // Calculate inverse of 3x3 matrix
  const calculateInverse = (matrix) => {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    const det = calculateDeterminant(matrix);
    
    if (det === 0) return null;

    // Calculate cofactor matrix
    const cofactor = [
      [
        (e * i - f * h),
        -(d * i - f * g),
        (d * h - e * g)
      ],
      [
        -(b * i - c * h),
        (a * i - c * g),
        -(a * h - b * g)
      ],
      [
        (b * f - c * e),
        -(a * f - c * d),
        (a * e - b * d)
      ]
    ];

    // Transpose and divide by determinant
    const inverse = [
      [cofactor[0][0] / det, cofactor[1][0] / det, cofactor[2][0] / det],
      [cofactor[0][1] / det, cofactor[1][1] / det, cofactor[2][1] / det],
      [cofactor[0][2] / det, cofactor[1][2] / det, cofactor[2][2] / det]
    ];

    return inverse;
  };

  const generateProblems = () => {
    const generated = [];
    for (let i = 0; i < 10; i++) {
      let matrix = [
        [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5],
        [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5],
        [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5]
      ];

      // Ensure some matrices are invertible and some are not
      if (i % 3 === 0) {
        // Make invertible by ensuring non-zero determinant
        let det = calculateDeterminant(matrix);
        let attempts = 0;
        while (det === 0 && attempts < 20) {
          matrix = [
            [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5],
            [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5],
            [Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5, Math.floor(Math.random() * 10) - 5]
          ];
          det = calculateDeterminant(matrix);
          attempts++;
        }
      } else {
        // Possibly make non-invertible
        if (Math.random() > 0.6) {
          // Make one row a multiple of another
          const val = Math.floor(Math.random() * 3) + 1;
          matrix[2] = matrix[0].map(x => x * val);
        }
      }

      const determinant = calculateDeterminant(matrix);
      const correctInverse = calculateInverse(matrix);

      generated.push({
        id: i + 1,
        matrix,
        determinant,
        correctInverse,
      });
    }
    setProblems(generated);
  };

  const checkAnswer = () => {
    const problem = problems[current];
    const isInvertible = problem.determinant !== 0;

    const nearlyEqual = (a, b, epsilon = 0.01) => Math.abs(a - b) < epsilon;

    let isCorrect = false;

    if (userInvertible === isInvertible) {
      if (!isInvertible) {
        isCorrect = true;
      } else {
        const userMatrix = [
          [parseFloat(userInput.a) || 0, parseFloat(userInput.b) || 0, parseFloat(userInput.c) || 0],
          [parseFloat(userInput.d) || 0, parseFloat(userInput.e) || 0, parseFloat(userInput.f) || 0],
          [parseFloat(userInput.g) || 0, parseFloat(userInput.h) || 0, parseFloat(userInput.i) || 0]
        ];

        isCorrect = userMatrix.every((row, rowIdx) =>
          row.every((val, colIdx) =>
            nearlyEqual(val, problem.correctInverse[rowIdx][colIdx])
          )
        );
      }
    }

    const newAnswers = [
      ...answers,
      {
        matrix: problem.matrix,
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
      setUserInput({ a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '' });
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
    setUserInput({ a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '' });
    generateProblems();
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '-';
    if (Number.isInteger(num)) return num.toString();
    return num.toFixed(2);
  };

  // Summary Page
  if (showSummary) {
    return (
      <SafeAreaView style={styles.safeArea}>
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
              <Text style={styles.summaryTitle}>Practice Summary</Text>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  Score: {score} / {problems.length}
                </Text>
                <Text style={styles.percentageText}>
                  {Math.round((score / problems.length) * 100)}%
                </Text>
              </View>

              {answers.map((r, i) => (
                <View key={i} style={styles.resultItem}>
                  <View style={[
                    styles.resultHeader,
                    { backgroundColor: r.isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)' }
                  ]}>
                    <Text style={styles.resultHeaderText}>
                      Problem {i + 1} {r.isCorrect ? '✓' : '✗'}
                    </Text>
                  </View>

                  <View style={styles.resultContent}>
                    <Text style={styles.resultLabel}>Matrix:</Text>
                    <View style={styles.summaryMatrixContainer}>
                      <View style={styles.matrixBracket} />
                      <View style={styles.summaryMatrixContent}>
                        {r.matrix.map((row, rowIdx) => (
                          <View key={rowIdx} style={styles.summaryMatrixRow}>
                            {row.map((val, colIdx) => (
                              <Text key={colIdx} style={styles.summaryMatrixElement}>
                                {formatNumber(val)}
                              </Text>
                            ))}
                          </View>
                        ))}
                      </View>
                      <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
                    </View>

                    <View style={styles.answerRow}>
                      <Text style={styles.resultLabel}>
                        Invertible: <Text style={styles.answerValue}>{r.actualInvertible ? 'Yes' : 'No'}</Text>
                      </Text>
                      <Text style={styles.resultLabel}>
                        Your Answer: <Text style={[
                          styles.answerValue,
                          { color: r.userInvertible === r.actualInvertible ? '#4caf50' : '#f44336' }
                        ]}>{r.userInvertible ? 'Yes' : 'No'}</Text>
                      </Text>
                    </View>

                    {!r.actualInvertible ? (
                      <Text style={styles.determinantText}>
                        Determinant: {formatNumber(r.determinant)} (Not Invertible)
                      </Text>
                    ) : (
                      <>
                        <Text style={styles.determinantText}>
                          Determinant: {formatNumber(r.determinant)}
                        </Text>

                        <Text style={styles.sectionLabel}>Correct Inverse:</Text>
                        <View style={styles.inverseMatrixContainer}>
                          <View style={styles.matrixBracket} />
                          <View style={styles.inverseMatrixContent}>
                            {r.correctInverse.map((row, rowIdx) => (
                              <View key={rowIdx} style={styles.inverseRow}>
                                {row.map((val, colIdx) => (
                                  <Text key={colIdx} style={styles.inverseValue}>
                                    {formatNumber(val)}
                                  </Text>
                                ))}
                              </View>
                            ))}
                          </View>
                          <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
                        </View>

                        {r.userAnswer && r.userInvertible && (
                          <>
                            <Text style={styles.sectionLabel}>Your Inverse:</Text>
                            <View style={styles.inverseMatrixContainer}>
                              <View style={styles.matrixBracket} />
                              <View style={styles.inverseMatrixContent}>
                                <View style={styles.inverseRow}>
                                  <Text style={styles.inverseValue}>{r.userAnswer.a || '-'}</Text>
                                  <Text style={styles.inverseValue}>{r.userAnswer.b || '-'}</Text>
                                  <Text style={styles.inverseValue}>{r.userAnswer.c || '-'}</Text>
                                </View>
                                <View style={styles.inverseRow}>
                                  <Text style={styles.inverseValue}>{r.userAnswer.d || '-'}</Text>
                                  <Text style={styles.inverseValue}>{r.userAnswer.e || '-'}</Text>
                                  <Text style={styles.inverseValue}>{r.userAnswer.f || '-'}</Text>
                                </View>
                                <View style={styles.inverseRow}>
                                  <Text style={styles.inverseValue}>{r.userAnswer.g || '-'}</Text>
                                  <Text style={styles.inverseValue}>{r.userAnswer.h || '-'}</Text>
                                  <Text style={styles.inverseValue}>{r.userAnswer.i || '-'}</Text>
                                </View>
                              </View>
                              <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
                            </View>
                          </>
                        )}
                      </>
                    )}
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.button} onPress={resetPractice}>
                <LinearGradient
                  colors={['#769ec6', '#5a8bb8']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>Try Again</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <LinearGradient
                  colors={['#5a8bb8', '#4a7598']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>Back to Home</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </BlurView>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Practice Question Page
  const currentProblem = problems[current];

  if (!currentProblem) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                Problem {current + 1} of {problems.length}
              </Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${((current + 1) / problems.length) * 100}%` }]} />
              </View>
            </View>

            <Text style={styles.questionLabel}>Find the inverse of:</Text>
            
            <View style={styles.matrixDisplayContainer}>
              <View style={styles.matrixBracket3x3} />
              <View style={styles.matrixContent}>
                {currentProblem.matrix.map((row, rowIdx) => (
                  <View key={rowIdx} style={styles.matrixRow}>
                    {row.map((val, colIdx) => (
                      <Text key={colIdx} style={styles.matrixElement}>
                        {val}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
              <View style={[styles.matrixBracket3x3, styles.matrixBracketRight]} />
            </View>

            <View style={styles.toggleCard}>
              <Text style={styles.toggleLabel}>Is this matrix invertible?</Text>
              <Switch
                value={userInvertible}
                onValueChange={setUserInvertible}
                trackColor={{ false: '#767577', true: '#90c9ff' }}
                thumbColor={userInvertible ? '#76d6ff' : '#f4f3f4'}
              />
            </View>

            {userInvertible && (
              <View style={styles.inputSection}>
                <Text style={styles.inputSectionTitle}>Enter the Inverse Matrix:</Text>
                <View style={styles.inputMatrixContainer}>
                  <View style={styles.matrixBracket3x3} />
                  <View style={styles.inputMatrixContent}>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="a"
                        placeholderTextColor="#90c9ff"
                        value={userInput.a}
                        onChangeText={(text) => setUserInput({ ...userInput, a: text })}
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="b"
                        placeholderTextColor="#90c9ff"
                        value={userInput.b}
                        onChangeText={(text) => setUserInput({ ...userInput, b: text })}
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="c"
                        placeholderTextColor="#90c9ff"
                        value={userInput.c}
                        onChangeText={(text) => setUserInput({ ...userInput, c: text })}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="d"
                        placeholderTextColor="#90c9ff"
                        value={userInput.d}
                        onChangeText={(text) => setUserInput({ ...userInput, d: text })}
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="e"
                        placeholderTextColor="#90c9ff"
                        value={userInput.e}
                        onChangeText={(text) => setUserInput({ ...userInput, e: text })}
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="f"
                        placeholderTextColor="#90c9ff"
                        value={userInput.f}
                        onChangeText={(text) => setUserInput({ ...userInput, f: text })}
                      />
                    </View>
                    <View style={styles.inputRow}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="g"
                        placeholderTextColor="#90c9ff"
                        value={userInput.g}
                        onChangeText={(text) => setUserInput({ ...userInput, g: text })}
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="h"
                        placeholderTextColor="#90c9ff"
                        value={userInput.h}
                        onChangeText={(text) => setUserInput({ ...userInput, h: text })}
                      />
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="i"
                        placeholderTextColor="#90c9ff"
                        value={userInput.i}
                        onChangeText={(text) => setUserInput({ ...userInput, i: text })}
                      />
                    </View>
                  </View>
                  <View style={[styles.matrixBracket3x3, styles.matrixBracketRight]} />
                </View>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={checkAnswer}>
              <LinearGradient
                colors={['#769ec6', '#5a8bb8']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Submit Answer</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#a7c7e7',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(118,158,198,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#76d6ff',
    borderRadius: 4,
  },
  questionLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  matrixDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  matrixBracket3x3: {
    width: 3,
    height: 115,
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
  matrixBracket: {
    width: 3,
    height: 115,
    backgroundColor: '#76d6ff',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  matrixContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  matrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 2,
  },
  matrixElement: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    width: 50,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  toggleCard: {
    backgroundColor: 'rgba(118,158,198,0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(118,158,198,0.2)',
  },
  toggleLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e8f4f8',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a7c7e7',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputMatrixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMatrixContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  input: {
    backgroundColor: 'rgba(118,158,198,0.15)',
    width: 60,
    height: 48,
    margin: 3,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(118,214,255,0.3)',
  },
  button: {
    borderRadius: 14,
    marginTop: 8,
    overflow: 'hidden',
    shadowColor: '#769ec6',
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
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  summaryTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreContainer: {
    backgroundColor: 'rgba(118,158,198,0.15)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(118,214,255,0.3)',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#76d6ff',
  },
  resultItem: {
    backgroundColor: 'rgba(118,158,198,0.08)',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(118,158,198,0.2)',
  },
  resultHeader: {
    padding: 12,
  },
  resultHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  resultContent: {
    padding: 16,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a7c7e7',
    marginBottom: 8,
  },
  summaryMatrixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  summaryMatrixContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  summaryMatrixRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  summaryMatrixElement: {
    fontFamily: 'monospace',
    fontSize: 16,
    color: '#fff',
    width: 50,
    textAlign: 'center',
    fontWeight: '600',
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  answerValue: {
    fontWeight: '700',
    color: '#fff',
  },
  determinantText: {
    fontSize: 16,
    color: '#e8f4f8',
    marginVertical: 8,
    fontFamily: 'monospace',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#76d6ff',
    marginTop: 12,
    marginBottom: 8,
  },
  inverseMatrixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(118,214,255,0.1)',
    padding: 12,
    borderRadius: 12,
  },
  inverseMatrixContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inverseRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  inverseValue: {
    fontFamily: 'monospace',
    fontSize: 15,
    color: '#fff',
    width: 55,
    textAlign: 'center',
    fontWeight: '600',
  },
});