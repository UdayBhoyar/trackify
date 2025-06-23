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

  useEffect(() => {
    const animationSequence = Animated.sequence([
      // First, show the circle background
      Animated.parallel([
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),

      // Then animate bars and arrow climbing together
      Animated.parallel([
        // Bars animation with stagger
        Animated.stagger(150, [
          Animated.spring(bar1Anim, {
            toValue: 1,
            tension: 80,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.spring(bar2Anim, {
            toValue: 1,
            tension: 80,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.spring(bar3Anim, {
            toValue: 1,
            tension: 80,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.spring(bar4Anim, {
            toValue: 1,
            tension: 80,
            friction: 6,
            useNativeDriver: true,
          }),
        ]),

        // Arrow zigzag climbing animation (after bars are formed)
        Animated.sequence([
          // Small delay after bars complete
          Animated.delay(200),
          // Show and animate zigzag path
          Animated.parallel([
            Animated.timing(arrowOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(arrowPathAnim, {
              toValue: 1,
              duration: 1200,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),

      // Finally show the text
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    animationSequence.start(() => {
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 2000);
    });
  }, []);

  // Calculate dynamic positions for the arrow and trail based on bar dimensions
  // Assuming bar width is 8 and spacing between bars is roughly (60 - 4*8)/3 = 9.33
  // Let's approximate the center of each bar for arrow positioning
  const barWidth = 8;
  const barSpacing = (60 - (4 * barWidth)) / 3; // Total width of barsContainer - (sum of bar widths) / number of spaces
  const initialX = -(60 / 2) + (barWidth / 2) + (barWidth / 2); // Start at the center of the first bar
  const bar1CenterX = -(60 / 2) + barWidth / 2; // X for bar 1 center relative to barsContainer center
  const bar2CenterX = bar1CenterX + barWidth + barSpacing;
  const bar3CenterX = bar2CenterX + barWidth + barSpacing;
  const bar4CenterX = bar3CenterX + barWidth + barSpacing;

  const bar1TopY = 50 / 2 - (15 / 2); // Y for bar 1 top relative to barsContainer center (height 50)
  const bar2TopY = 50 / 2 - (25 / 2);
  const bar3TopY = 50 / 2 - (35 / 2);
  const bar4TopY = 50 / 2 - (45 / 2);

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
            {/* Bar 1 - Shortest */}
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

            {/* Bar 2 - Medium short */}
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

            {/* Bar 3 - Medium long */}
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

            {/* Bar 4 - Longest */}
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

          {/* Zigzag Climbing Arrow */}
          <Animated.View
            style={[
              styles.zigzagArrow,
              {
                opacity: arrowOpacity,
                transform: [
                  {
                    translateX: arrowPathAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      // Start above bar1, move to center of bars
                      outputRange: [bar1CenterX, bar2CenterX, bar3CenterX, bar4CenterX],
                    }),
                  },
                  {
                    translateY: arrowPathAnim.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      // Start at top of bar1, climb to top of bar4
                      outputRange: [bar1TopY - 10, bar2TopY - 10, bar3TopY - 10, bar4TopY - 10], // Adjust -10 for arrowhead positioning
                    }),
                  },
                  {
                    rotate: arrowPathAnim.interpolate({
                      inputRange: [0, 0.25, 0.5, 0.75, 1],
                      outputRange: ['30deg', '-15deg', '20deg', '-10deg', '15deg'], // Zigzag rotation
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.arrowBody} />
            <View style={styles.arrowHead} />
          </Animated.View>

          {/* Zigzag Trail Path */}
          <Animated.View
            style={[
              styles.zigzagTrail,
              {
                opacity: arrowOpacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.6],
                }),
                // Position the trail to follow the arrow's start
                top: 50 / 2 - (15 / 2) + 5, // A bit below bar1TopY, adjust for trail appearance
                left: -(60 / 2) + (barWidth / 2) - 10, // Adjust to start near the first bar
              },
            ]}
          >
            <Animated.View
              style={[
                styles.trailSegment1,
                {
                  transform: [
                    {
                      scaleX: arrowPathAnim.interpolate({
                        inputRange: [0, 0.33],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.trailSegment2,
                {
                  transform: [
                    {
                      scaleX: arrowPathAnim.interpolate({
                        inputRange: [0.33, 0.66],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.trailSegment3,
                {
                  transform: [
                    {
                      scaleX: arrowPathAnim.interpolate({
                        inputRange: [0.66, 1],
                        outputRange: [0, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            />
          </Animated.View>
        </Animated.View>

        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: textOpacity,
            },
          ]}
        >
          TRACKIFY
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
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: 'hidden', // Crucial to contain absolute positioned children
  },

  barsContainer: {
    width: 60,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // Positioning within the circle to influence arrow start point
    position: 'absolute',
    bottom: 20, // Adjust this as needed to position the bars visually within the circle
  },

  // Bar 1 - Shortest (15px height)
  bar1: {
    width: 8,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 2,
  },

  // Bar 2 - Medium short (25px height)
  bar2: {
    width: 8,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 2,
  },

  // Bar 3 - Medium long (35px height)
  bar3: {
    width: 8,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 2,
  },

  // Bar 4 - Longest (45px height)
  bar4: {
    width: 8,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 2,
  },

  // Zigzag Climbing Arrow
  zigzagArrow: {
    position: 'absolute',
    // The initial `bottom` and `left` will be handled by the interpolate values
    // but a rough initial placement relative to the logoCircle can be here if needed
    // However, it's better to rely on `translateX` and `translateY` for precise control
    alignItems: 'center',
    justifyContent: 'center', // Center the arrow body and head
  },

  arrowBody: {
    width: 2,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 1,
    marginBottom: 1,
  },

  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFD700',
  },

  // Zigzag Trail
  zigzagTrail: {
    position: 'absolute',
    // The top and left values for the trail segments will also be relative
    // to their parent, and the segments will grow based on scaleX animation.
    // The main positioning will be managed by `top` and `left` here
    // which effectively sets the origin for the trail segments.
    width: 44, // This width will define the horizontal spread of the trail
    height: 35, // This height will define the vertical spread of the trail
  },

  trailSegment1: {
    position: 'absolute',
    // These need to be positioned relative to zigzagTrail
    bottom: 15, // Relative to zigzagTrail's bottom
    left: 0, // Relative to zigzagTrail's left
    width: 15,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
    transformOrigin: 'left',
    transform: [{ rotate: '30deg' }],
  },

  trailSegment2: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    width: 15,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
    transformOrigin: 'left',
    transform: [{ rotate: '-20deg' }],
  },

  trailSegment3: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    width: 15,
    height: 2,
    backgroundColor: '#FFD700',
    borderRadius: 1,
    transformOrigin: 'left',
    transform: [{ rotate: '25deg' }],
  },

  appName: {
    fontSize: 28,
    fontWeight: '300',
    color: '#228B22',
    letterSpacing: 8,
    textAlign: 'center',
  },
});

export default SplashScreen;