import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { WINDOW_WIDTH } from "../../constants/device/device";

const SnapCarousel = ({ data, renderItem }: any) => {
  const [scrollX, setScrollX] = useState(0);

  return (
    <Animated.View>
      <Animated.FlatList
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.8}
        snapToInterval={WINDOW_WIDTH * 0.8 + WINDOW_WIDTH * 0.02 * 1.5}
        data={data}
        renderItem={({ item, index }: { item: any; index: number }) =>
          renderItem({ item, index, scrollX })
        }
        horizontal
        keyExtractor={(_, index: number) => index.toString()}
        onScroll={(e) => setScrollX(e.nativeEvent.contentOffset.x)}
      />
    </Animated.View>
  );
};

export default SnapCarousel;
