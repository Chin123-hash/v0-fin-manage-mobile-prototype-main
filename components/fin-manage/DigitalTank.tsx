import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KoiFish } from "./KoiFish";

interface BubbleProps {
  delay: number;
  left: number;
  size: number;
}

/**
 * Animated Bubble component for the aquarium background
 */
function Bubble({ delay, left, size }: BubbleProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -300, // Increased for full screen
            duration: 4000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.6,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 3500,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [delay, translateY, opacity]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: -20,
        left: `${left}%`,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "rgba(0, 245, 212, 0.3)",
        borderWidth: 1,
        borderColor: "rgba(0, 245, 212, 0.5)",
        transform: [{ translateY }],
        opacity,
      }}
    />
  );
}

interface DigitalTankProps {
  height?: number;
  showFullTank?: boolean;
// 1. Added koiColor property to synchronize with persona quiz results
  koiColor?: string;
  isFullScreen?: boolean; // New prop for full screen
  hideFish?: boolean;      // New prop to make it empty
  children?: React.ReactNode; // Allow overlays
}

/**
 * The Digital Sanctuary Tank component
 */
export function DigitalTank({ 
  height = 200, 
  showFullTank = false, 
  
  isFullScreen = false,
  hideFish = false,
  children
}: DigitalTankProps) {
  // Configurable bubble positions and delays

  const bubbles = [
    { delay: 0, left: 15, size: 6 },
    { delay: 800, left: 30, size: 8 },
    { delay: 1600, left: 50, size: 5 },
    { delay: 2400, left: 70, size: 7 },
    { delay: 3200, left: 85, size: 6 },
    { delay: 400, left: 25, size: 4 },
    { delay: 1200, left: 60, size: 5 },
    { delay: 2000, left: 40, size: 6 },
  ];

  const containerStyle: ViewStyle = isFullScreen
    ? { flex: 1 }
    : { height: showFullTank ? height * 2 : height };

  return (
    <View
      className="w-full overflow-hidden rounded-3xl"
      style={{ height: showFullTank ? height * 2 : height }}
    >
      <LinearGradient
        colors={["#0a2a3a", "#0d3347", "#1a4a5a", "#0d3347"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1, position: "relative" }}
      >
        {/* Light rays from top for atmosphere */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            width: "15%",
            height: "60%",
            backgroundColor: "rgba(0, 245, 212, 0.05)",
            transform: [{ skewX: "-15deg" }],
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: "10%",
            height: "50%",
            backgroundColor: "rgba(0, 245, 212, 0.03)",
            transform: [{ skewX: "10deg" }],
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: "70%",
            width: "12%",
            height: "55%",
            backgroundColor: "rgba(0, 245, 212, 0.04)",
            transform: [{ skewX: "-5deg" }],
          }}
        />

        {/* Bubbles */}
        {bubbles.map((bubble, index) => (
          <Bubble key={index} {...bubble} />
        ))}

        {/* Primary Koi Fish (Kira) - positioned in tank */}
        <View
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: [{ translateX: -40 }],
          }}
        >
          {/* 3. Passing the dynamic koiColor to the fish component */}
          <KoiFish size={80} color={koiColor as any} />
        </View>

        {/* Second Koi for full tank (Social view) */}
        {showFullTank && (
          <View
            style={{
              position: "absolute",
              top: "55%",
              left: "25%",
              transform: [{ translateX: -30 }, { scaleX: -1 }],
            }}
          >
            <KoiFish size={60} color="gold" />
          </View>
        )}

        {/* Decorative plants/seaweed at bottom */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end",
            paddingHorizontal: 16,
          }}
        >
          <View style={[styles.seaweed, { height: 35, transform: [{ rotate: "-5deg" }] }]} />
          <View style={[styles.seaweed, { height: 25, backgroundColor: "#00d4aa", opacity: 0.25, transform: [{ rotate: "8deg" }] }]} />
          <View style={[styles.seaweed, { height: 40, transform: [{ rotate: "-3deg" }] }]} />
          <View style={[styles.seaweed, { height: 30, backgroundColor: "#00d4aa", opacity: 0.28, transform: [{ rotate: "6deg" }] }]} />
          <View style={[styles.seaweed, { height: 38, transform: [{ rotate: "-7deg" }] }]} />
        </View>

        {/* Plants and Sandy Bottom */}
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", paddingHorizontal: 16 }}>
          {[35, 25, 40, 30, 38].map((h, i) => (
            <View key={i} style={{ width: 8, height: h, backgroundColor: "#00f5d4", opacity: 0.3, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
          ))}
        </View>
        <LinearGradient colors={["transparent", "rgba(45, 27, 78, 0.5)"]} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20 }} />
      </LinearGradient>
    </View>
  );
}

const styles = {
  seaweed: {
    width: 8,
    backgroundColor: "#00f5d4",
    opacity: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
};