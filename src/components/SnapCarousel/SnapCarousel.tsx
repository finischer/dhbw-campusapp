import React, { useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import { WINDOW_WIDTH } from "../../constants/device/device";
import { GLOBAL_PADDING_HORIZONTAL } from "../../constants/layout";

const SnapCarousel = ({ data, renderItem }: any) => {
  const [scrollX, setScrollX] = useState(0);

  return (
    <Animated.View>
      <Animated.FlatList
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={WINDOW_WIDTH}
        pagingEnabled
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
