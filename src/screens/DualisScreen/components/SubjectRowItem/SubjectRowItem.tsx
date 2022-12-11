import { StyleSheet, View } from "react-native";
import React from "react";
import { ISubjectTypes } from "../../../../api/html_scraper/dualis/types/ISubjectTypes";
import RegularText from "../../../../components/RegularText";
import TouchableOpacity from "../../../../components/TouchableOpacity";
import { useMetadata } from "../../../../hooks/useMetadata";
import { subjectRowStyles } from "./subjectRowItem.styles";

const SubjectRowItem = ({ subject }: { subject: ISubjectTypes }) => {
  const { colors } = useMetadata();

  const localSubjectRowItemStyles = StyleSheet.create({
    container: {},
    text: {},
  });

  return (
    <TouchableOpacity activeOpacity={0.3}>
      <View
        style={[
          subjectRowStyles.container,
          localSubjectRowItemStyles.container,
        ]}
      >
        <RegularText style={localSubjectRowItemStyles.text}>
          {subject.subjectName} - {subject.subjectGrade}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default SubjectRowItem;
