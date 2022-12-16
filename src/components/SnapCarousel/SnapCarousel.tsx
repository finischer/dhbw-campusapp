import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../constants/device/device";

const SnapCarousel = ({ data, renderItem }: any) => {
  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      vertical={false}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT}
      snapEnabled
      pagingEnabled
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
    />
  );
};

export default SnapCarousel;
