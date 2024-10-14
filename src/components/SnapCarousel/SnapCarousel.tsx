import React, { useRef } from "react";
import { View, Animated, FlatList, Dimensions, StyleSheet } from "react-native";
import { useMetadata } from "../../hooks/useMetadata";
import { SPACING } from "../../constants/layout";

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const SnapCarousel = ({ data, renderItem, defaultIndex = 0 }: any) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { colors } = useMetadata();

  return (
    <View>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index: number) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        initialScrollIndex={defaultIndex}
        getItemLayout={(data, index) => ({
          length: WINDOW_WIDTH,
          offset: WINDOW_WIDTH * index,
          index,
        })}
      />
      <View style={styles.pagination}>
        {data.map((_: any, index: number) => {
          const inputRange = [(index - 1) * WINDOW_WIDTH, index * WINDOW_WIDTH, (index + 1) * WINDOW_WIDTH];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity, backgroundColor: colors.accent }]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: SPACING.m,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: SPACING.s,
  },
});

export default SnapCarousel;
