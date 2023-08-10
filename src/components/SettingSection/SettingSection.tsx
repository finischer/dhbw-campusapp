import { View, StyleSheet } from 'react-native'
import React from 'react'
import { SettingSectionProps } from './settingSection.types'
import { settingSectionStyles } from './settingSection.styles'
import RegularText from '../RegularText'
import { SPACING } from '../../constants/layout'

const SettingSection: React.FC<SettingSectionProps> = ({ title, children, contentGap = false }) => {

    const localSettingSectionStyle = StyleSheet.create({
        contentView: {
            marginTop: contentGap ? SPACING.m : 0
        }
    })

    return (
        <View style={settingSectionStyles.sectionView}>
            {/* Section title View */}
            <View style={settingSectionStyles.sectionTitleView}>
                <RegularText weight="500" style={settingSectionStyles.sectionTitleText}>{title}</RegularText>
            </View>

            {/* Row items */}
            <View style={localSettingSectionStyle.contentView}>
                {children}
            </View>
        </View>
    )
}

export default SettingSection