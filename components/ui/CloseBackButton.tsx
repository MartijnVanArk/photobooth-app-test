import { router } from "expo-router";
import React from "react";
import { PixelRatio } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SimpleIconButton, { SimpleIconButtonProps } from "./SimpleIconButton";

export interface CloseBackButtonProps extends SimpleIconButtonProps {
  color?: string;
  background?: string;
  iconName?: string;
  noAbsolute?: boolean;
}

const CloseBackButton = ({
  color = "white",
  backGround = "#00000066",
  iconName = "close",
  noAbsolute = false,
  ...props
}) => {
  const inset = useSafeAreaInsets();
  const ratio = PixelRatio.get();

  return (
    <SimpleIconButton
      style={{
        backgroundColor: backGround,
        position: noAbsolute ? "relative" : "absolute",
        top: noAbsolute ? undefined : inset.top + 8 * ratio,
        left: noAbsolute ? undefined : inset.left + 8 * ratio,
      }}
      onPress={() => router.back()}
      className="p-2"
      icon={{ name: iconName, color: color }}
    />
  );
};

export default CloseBackButton;
