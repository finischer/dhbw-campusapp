import { View, Text } from 'react-native'
import React from 'react'
import { SettingSectionProps } from './settingSection.types'
import { settingSectionStyles } from './settingSection.styles'
import RegularText from '../RegularText'

const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
    return (
        <View style={settingSectionStyles.sectionView}>
            {/* Section title View */}
            <View style={settingSectionStyles.sectionTitleView}>
                <RegularText weight="500" style={settingSectionStyles.sectionTitleText}>{title}</RegularText>
            </View>

            {/* Row items */}
            {children}
        </View>
    )
}

export default SettingSection