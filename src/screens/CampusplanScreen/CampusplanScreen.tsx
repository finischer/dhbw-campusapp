import { Image } from "expo-image"
import React from 'react'
import { ScrollView, View } from "react-native"
import GlobalBody from '../../components/GlobalBody/GlobalBody'
import RegularText from '../../components/RegularText/RegularText'
import TouchableOpacity from '../../components/TouchableOpacity/TouchableOpacity'
import typography from '../../constants/typography/typography'
import { useMetadata } from '../../hooks/useMetadata'
import { campusplanScreenStyles } from './campusplanScreen.styles'
import { useTranslation } from "react-i18next"

const blurhash = "LJM@fjs.D%%M%Mt7IVof~pofbHM{"

const CampusplanScreen = () => {
    const { t } = useTranslation("common")
    const { colors } = useMetadata();

    const localStyles = {
        image: {
            backgroundColor: colors.primaryDarker
        }
    }

    return (
        <GlobalBody>
            <ScrollView>

                {/* Campusplan */}
                <Image
                    style={[campusplanScreenStyles.image, localStyles.image]}
                    placeholder={blurhash}
                    source={require("../../../assets/images/campus-plan-coblitzallee.png")}
                    contentFit="contain"
                    contentPosition="top center"
                />

                {/* General information about Campus */}
                <View style={campusplanScreenStyles.infoContainer}>
                    {/* Adress View */}
                    <View style={campusplanScreenStyles.infoSection}>
                        <RegularText weight='bold' size={typography.h2}>{t("adress")}</RegularText>
                        <TouchableOpacity>
                            <RegularText underline>Duale Hochschule Baden-Württemberg Mannheim</RegularText>
                            <RegularText underline>Coblitzallee 1-9</RegularText>
                            <RegularText underline>68163 Mannheim</RegularText>
                        </TouchableOpacity>
                    </View>

                    {/* Opening hours View */}
                    <View style={campusplanScreenStyles.infoSection}>
                        <RegularText weight='bold' size={typography.h2}>{t("openingHours")}</RegularText>
                        <View style={campusplanScreenStyles.openingHoursSection}>
                            <View>
                                <RegularText weight='bold'>Gebäudeteile A, B, und C</RegularText>
                                <RegularText size={typography.small}>Mo bis Fr: 06:30 Uhr – 20:00 Uhr</RegularText>
                            </View>
                            <View>
                                <RegularText weight='bold'>Gebäude D</RegularText>
                                <RegularText size={typography.small}>Mo bis Fr: 06:30 Uhr – 20:00 Uhr</RegularText>
                                <RegularText size={typography.small}>Sa: 08:00 Uhr – 17:00 Uhr (ggf. nach Vorlesungsplan)</RegularText>
                            </View>
                            <View>

                                <RegularText weight='bold'>Gebäude E</RegularText>
                                <RegularText size={typography.small}>Mo bis Fr: 06:30 Uhr – 20:00 Uhr</RegularText>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </GlobalBody>
    )
}

export default CampusplanScreen