import React, { useEffect, useRef } from "react";
import { Animated, View, Easing } from "react-native";
import Svg, { Path, Circle, Ellipse, G, Defs, RadialGradient, Stop } from "react-native-svg";

interface KoiFishProps {
  size?: number;
  color?: "orange" | "white" | "gold";
}

const AnimatedG = Animated.createAnimatedComponent(G);

export function KoiFish({ size = 80, color = "orange" }: KoiFishProps) {
  const swimX = useRef(new Animated.Value(0)).current;
  const swimY = useRef(new Animated.Value(0)).current;
  const tailWag = useRef(new Animated.Value(0)).current;
  const bodyWiggle = useRef(new Animated.Value(0)).current;

  // Color schemes for different koi variants
  const colorSchemes = {
    orange: {
      body: "#ff6b35",
      bodyGradient: "#ff8c5a",
      spots: "#ffffff",
      belly: "#ffe4d4",
      fin: "#ff4d00",
      eye: "#1a0a2e",
      glow: "rgba(255, 107, 53, 0.4)",
    },
    white: {
      body: "#f5f5f5",
      bodyGradient: "#ffffff",
      spots: "#ff6b35",
      belly: "#ffffff",
      fin: "#ffcccc",
      eye: "#1a0a2e",
      glow: "rgba(255, 255, 255, 0.4)",
    },
    gold: {
      body: "#ffd166",
      bodyGradient: "#ffe699",
      spots: "#ffffff",
      belly: "#fff5cc",
      fin: "#ffb700",
      eye: "#1a0a2e",
      glow: "rgba(255, 209, 102, 0.4)",
    },
  };

  const scheme = colorSchemes[color];

  useEffect(() => {
    // Horizontal swimming motion
    const swimAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(swimX, {
          toValue: 15,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(swimX, {
          toValue: -15,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Vertical bobbing motion
    const bobAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(swimY, {
          toValue: 8,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(swimY, {
          toValue: -8,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Tail wagging animation
    const tailAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(tailWag, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(tailWag, {
          toValue: -1,
          duration: 400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    // Body wiggle
    const wiggleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bodyWiggle, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bodyWiggle, {
          toValue: -1,
          duration: 600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    swimAnimation.start();
    bobAnimation.start();
    tailAnimation.start();
    wiggleAnimation.start();

    return () => {
      swimAnimation.stop();
      bobAnimation.stop();
      tailAnimation.stop();
      wiggleAnimation.stop();
    };
  }, [swimX, swimY, tailWag, bodyWiggle]);

  const tailRotation = tailWag.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-15deg", "15deg"],
  });

  const bodyRotation = bodyWiggle.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-3deg", "3deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: swimX },
          { translateY: swimY },
          { rotate: bodyRotation },
        ],
        width: size,
        height: size * 0.6,
      }}
    >
      {/* Glow effect */}
      <View
        style={{
          position: "absolute",
          width: size * 0.8,
          height: size * 0.5,
          left: size * 0.1,
          top: size * 0.05,
          backgroundColor: scheme.glow,
          borderRadius: size,
          opacity: 0.6,
        }}
      />

      <Svg width={size} height={size * 0.6} viewBox="0 0 100 60">
        <Defs>
          <RadialGradient id="bodyGradient" cx="50%" cy="30%" r="70%">
            <Stop offset="0%" stopColor={scheme.bodyGradient} />
            <Stop offset="100%" stopColor={scheme.body} />
          </RadialGradient>
        </Defs>

        {/* Tail fin - animated separately */}
        <AnimatedG
          style={{
            transform: [{ rotate: tailRotation }],
            transformOrigin: "75 30",
          }}
        >
          <Path
            d="M75 30 Q95 15 90 30 Q95 45 75 30"
            fill={scheme.fin}
            opacity={0.9}
          />
        </AnimatedG>

        {/* Main body */}
        <Ellipse cx="45" cy="30" rx="35" ry="20" fill="url(#bodyGradient)" />

        {/* Belly highlight */}
        <Ellipse cx="40" cy="35" rx="20" ry="8" fill={scheme.belly} opacity={0.5} />

        {/* Pattern spots */}
        <Circle cx="35" cy="25" r="8" fill={scheme.spots} opacity={0.8} />
        <Circle cx="55" cy="28" r="5" fill={scheme.spots} opacity={0.6} />
        <Circle cx="25" cy="32" r="4" fill={scheme.spots} opacity={0.4} />

        {/* Dorsal fin */}
        <Path
          d="M35 12 Q45 5 55 12 Q50 18 40 18 Z"
          fill={scheme.fin}
          opacity={0.85}
        />

        {/* Side fins */}
        <Ellipse cx="35" cy="42" rx="10" ry="5" fill={scheme.fin} opacity={0.7} />
        <Ellipse cx="50" cy="42" rx="8" ry="4" fill={scheme.fin} opacity={0.6} />

        {/* Eye */}
        <Circle cx="20" cy="28" r="5" fill="#ffffff" />
        <Circle cx="19" cy="28" r="3" fill={scheme.eye} />
        <Circle cx="18" cy="27" r="1" fill="#ffffff" />

        {/* Mouth */}
        <Path d="M10 32 Q12 34 10 36" stroke={scheme.body} strokeWidth="1.5" fill="none" />

        {/* Whiskers (barbels) */}
        <Path d="M12 34 Q8 36 5 34" stroke={scheme.body} strokeWidth="1" fill="none" opacity={0.6} />
        <Path d="M12 35 Q8 38 5 37" stroke={scheme.body} strokeWidth="1" fill="none" opacity={0.6} />
      </Svg>
    </Animated.View>
  );
}
