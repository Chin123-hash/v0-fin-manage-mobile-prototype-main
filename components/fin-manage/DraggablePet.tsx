import React from 'react';
import { StyleSheet, View, useWindowDimensions, Alert } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { useRouter, usePathname } from 'expo-router';
import { KoiFish } from './KoiFish';

export function DraggablePet() {
  const router = useRouter();
  const pathname = usePathname();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  
  const translateX = useSharedValue(windowWidth - 100);
  const translateY = useSharedValue(windowHeight - 200);
  const context = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);

  // CRITICAL FIX: Added .runOnJS(true) so navigation happens on the JS thread
  const tapGesture = Gesture.Tap()
    .runOnJS(true) 
    .onEnd(() => {
      console.log("👉 Pet clicked! Path:", pathname);
      try {
        console.log("🚀 Attempting push to /pet-hub");
        router.push('/pet-hub');
      } catch (error) {
        console.error("❌ Navigation Error detail:", error);
        Alert.alert("Navigation Failed", "Could not find /pet-hub route.");
      }
    });

  const panGesture = Gesture.Pan()
    .runOnJS(true) // Running movement on JS thread for consistent logging
    .onBegin(() => {
      isPressed.value = true;
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      isPressed.value = false;
      const margin = 20;
      const rightBound = windowWidth - 90;
      const bottomBound = windowHeight - 150;

      if (translateX.value < margin) translateX.value = withSpring(margin);
      else if (translateX.value > rightBound) translateX.value = withSpring(rightBound);

      if (translateY.value < margin) translateY.value = withSpring(margin);
      else if (translateY.value > bottomBound) translateY.value = withSpring(bottomBound);
    });

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: withTiming(isPressed.value ? 1.2 : 1) },
      ],
      opacity: withTiming(isPressed.value ? 0.9 : 1),
    };
  });

  const isVisible = pathname !== '/fin-manage' && pathname !== '/pet-hub';
  if (!isVisible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.petContainer, animatedStyle]}>
          <KoiFish size={70} color="orange" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  petContainer: {
    position: 'absolute',
    width: 80,
    height: 60,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});