import { Text, View } from 'react-native'
import React from 'react'
import Modal from '../../components/Modal/Modal'
import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamList } from '../../infrastructure/navigation/Navigation/navigation.types';
import RegularText from '../../components/RegularText/RegularText';
import { lectureInformationStyles } from './lectureInformationScreen.styles';

const LectureInformationScreen = () => {
    const { params: changes } = useRoute<RouteProp<ParamList, "LectureDetails">>();
    return (
        <Modal title='Vorlesungsänderungen'>
            <View style={lectureInformationStyles.container}>
                {/* Before View */}
                <View>
                    <RegularText weight='bold'>Vorher:</RegularText>
                    <RegularText>Vorlesung: {changes.oldLecture?.lecture}</RegularText>
                    <RegularText>Startzeit: {changes.oldLecture?.startTime} {changes.oldLecture?.startDate.toString()}</RegularText>
                    <RegularText>Endzeit: {changes.oldLecture?.endTime} {changes.oldLecture?.endDate.toString()}</RegularText>
                </View>

                {/* After View */}
                <View>
                    <RegularText weight='bold'>Aktuell:</RegularText>
                    <RegularText>Vorlesung: {changes.newLecture?.lecture}</RegularText>
                    <RegularText>Startzeit: {changes.newLecture?.startTime} {changes.newLecture?.startDate.toString()}</RegularText>
                    <RegularText>Endzeit: {changes.newLecture?.endTime} {changes.newLecture?.endDate.toString()}</RegularText>
                </View>
            </View>
        </Modal>
    )
}

export default LectureInformationScreen

