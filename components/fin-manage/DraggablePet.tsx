import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useRouter, usePathname } from 'expo-router';
import { KoiFish } from './KoiFish';
import { personaConfigs, appState } from '@/lib/mock-data';

export function DraggablePet() {
  const router = useRouter();
  const pathname = usePathname();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  
  // 🔥 READ FROM GLOBAL STATE
  const userPersona = appState.userPersona || "balancer";
  const hasFinishedQuiz = appState.hasFinishedQuiz;

  const translateX = useSharedValue(windowWidth - 100);
  const translateY = useSharedValue(windowHeight - 200);
  const context = useSharedValue({ x: 0, y: 0 });
  const isPressed = useSharedValue(false);

  const tapGesture = Gesture.Tap().runOnJS(true).onEnd(() => { router.push('/pet-hub'); });

  const panGesture = Gesture.Pan()
    .onBegin(() => { isPressed.value = true; context.value = { x: translateX.value, y: translateY.value }; })
    .onUpdate((event) => { translateX.value = event.translationX + context.value.x; translateY.value = event.translationY + context.value.y; })
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: withTiming(isPressed.value ? 1.2 : 1) }],
    opacity: withTiming(isPressed.value ? 0.9 : 1),
  }));

  // 🔥 HIDE ON SPECIFIC SCREENS OR IF QUIZ NOT FINISHED
  // Added pathname.startsWith('/group-tank') to hide it in the group tank as well!
  const isHidden = pathname === '/fin-manage' || pathname === '/pet-hub' || pathname === '/me' || pathname.startsWith('/group-tank') || !hasFinishedQuiz;
  
  if (isHidden) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.petContainer, animatedStyle]}>
          {/* 🔥 USE PERSONA COLOR */}
          <KoiFish size={70} color={personaConfigs[userPersona].fishColor as any} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  petContainer: { position: 'absolute', width: 80, height: 60, zIndex: 9999, justifyContent: 'center', alignItems: 'center' },
});