import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
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
  
  // Hide the floating fish in screens where the sanctuary or tank is already visible
  if (pathname === '/fin-manage' || pathname === '/pet-hub') {
    return null;
  }

  const translateX = useSharedValue(windowWidth - 100);
  const translateY = useSharedValue(windowHeight - 200);
  const context = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);

  // Gesture to go to the Pet Hub when clicked
  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      router.push('/pet-hub');
    });

  // Gesture to drag the pet around
  const panGesture = Gesture.Pan()
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

  // panGesture and tapGesture are combined. Pan takes priority for movement.
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