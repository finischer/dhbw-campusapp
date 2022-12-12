import { Feather } from "@expo/vector-icons";
import React from "react";
import FeatherIcon from "../../../../../../components/FeatherIcon";
import { useMetadata } from "../../../../../../hooks/useMetadata";
import { IStatusIconProps } from "./statusIcon.types";

const StatusIcon: React.FC<IStatusIconProps> = ({ status, size }) => {
  const { colors } = useMetadata();

  if (status === "bestanden") {
    return <Feather name="check" color={colors.success} size={size} />;
  }

  return <Feather name="x" color={colors.error} size={size} />;
};

export default StatusIcon;
