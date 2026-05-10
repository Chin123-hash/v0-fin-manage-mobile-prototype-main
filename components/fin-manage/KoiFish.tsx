import { appState } from "@/lib/mock-data";
import React, { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";
import Svg, { Path, Circle, Ellipse, G, Defs, RadialGradient, Stop } from "react-native-svg";

interface KoiFishProps {
  size?: number;
  color?: "neon" | "galaxy" | "sakura" | "calico" | "fire" | "cloud" | "armor" | "gold";
  level?: number;
}

const AnimatedG = Animated.createAnimatedComponent(G);

export function KoiFish({ size = 80, color = "gold", level = appState?.petStats?.level || 5 }: KoiFishProps) {
  const swimX = useRef(new Animated.Value(0)).current;
  const swimY = useRef(new Animated.Value(0)).current;
  const tailWag = useRef(new Animated.Value(0)).current;
  const bodyWiggle = useRef(new Animated.Value(0)).current;

  // 8 Koi variation colors
  const colorSchemes = {
    neon: { body: "#111111", bodyGradient: "#2a2a2a", spots: "#00ffcc", belly: "#222", fin: "#00ffcc", eye: "#00ffcc", glow: "rgba(0, 255, 204, 0.4)" },
    galaxy: { body: "#1a0b2e", bodyGradient: "#3b1c66", spots: "#ffffff", belly: "#2d1650", fin: "#8a2be2", eye: "#fff", glow: "rgba(138, 43, 226, 0.4)" },
    sakura: { body: "#fff0f5", bodyGradient: "#ffffff", spots: "#ffb7c5", belly: "#fff", fin: "#ffc0cb", eye: "#1a0a2e", glow: "rgba(255, 183, 197, 0.4)" },
    calico: { body: "#ffffff", bodyGradient: "#f0f0f0", spots: "#d9381e", belly: "#fff", fin: "#111", eye: "#111", glow: "rgba(255, 255, 255, 0.4)" }, 
    fire: { body: "#8b0000", bodyGradient: "#cc0000", spots: "#ff4500", belly: "#5c0000", fin: "#ff8c00", eye: "#fff", glow: "rgba(255, 69, 0, 0.5)" },
    cloud: { body: "#ffffff", bodyGradient: "#f8f9fa", spots: "#e9ecef", belly: "#fff", fin: "#f8f9fa", eye: "#a0aab5", glow: "rgba(255, 255, 255, 0.6)" },
    armor: { body: "#808080", bodyGradient: "#a9a9a9", spots: "#d3d3d3", belly: "#696969", fin: "#c0c0c0", eye: "#111", glow: "rgba(192, 192, 192, 0.4)" },
    gold: { body: "#ffd166", bodyGradient: "#ffe699", spots: "#ffffff", belly: "#fff5cc", fin: "#ffb700", eye: "#1a0a2e", glow: "rgba(255, 209, 102, 0.4)" },
  };

  const scheme = colorSchemes[color] || colorSchemes.gold;

  useEffect(() => {
    const swimAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(swimX, { toValue: 15, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(swimX, { toValue: -15, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const bobAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(swimY, { toValue: 8, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(swimY, { toValue: -8, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const tailAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(tailWag, { toValue: 1, duration: 400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(tailWag, { toValue: -1, duration: 400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const wiggleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bodyWiggle, { toValue: 1, duration: 600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bodyWiggle, { toValue: -1, duration: 600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );

    swimAnimation.start(); bobAnimation.start(); tailAnimation.start(); wiggleAnimation.start();
    return () => { swimAnimation.stop(); bobAnimation.stop(); tailAnimation.stop(); wiggleAnimation.stop(); };
  }, [swimX, swimY, tailWag, bodyWiggle]);

  // SVG rotations
  const tailRotation = tailWag.interpolate({ inputRange: [-1, 1], outputRange: [-15, 15] }); 
  const bodyRotation = bodyWiggle.interpolate({ inputRange: [-1, 1], outputRange: ["-3deg", "3deg"] });
  const bodyRotationNum = bodyWiggle.interpolate({ inputRange: [-1, 1], outputRange: [-3, 3] });

  return (
    <Animated.View style={{ transform: [{ translateX: swimX }, { translateY: swimY }, { rotate: bodyRotation }], width: size, height: size * 0.6 }}>
      
      {/* Glow effect: Scales up to 1.3x and slightly brighter when level > 5 */}
      <View 
        style={{ 
          position: "absolute", 
          width: size * 0.8, 
          height: size * 0.5, 
          left: size * 0.1, 
          top: size * 0.05, 
          backgroundColor: scheme.glow, 
          borderRadius: size, 
          opacity: level > 5 ? 0.8 : 0.6, 
          transform: [{ scale: level > 5 ? 1.3 : 1 }] 
        }} 
      />

      <Svg width={size} height={size * 0.6} viewBox="0 0 100 60">
        <Defs>
          <RadialGradient id="bodyGradient" cx="50%" cy="30%" r="70%">
            <Stop offset="0%" stopColor={scheme.bodyGradient} />
            <Stop offset="100%" stopColor={scheme.body} />
          </RadialGradient>
        </Defs>
        
        <AnimatedG rotation={tailRotation} origin="75, 30">
          <Path d="M75 30 Q95 15 90 30 Q95 45 75 30" fill={scheme.fin} opacity={0.9} />
        </AnimatedG>
        
        <Ellipse cx="45" cy="30" rx="35" ry="20" fill="url(#bodyGradient)" />
        <Ellipse cx="40" cy="35" rx="20" ry="8" fill={scheme.belly} opacity={0.5} />
        
        {/* Pattern spots */}
        <Circle cx="35" cy="25" r="8" fill={scheme.spots} opacity={0.8} />
        <Circle cx="55" cy="28" r="5" fill={scheme.spots} opacity={0.6} />
        
        <Circle 
          cx="25" 
          cy="32" 
          r={color === 'calico' ? 6 : 4} 
          fill={color === 'calico' ? "#111" : scheme.spots} 
          opacity={color === 'calico' ? 0.8 : 0.4} 
        />

        <Path d="M35 12 Q45 5 55 12 Q50 18 40 18 Z" fill={scheme.fin} opacity={0.85} />
        <Ellipse cx="35" cy="42" rx="10" ry="5" fill={scheme.fin} opacity={0.7} />
        <Ellipse cx="50" cy="42" rx="8" ry="4" fill={scheme.fin} opacity={0.6} />
        
        <Circle cx="20" cy="28" r="5" fill="#ffffff" />
        <Circle cx="19" cy="28" r="3" fill={scheme.eye} />
        <Circle cx="18" cy="27" r="1" fill="#ffffff" />
        
        <Path d="M10 32 Q12 34 10 36" stroke={scheme.body} strokeWidth="1.5" fill="none" />
        <Path d="M12 34 Q8 36 5 34" stroke={scheme.body} strokeWidth="1" fill="none" opacity={0.6} />
        <Path d="M12 35 Q8 38 5 37" stroke={scheme.body} strokeWidth="1" fill="none" opacity={0.6} />

        {/* ✨ Level Up Equipment: Crown (Level 6+) */}
        {level > 5 && (
          <AnimatedG origin="20, 15" rotation={bodyRotationNum}>
            <G transform="translate(15, 12) rotate(-15)">
              {/* Crown Base */}
              <Path d="M0 12 L-4 0 L4 6 L10 -2 L16 6 L24 0 L20 12 Z" fill="#FFD700" stroke="#DAA520" strokeWidth="1" strokeLinejoin="round" />
              <Path d="M0 12 L20 12 L18 15 L2 15 Z" fill="#DAA520" />
              {/* Jewels */}
              <Circle cx="-4" cy="0" r="1.5" fill="#FF3366" />
              <Circle cx="10" cy="-2" r="1.5" fill="#33CCFF" />
              <Circle cx="24" cy="0" r="1.5" fill="#FF3366" />
            </G>
          </AnimatedG>
        )}

      </Svg>
    </Animated.View>
  );
}