import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import styles from './style/style.loading';
import { moderateScale } from 'react-native-size-matters';

interface LoadingProps {
  style?: ViewStyle;
}

const Loading: React.FC<LoadingProps> = ({ style }) => {
  // Assets
  const onePoint = useSharedValue(0);
  const twoPoint = useSharedValue(0);
  const threePoint = useSharedValue(0);
  const fourPoint = useSharedValue(1);

  const animatedOnePointStyles = useAnimatedStyle(() => ({
    transform: [{ scaleX: onePoint.value }, { scaleY: onePoint.value }],
  }));

  const animatedTwoPointStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: twoPoint.value }, { translateY: 0 }],
  }));

  const animatedThreePointStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: threePoint.value }, { translateY: 0 }],
  }));

  const animatedFourPointStyles = useAnimatedStyle(() => ({
    transform: [{ scaleX: fourPoint.value }, { scaleY: fourPoint.value }],
  }));

  useEffect(() => {
    onePoint.value = withRepeat(withTiming(1, { duration: 600 }), -1, false);
    twoPoint.value = withRepeat(withTiming(24, { duration: 600 }), -1, false);
    threePoint.value = withRepeat(withTiming(24, { duration: 600 }), -1, false);
    fourPoint.value = withRepeat(withTiming(0, { duration: 600 }), -1, false);
  }, []);

  return (
    <View style={[styles.constainer_Loading, style]}>
        <Animated.View
        style={[styles.AnimatedStyle, { left: moderateScale(8, 0.1) }, animatedOnePointStyles]}
        />
        <Animated.View
        style={[styles.AnimatedStyle, { left: moderateScale(8, 0.1) }, animatedTwoPointStyles]}
        />
        <Animated.View
        style={[styles.AnimatedStyle, { left: moderateScale(32, 0.1) }, animatedThreePointStyles]}
        />
        <Animated.View
        style={[styles.AnimatedStyle, { left: moderateScale(56, 0.1) }, animatedFourPointStyles]}
        />
    </View>

  )
}

export default Loading;