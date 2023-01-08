import React from "react";
import Icon from "../../../../../../components/Icon";
import { useMetadata } from "../../../../../../hooks/useMetadata";
import { IStatusIconProps } from "./statusIcon.types";

const StatusIcon: React.FC<IStatusIconProps> = ({ status, size }) => {
  const { colors } = useMetadata();

  if (status === "bestanden") {
    return (
      <Icon source="feather" name="check" color={colors.success} size={size} />
    );
  }

  return <Icon source="feather" name="x" color={colors.error} size={size} />;
};

export default StatusIcon;
