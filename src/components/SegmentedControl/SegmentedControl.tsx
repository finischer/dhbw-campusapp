import React from 'react'
import { ISegmentedControlProps } from './segmentedControl.types'
import { SIZES } from '../../constants/layout'
import { useMetadata } from '../../hooks/useMetadata'
import RNSegmentedControl from '@react-native-segmented-control/segmented-control/js/SegmentedControl.js';


const SegmentedControl: React.FC<ISegmentedControlProps> = ({ values = [], onChange, selectedIndex }) => {
    const { colors } = useMetadata();

    return (
        <RNSegmentedControl
            style={{
                width: "100%",
                height: 35,
                borderRadius: SIZES.borderRadius,
            }}
            tabStyle={{
                borderRadius: SIZES.borderRadius,
            }}
            values={values}
            selectedIndex={selectedIndex}
            backgroundColor={colors.primaryDarker}
            tintColor={colors.accent}
            fontStyle={{
                color: colors.secondary
            }}
            activeFontStyle={{
                color: colors.lightText
            }}
            onChange={onChange}
        />
    )
}

export default SegmentedControl