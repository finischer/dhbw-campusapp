import React, { useRef } from "react";
import Animated from "react-native-reanimated";
import { WINDOW_WIDTH } from "../../constants/device/device";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import useAsyncStorage from "../../hooks/useAsyncStorage";

const SnapCarousel = ({ data, renderItem, defaultIndex = 0 }: any) => {
  const { storeDataInAsyncStorage } = useAsyncStorage();
  const flatListRef = useRef<FlatList<any>>(null);
  const scrollOffsetRef = useRef(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffsetRef.current = e.nativeEvent.contentOffset.x;
  };

  const handleOnScrollEnd = () => {
    const index = Math.round(scrollOffsetRef.current / WINDOW_WIDTH);
    storeDataInAsyncStorage("restaurant-idx", index.toString());
  };

  return (
    <Animated.View>
      {/* <Animated.FlatList
        ref={flatListRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={true}
        decelerationRate="fast"
        snapToInterval={WINDOW_WIDTH}
        initialScrollIndex={defaultIndex}
        getItemLayout={(data, index) => ({ length: WINDOW_WIDTH, offset: WINDOW_WIDTH * index, index })}
        pagingEnabled
        data={data}
        renderItem={({ item, index }: { item: any; index: number }) => renderItem({ item, index, scrollX })}
        horizontal
        keyExtractor={(_, index: number) => index.toString()}
        onScroll={handleScroll}
        onScrollEndDrag={handleOnScrollEnd}
      /> */}
      <Animated.FlatList
        ref={flatListRef} // FlatList-Ref zuweisen
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={true}
        decelerationRate="fast"
        snapToInterval={WINDOW_WIDTH}
        initialScrollIndex={defaultIndex}
        getItemLayout={(data, index) => ({ length: WINDOW_WIDTH, offset: WINDOW_WIDTH * index, index })}
        pagingEnabled
        data={data}
        renderItem={({ item, index }: { item: any; index: number }) =>
          renderItem({ item, index, scrollX: scrollOffsetRef.current })
        }
        horizontal
        keyExtractor={(_, index: number) => index.toString()}
        onScroll={handleScroll} // handleScroll aktualisiert nur den Ref
        onMomentumScrollEnd={handleOnScrollEnd} // handleOnScrollEnd wird beim Ende des Scrollens aufgerufen
      />
    </Animated.View>
  );
};

export default SnapCarousel;
