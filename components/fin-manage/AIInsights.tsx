import React from "react";
import { View, Text } from "react-native";
import Svg, { Path, Circle, Line, Text as SvgText, G } from "react-native-svg";
import { Sparkles, TrendingDown } from "lucide-react-native";
import { spendingData, aiInsights, formatRM } from "@/lib/mock-data";
import { colors } from "@/lib/constants";

export function AIInsights() {
  // Chart dimensions
  const chartWidth = 300;
  const chartHeight = 120;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Calculate scales
  const maxValue = Math.max(
    ...spendingData.map((d) => Math.max(d.actual, d.predicted))
  );
  const minValue = Math.min(
    ...spendingData.map((d) => Math.min(d.actual, d.predicted))
  );
  const valueRange = maxValue - minValue;

  // Generate path for line chart
  const generatePath = (data: number[], color: string) => {
    const points = data.map((value, index) => {
      const x = padding.left + (index / (data.length - 1)) * graphWidth;
      const y =
        padding.top +
        graphHeight -
        ((value - minValue) / valueRange) * graphHeight;
      return { x, y };
    });

    const pathD = points.reduce((path, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      return `${path} L ${point.x} ${point.y}`;
    }, "");

    return { pathD, points, color };
  };

  const actualPath = generatePath(
    spendingData.map((d) => d.actual),
    colors.accent.pink
  );
  const predictedPath = generatePath(
    spendingData.map((d) => d.predicted),
    colors.accent.teal
  );

  return (
    <View className="bg-background-card rounded-2xl p-4 mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 rounded-full bg-accent-purple/20 items-center justify-center mr-3">
            <Sparkles size={20} color={colors.accent.purple} />
          </View>
          <View>
            <Text className="text-foreground font-bold text-base">AI Spending Insights</Text>
            <Text className="text-foreground-muted text-sm">
              Powered by machine learning
            </Text>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View className="items-center mb-4">
        <Svg width={chartWidth} height={chartHeight}>
          {/* Grid lines */}
          <G opacity={0.3}>
            {[0, 0.5, 1].map((ratio, i) => (
              <Line
                key={i}
                x1={padding.left}
                y1={padding.top + graphHeight * ratio}
                x2={chartWidth - padding.right}
                y2={padding.top + graphHeight * ratio}
                stroke={colors.text.muted}
                strokeWidth={0.5}
                strokeDasharray="4,4"
              />
            ))}
          </G>

          {/* Predicted line (dashed) */}
          <Path
            d={predictedPath.pathD}
            stroke={predictedPath.color}
            strokeWidth={2}
            fill="none"
            strokeDasharray="6,4"
          />

          {/* Actual line (solid) */}
          <Path
            d={actualPath.pathD}
            stroke={actualPath.color}
            strokeWidth={2.5}
            fill="none"
          />

          {/* Data points for actual */}
          {actualPath.points.map((point, index) => (
            <Circle
              key={`actual-${index}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={actualPath.color}
            />
          ))}

          {/* Month labels */}
          {spendingData.map((d, index) => (
            <SvgText
              key={d.month}
              x={padding.left + (index / (spendingData.length - 1)) * graphWidth}
              y={chartHeight - 5}
              fontSize={10}
              fill={colors.text.muted}
              textAnchor="middle"
            >
              {d.month}
            </SvgText>
          ))}
        </Svg>
      </View>

      {/* Legend */}
      <View className="flex-row justify-center gap-6 mb-4">
        <View className="flex-row items-center">
          <View 
            className="w-4 h-1 rounded mr-2" 
            style={{ backgroundColor: colors.accent.pink }} 
          />
          <Text className="text-foreground-muted text-xs">Actual Spending</Text>
        </View>
        <View className="flex-row items-center">
          <View
            className="w-4 h-1 rounded mr-2"
            style={{
              backgroundColor: colors.accent.teal,
              borderStyle: "dashed",
            }}
          />
          <Text className="text-foreground-muted text-xs">AI Predicted</Text>
        </View>
      </View>

      {/* AI Insight Card */}
      <View className="bg-background-secondary rounded-xl p-3">
        <View className="flex-row items-center mb-2">
          <TrendingDown size={16} color={colors.accent.teal} />
          <Text className="text-accent font-semibold ml-2 text-sm">
            Spending Trend: Decreasing
          </Text>
        </View>
        <Text className="text-foreground text-sm mb-2">
          {aiInsights.suggestion}
        </Text>
        <Text className="text-accent font-bold">
          Potential savings: {formatRM(aiInsights.predictedSavings)}/month
        </Text>
      </View>
    </View>
  );
}