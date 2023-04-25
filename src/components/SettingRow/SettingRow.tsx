import React from 'react'
import { View, StyleSheet } from 'react-native'
import RegularText from '../RegularText'
import Switch from '../Switch/Switch'
import typography from '../../constants/typography'
import { useMetadata } from '../../hooks/useMetadata'
import { settingRowStyles } from './settingRow.styles'
import { SwitchRowSettingProps } from './settingRow.types'

const SettingRow: React.FC<SwitchRowSettingProps> = ({ title, onChangeSwitch, switchValue, subtitle, disabled = false }) => {
    const { colors } = useMetadata();

    const localSettingRowStyles = StyleSheet.create({
        settingRowView: {
            backgroundColor: colors.primaryDarker,
            opacity: disabled ? 0.5 : 1
        }
    });

    return (
        <View style={[settingRowStyles.settingRowView, localSettingRowStyles.settingRowView]}>
            {/* Description View */}
            <View style={settingRowStyles.settingRowLeftView}>
                <RegularText style={settingRowStyles.settingRowTextTitle} weight='600'>{title}</RegularText>
                <RegularText style={{
                    ...settingRowStyles.settingRowTextSubtitle,
                    color: colors.secondaryDarker
                }} size={typography.small}>{subtitle}</RegularText>
            </View>

            {/* Switch View */}
            <View style={settingRowStyles.settingRowRightView}>
                <Switch onChange={onChangeSwitch} value={switchValue} disabled={disabled} />
            </View>
        </View>
    )
}

export default SettingRow