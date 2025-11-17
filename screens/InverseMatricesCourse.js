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
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');

export default function InverseMatricesCourse({ navigation }) {
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
      {/* BACKGROUND */}
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
                The inverse of a matrix works similarly to the reciprocal of a number.
                For a number k, the reciprocal is 1/k because:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>k · (1/k) = 1</Text>
              </View>

              <Text style={styles.text}>
                For a square matrix A, the inverse A⁻¹ is defined so that:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>A · A⁻¹ = I</Text>
              </View>

              <Text style={styles.text}>
                where I is the identity matrix. A matrix has an inverse only if:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>det(A) ≠ 0</Text>
              </View>

              <Text style={styles.text}>
                If det(A) = 0, the matrix is singular and has no inverse.
                Matrix inverses are used in solving systems of equations, undoing
                transformations, decoding signals, and computer graphics.
              </Text>
            </View>

            {/* VIDEO - LOCAL FILE */}
            <View style={styles.section}>
              <Text style={styles.heading}>Video Lesson</Text>
              <View style={styles.divider} />

              <Video
                source={require('../video/tutorial.mp4')}
                style={{ width: '100%', height: 220, borderRadius: 12 }}
                resizeMode="cover"
                useNativeControls
              />
            </View>

            {/* WHY USE MATRIX INVERSES */}
            <View style={styles.section}>
              <Text style={styles.heading}>Why Use Matrix Inverses?</Text>
              <View style={styles.divider} />

              <Text style={styles.text}>
                Inverses are used to undo transformations and solve linear systems.
                If we have:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>A · X = B</Text>
              </View>

              <Text style={styles.text}>
                Multiply both sides by A⁻¹:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>X = A⁻¹ · B</Text>
              </View>
            </View>

            {/* HOW TO FIND 2x2 INVERSE */}
            <View style={styles.section}>
              <Text style={styles.heading}>How to Find a 2×2 Inverse</Text>
              <View style={styles.divider} />

              <Text style={styles.text}>
                For a 2×2 matrix, the inverse formula is straightforward.
                If:
              </Text>

              <View style={styles.matrixDisplay}>
                <View style={styles.matrixBracket} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>a</Text>
                    <Text style={styles.matrixElement}>b</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>c</Text>
                    <Text style={styles.matrixElement}>d</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
              </View>

              <Text style={styles.text}>
                The determinant of A is:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>det(A) = ad − bc</Text>
              </View>

              <Text style={styles.text}>
                If det(A) ≠ 0, the inverse is:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>A⁻¹ = 1/(ad − bc) ·</Text>
              </View>

              <View style={styles.matrixDisplay}>
                <View style={styles.matrixBracket} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>d</Text>
                    <Text style={styles.matrixElement}>−b</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>−c</Text>
                    <Text style={styles.matrixElement}>a</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
              </View>

              <Text style={styles.text}>
                Steps to compute a 2×2 inverse:
              </Text>

              <Text style={styles.text}>1. Compute the determinant ad − bc.</Text>
              <Text style={styles.text}>2. Swap a ↔ d.</Text>
              <Text style={styles.text}>3. Change signs of b and c.</Text>
              <Text style={styles.text}>4. Multiply everything by 1/(ad − bc).</Text>
            </View>

            {/* HOW TO FIND 3x3 INVERSE */}
            <View style={styles.section}>
              <Text style={styles.heading}>How to Find a 3×3 Inverse</Text>
              <View style={styles.divider} />

              <Text style={styles.text}>
                Finding the inverse of a 3×3 matrix requires more steps
                than a 2×2. For matrix A:
              </Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>A⁻¹ = (1 / det(A)) · adj(A)</Text>
              </View>

              <Text style={styles.text}>
                Here are the full steps:
              </Text>

              <Text style={styles.text}>
                1. <Text style={{fontWeight:'700'}}>Find the determinant det(A)</Text>
                {'\n'}   Use cofactor expansion or Sarrus rule.
              </Text>

              <Text style={styles.text}>
                2. <Text style={{fontWeight:'700'}}>Find the matrix of minors</Text>
                {'\n'}   Each element is replaced with the determinant of its 2×2 submatrix.
              </Text>

              <Text style={styles.text}>
                3. <Text style={{fontWeight:'700'}}>Convert to cofactor matrix</Text>
                {'\n'}   Apply a checkerboard pattern of signs:
              </Text>

              <View style={styles.matrixDisplay}>
                <View style={styles.matrixBracket3x3} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>+</Text>
                    <Text style={styles.matrixElement}>−</Text>
                    <Text style={styles.matrixElement}>+</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>−</Text>
                    <Text style={styles.matrixElement}>+</Text>
                    <Text style={styles.matrixElement}>−</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>+</Text>
                    <Text style={styles.matrixElement}>−</Text>
                    <Text style={styles.matrixElement}>+</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket3x3, styles.matrixBracketRight]} />
              </View>

              <Text style={styles.text}>
                4. <Text style={{fontWeight:'700'}}>Transpose the cofactor matrix</Text>
                {'\n'}   This gives the adjoint/adjugate matrix adj(A).
              </Text>

              <Text style={styles.text}>
                5. <Text style={{fontWeight:'700'}}>Multiply adj(A) by 1/det(A)</Text>
                {'\n'}   This produces A⁻¹.
              </Text>
            </View>

            {/* CORRECT MATHISFUN EXAMPLE */}
            <View style={styles.section}>
              <Text style={styles.heading}>Example Problem (MathIsFun)</Text>
              <View style={styles.divider} />

              <Text style={styles.text}>Given:</Text>
              <Text style={styles.text}>• Children pay 1.5 dollars</Text>
              <Text style={styles.text}>• Adults pay 4 dollars</Text>
              <Text style={styles.text}>• Total people = 200</Text>
              <Text style={styles.text}>• Total money = 600 dollars</Text>

              <Text style={styles.text}>
                Write as a matrix system A·X = B:
              </Text>

              <View style={styles.matrixDisplay}>
                <View style={styles.matrixBracket} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>1</Text>
                    <Text style={styles.matrixElement}>1</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>1.5</Text>
                    <Text style={styles.matrixElement}>4</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
              </View>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>B = [200, 600]</Text>
              </View>

              <Text style={styles.solutionHeading}>Step-by-Step Solution</Text>

              <Text style={styles.text}>1. Compute determinant:</Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>
                  det(A) = (1)(4) − (1)(1.5) = 4 − 1.5 = 2.5
                </Text>
              </View>

              <Text style={styles.text}>2. Apply inverse formula:</Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>A⁻¹ = 1/2.5 ·</Text>
              </View>

              <View style={styles.matrixDisplay}>
                <View style={styles.matrixBracket} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>4</Text>
                    <Text style={styles.matrixElement}>−1</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>−1.5</Text>
                    <Text style={styles.matrixElement}>1</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
              </View>

              <Text style={styles.text}>3. Multiply A⁻¹B:</Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>X = A⁻¹B =</Text>
              </View>

              <View style={styles.matrixDisplay}>
                <View style={styles.matrixBracket} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>4</Text>
                    <Text style={styles.matrixElement}>−1</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>−1.5</Text>
                    <Text style={styles.matrixElement}>1</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
                <Text style={styles.matrixMultiply}>·</Text>
                <View style={styles.matrixBracket} />
                <View style={styles.matrixContent}>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>200</Text>
                  </View>
                  <View style={styles.matrixRow}>
                    <Text style={styles.matrixElement}>600</Text>
                  </View>
                </View>
                <View style={[styles.matrixBracket, styles.matrixBracketRight]} />
              </View>

              <Text style={styles.text}>4. Compute:</Text>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>
                  Children = (4·200 − 1·600) / 2.5 = 200 / 2.5 = 80
                </Text>
              </View>

              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>
                  Adults = (−1.5·200 + 1·600) / 2.5 = 300 / 2.5 = 120
                </Text>
              </View>

              <Text style={styles.solutionHeading}>Final Answer</Text>

              <View style={styles.resultContainer}>
                <Text style={styles.resultLabel}>Children: 80</Text>
                <Text style={styles.resultLabel}>Adults: 120</Text>
              </View>
            </View>

            {/* BACK BUTTON */}
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
  safeArea: { flex: 1, backgroundColor: '#121825' },
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
  gradientOverlay: { padding: 24 },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  section: { marginBottom: 28 },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#a7c7e7',
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: 'rgba(167,199,231,0.3)',
    marginBottom: 16,
    borderRadius: 1,
  },
  text: { fontSize: 16, color: '#e8f4f8', marginBottom: 10, lineHeight: 24 },
  formulaContainer: {
    backgroundColor: 'rgba(118,158,198,0.15)',
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#76d6ff',
  },
  formula: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  matrixDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  matrixBracket: {
    width: 3,
    height: 80,
    backgroundColor: '#76d6ff',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  matrixBracket3x3: {
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
  matrixContent: { paddingHorizontal: 20, paddingVertical: 8 },
  matrixRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 4 },
  matrixElement: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    width: 50,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  matrixMultiply: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    marginHorizontal: 8,
    fontFamily: 'monospace',
  },
  solutionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#76d6ff',
    marginTop: 16,
    marginBottom: 16,
  },
  resultContainer: {
    backgroundColor: 'rgba(118,214,255,0.15)',
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: 'rgba(118,214,255,0.3)',
  },
  resultLabel: { fontSize: 22, color: '#76d6ff', fontWeight: '700' },
  button: {
    borderRadius: 14,
    marginTop: 24,
    overflow: 'hidden',
    elevation: 6,
  },
  buttonGradient: { padding: 16 },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});