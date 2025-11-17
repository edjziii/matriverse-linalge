import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function InverseMatricesCourse({ navigation }) {
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
            colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.title}>Inverse Matrices</Text>

            {/* OVERVIEW */}
            <View style={styles.section}>
              <Text style={styles.heading}>Overview</Text>
              <View style={styles.divider} />
              <Text style={styles.text}>
                The inverse of a matrix is like the reciprocal of a number. If a matrix A has an inverse,
                denoted as A⁻¹, then:
              </Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>A · A⁻¹ = I</Text>
              </View>
              <Text style={styles.text}>
                where I is the identity matrix. Not all matrices have inverses — only those with
                a non-zero determinant.
              </Text>
            </View>

            {/* REAL LIFE EXAMPLES */}
            <View style={styles.section}>
              <Text style={styles.heading}>Real-Life Applications</Text>
              <View style={styles.divider} />
              <View style={styles.applicationCard}>
                <Text style={styles.applicationTitle}>Computer Graphics</Text>
                <Text style={styles.text}>
                  Used for reversing transformations such as rotation, scaling, or translation when rendering 3D objects.
                </Text>
              </View>
              <View style={styles.applicationCard}>
                <Text style={styles.applicationTitle}>Cryptography</Text>
                <Text style={styles.text}>
                  Inverse matrices are used to decrypt encoded messages.
                </Text>
              </View>
              <View style={styles.applicationCard}>
                <Text style={styles.applicationTitle}>Engineering</Text>
                <Text style={styles.text}>
                  Solving systems of linear equations, especially in electrical circuits and structural analysis.
                </Text>
              </View>
              <View style={styles.applicationCard}>
                <Text style={styles.applicationTitle}>Economics</Text>
                <Text style={styles.text}>
                  Input-output models use inverse matrices to analyze production relationships.
                </Text>
              </View>
            </View>

            {/* YOUTUBE LINKS */}
            <View style={styles.section}>
              <Text style={styles.heading}>Helpful Video Lessons</Text>
              <View style={styles.divider} />
              <View style={styles.linkCard}>
                <Text style={styles.linkTitle}>2×2 Inverse Matrix Tutorial</Text>
                <Text style={styles.link}>
                  https://www.youtube.com/watch?v=FX4C-JpTFgY
                </Text>
              </View>
              <View style={styles.linkCard}>
                <Text style={styles.linkTitle}>3×3 Inverse Matrix Tutorial</Text>
                <Text style={styles.link}>
                  https://www.youtube.com/watch?v=1Hj9QteZWFQ
                </Text>
              </View>
            </View>

            {/* SAMPLE PROBLEM */}
            <View style={styles.section}>
              <Text style={styles.heading}>Sample Problem</Text>
              <View style={styles.divider} />
              <Text style={styles.text}>Find the inverse of the matrix:</Text>
              <View style={styles.matrixContainer}>
                <Text style={styles.matrixLabel}>A =</Text>
                <View style={styles.matrix}>
                  <View style={styles.matrixBracket} />
                  <View style={styles.matrixContent}>
                    <View style={styles.matrixRow}>
                      <Text style={styles.matrixElement}>2</Text>
                      <Text style={styles.matrixElement}>1</Text>
                    </View>
                    <View style={styles.matrixRow}>
                      <Text style={styles.matrixElement}>5</Text>
                      <Text style={styles.matrixElement}>3</Text>
                    </View>
                  </View>
                  <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
                </View>
              </View>

              <Text style={styles.solutionHeading}>Step-by-step Solution</Text>

              <View style={styles.stepCard}>
                <Text style={styles.stepNumber}>Step 1</Text>
                <Text style={styles.stepTitle}>Find the determinant</Text>
                <Text style={styles.text}>det(A) = (2)(3) - (1)(5) = 6 - 5 = 1</Text>
              </View>

              <View style={styles.stepCard}>
                <Text style={styles.stepNumber}>Step 2</Text>
                <Text style={styles.stepTitle}>Swap the diagonal elements</Text>
                <Text style={styles.text}>2 and 3 become 3 and 2</Text>
              </View>

              <View style={styles.stepCard}>
                <Text style={styles.stepNumber}>Step 3</Text>
                <Text style={styles.stepTitle}>Change the signs of the off-diagonal elements</Text>
                <Text style={styles.text}>1 becomes -1{"\n"}5 becomes -5</Text>
              </View>

              <View style={styles.stepCard}>
                <Text style={styles.stepNumber}>Step 4</Text>
                <Text style={styles.stepTitle}>Multiply by 1/det(A)</Text>
                <Text style={styles.text}>Since det = 1, the matrix stays the same.</Text>
              </View>

              <View style={styles.resultContainer}>
                <View style={styles.matrixContainer}>
                  <Text style={styles.resultLabel}>A⁻¹ =</Text>
                  <View style={styles.matrix}>
                    <View style={[styles.matrixBracket, styles.resultBracket]} />
                    <View style={styles.matrixContent}>
                      <View style={styles.matrixRow}>
                        <Text style={[styles.matrixElement, styles.resultElement]}>3</Text>
                        <Text style={[styles.matrixElement, styles.resultElement]}>-1</Text>
                      </View>
                      <View style={styles.matrixRow}>
                        <Text style={[styles.matrixElement, styles.resultElement]}>-5</Text>
                        <Text style={[styles.matrixElement, styles.resultElement]}>2</Text>
                      </View>
                    </View>
                    <View style={[styles.matrixBracket, styles.matrixBracketRight, styles.resultBracket]} />
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}
            >
              <LinearGradient
                colors={['#769ec6', '#5a8bb8']}
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
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  section: {
    marginBottom: 28,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#a7c7e7',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(167,199,231,0.3)',
    marginBottom: 16,
    borderRadius: 1,
  },
  text: {
    fontSize: 16,
    color: '#e8f4f8',
    marginBottom: 10,
    lineHeight: 24,
  },
  formulaContainer: {
    backgroundColor: 'rgba(118,158,198,0.15)',
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#76d6ff',
  },
  formula: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  applicationCard: {
    backgroundColor: 'rgba(118,158,198,0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#769ec6',
  },
  applicationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#90c9ff',
    marginBottom: 6,
  },
  linkCard: {
    backgroundColor: 'rgba(118,158,198,0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#76d6ff',
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  link: {
    fontSize: 14,
    color: '#90c9ff',
    fontFamily: 'monospace',
  },
  solutionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#76d6ff',
    marginTop: 16,
    marginBottom: 16,
  },
  stepCard: {
    backgroundColor: 'rgba(118,158,198,0.08)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(118,158,198,0.2)',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#76d6ff',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  matrixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  matrixLabel: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    marginRight: 12,
  },
  matrix: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matrixBracket: {
    width: 3,
    height: 80,
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
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  matrixRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  matrixElement: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  resultContainer: {
    backgroundColor: 'rgba(118,214,255,0.15)',
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: 'rgba(118,214,255,0.3)',
  },
  resultLabel: {
    fontSize: 22,
    color: '#76d6ff',
    fontWeight: '700',
    marginRight: 12,
  },
  resultBracket: {
    backgroundColor: '#76d6ff',
    height: 90,
  },
  resultElement: {
    color: '#76d6ff',
    fontSize: 26,
  },
  button: {
    borderRadius: 14,
    marginTop: 24,
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
  }
});