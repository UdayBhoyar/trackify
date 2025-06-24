import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();

  // Animation refs for each bar
  const bar1Anim = useRef(new Animated.Value(0)).current;
  const bar2Anim = useRef(new Animated.Value(0)).current;
  const bar3Anim = useRef(new Animated.Value(0)).current;
  const bar4Anim = useRef(new Animated.Value(0)).current;
  const arrowPathAnim = useRef(new Animated.Value(0)).current;
  const arrowOpacity = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  
  // New trail effect animations
  const trailOpacity = useRef(new Animated.Value(0)).current;
  const trailScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animationSequence = Animated.sequence([
      // First, show the circle background with enhanced spring
      Animated.parallel([
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // Then animate bars and arrow climbing together with trail
      Animated.parallel([
        // Bars animation with enhanced stagger
        Animated.stagger(180, [
          Animated.spring(bar1Anim, {
            toValue: 1,
            tension: 90,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(bar2Anim, {
            toValue: 1,
            tension: 90,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(bar3Anim, {
            toValue: 1,
            tension: 90,
            friction: 7,
            useNativeDriver: true,
          }),
          Animated.spring(bar4Anim, {
            toValue: 1,
            tension: 90,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),

        // Enhanced arrow and trail climbing animation
        Animated.sequence([
          // Small delay after bars start forming
          Animated.delay(300),
          // Show trail and arrow together
          Animated.parallel([
            Animated.timing(trailOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.spring(trailScale, {
              toValue: 1,
              tension: 50,
              friction: 6,
              useNativeDriver: true,
            }),
            Animated.timing(arrowOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            // Arrow path with smoother easing
            Animated.timing(arrowPathAnim, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),

      // Finally show the text with enhanced fade
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 2200); // Slightly longer to appreciate the enhanced animation
    });
  }, []);

  // Calculate dynamic positions for the arrow and trail based on bar dimensions
  const barWidth = 8;
  const barSpacing = (60 - 4 * barWidth) / 3;
  const bar1CenterX = -(60 / 2) + barWidth / 2;
  const bar2CenterX = bar1CenterX + barWidth + barSpacing;
  const bar3CenterX = bar2CenterX + barWidth + barSpacing;
  const bar4CenterX = bar3CenterX + barWidth + barSpacing;

  const bar1TopY = 50 / 2 - 15 / 2;
  const bar2TopY = 50 / 2 - 25 / 2;
  const bar3TopY = 50 / 2 - 35 / 2;
  const bar4TopY = 50 / 2 - 45 / 2;

  return (
    <ImageBackground
      source={require('@/assets/images/splash_screen.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Animated.View
          style={[
            styles.logoCircle,
            {
              opacity: circleOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.barsContainer}>
            {/* Enhanced Bar 1 - Shortest with glow effect */}
            <Animated.View
              style={[
                styles.bar1,
                {
                  opacity: bar1Anim,
                  transform: [
                    {
                      scaleY: bar1Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Enhanced Bar 2 - Medium short with glow effect */}
            <Animated.View
              style={[
                styles.bar2,
                {
                  opacity: bar2Anim,
                  transform: [
                    {
                      scaleY: bar2Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Enhanced Bar 3 - Medium long with glow effect */}
            <Animated.View
              style={[
                styles.bar3,
                {
                  opacity: bar3Anim,
                  transform: [
                    {
                      scaleY: bar3Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />

            {/* Enhanced Bar 4 - Longest with glow effect */}
            <Animated.View
              style={[
                styles.bar4,
                {
                  opacity: bar4Anim,
                  transform: [
                    {
                      scaleY: bar4Anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>

          {/* Dynamic Progress Trail */}
          <Animated.View
            style={[
              styles.progressTrail,
              {
                opacity: trailOpacity,
                transform: [
                  { scale: trailScale },
                  {
                    translateX: arrowPathAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [bar1CenterX, bar2CenterX, bar3CenterX, bar4CenterX],
                    }),
                  },
                  {
                    translateY: arrowPathAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [bar1TopY - 15, bar2TopY - 15, bar3TopY - 15, bar4TopY - 15],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.trailCircle} />
          </Animated.View>

          {/* Enhanced Zigzag Climbing Arrow */}
          <Animated.View
            style={[
              styles.zigzagArrow,
              {
                opacity: arrowOpacity,
                transform: [
                  {
                    translateX: arrowPathAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [bar1CenterX, bar2CenterX, bar3CenterX, bar4CenterX],
                    }),
                  },
                  {
                    translateY: arrowPathAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange: [bar1TopY - 10, bar2TopY - 10, bar3TopY - 10, bar4TopY - 10],
                    }),
                  },
                  {
                    scale: arrowPathAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.arrowBody} />
            <View style={styles.arrowGlow} />
          </Animated.View>
        </Animated.View>

        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: textOpacity,
              transform: [
                {
                  translateY: textOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          TRACKIFY
        </Animated.Text>
        
        {/* Subtle tagline that appears with the main text */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: textOpacity,
              transform: [
                {
                  translateY: textOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Small Steps. Big Achievements.
        </Animated.Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 12,
    shadowColor: '#228B22',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    overflow: 'hidden',
  },

  barsContainer: {
    width: 60,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
  },

  // Enhanced Bar 1 - Shortest with subtle glow
  bar1: {
    width: 8,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  // Enhanced Bar 2 - Medium short with subtle glow
  bar2: {
    width: 8,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  // Enhanced Bar 3 - Medium long with subtle glow
  bar3: {
    width: 8,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  // Enhanced Bar 4 - Longest with subtle glow
  bar4: {
    width: 8,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 2,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  // Dynamic Progress Trail
  progressTrail: {
    position: 'absolute',
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  trailCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD700',
    opacity: 0.6,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },

  // Enhanced Zigzag Climbing Arrow
  zigzagArrow: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowBody: {
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#FFD700',
    transform: [{ rotate: '45deg' }],
  },

  arrowGlow: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#FFD700',
    opacity: 0.3,
    transform: [{ rotate: '45deg' }],
  },

  appName: {
    fontSize: 28,
    fontWeight: '300',
    color: '#228B22',
    letterSpacing: 8,
    textAlign: 'center',
    shadowColor: '#228B22',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  tagline: {
    fontSize: 14,
    fontWeight: '400',
    color: '#228B22',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.8,
    fontStyle: 'italic',
  },
});

export default SplashScreen;