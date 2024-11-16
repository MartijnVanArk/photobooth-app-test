import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SimpleIconButton from "../ui/SimpleIconButton";
import ThemeText from "../ui/themed/ThemeText";

export interface PageHeaderProps extends ViewProps {
  handleInset?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function PageHeader({
  handleInset = true,
  style,
  left,
  right,
  ...props
}: PageHeaderProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      className="bg-primary overflow-hidden flex flex-row justify- items-center"
      style={[
        {
          marginTop: handleInset ? insets.top : 0,
        },
        style,
      ]}
      {...props}
    >
      <View className="p-4  ">
        {left ? (
          left
        ) : (
          <SimpleIconButton
            icon={{ name: "arrow-left", color: "white" }}
            onPress={() => router.back()}
          />
        )}
      </View>
      <View className="flex-1 items-center">
        <ThemeText className="font-NunitoSemiBold text-2xl text-white">
          {t("screen-event-my-pictures")}
        </ThemeText>
      </View>
      <View className="w-16  items-center">{right ? right : null}</View>
    </Animated.View>
  );
}