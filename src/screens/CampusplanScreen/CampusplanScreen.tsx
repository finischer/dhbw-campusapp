import React from 'react'
import { View } from "react-native"
import GlobalBody from '../../components/GlobalBody/GlobalBody'
import RegularText from '../../components/RegularText/RegularText'
import { Image } from 'expo-image'
import { campusplanScreenStyles } from './campusplanScreen.styles'
import { useMetadata } from '../../hooks/useMetadata'

const CampusplanScreen = () => {
    const { colors } = useMetadata();

    const localStyles = {
        image: {
            backgroundColor: colors.primaryDarker
        }
    }

    return (
        <GlobalBody>
            <Image
                style={[campusplanScreenStyles.image, localStyles.image]}
                source={require("../../../assets/images/campus-plan-coblitzallee.png")}
                contentFit="contain"
                contentPosition="top center"
                transition={1000}
            />
            <View style={campusplanScreenStyles.infoContainer}>
                <RegularText>Das ist der Campusplan für die DHBW Mannheim</RegularText>
            </View>
        </GlobalBody>
    )
}

export default CampusplanScreen