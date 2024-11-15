import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

import useTheme from "@/hooks/useTheme";
import { ButtonIconProps } from "@/types/type";

import ThemeText from "../ui/ThemeText";

export interface PopupMenuItemProps {
  title: string;
  icon?: ButtonIconProps;
  onPress?: () => void;
  closeModal?: () => void;
  index?: number;
  total?: number;
}

const PopupMenuItem = ({
  title,
  icon,
  onPress,
  closeModal,
  index = 0,
  total = 0,
}: PopupMenuItemProps) => {
  const click = () => {
    if (onPress) onPress();
    if (closeModal) closeModal();
  };

  const { getVarColor } = useTheme();

  const ic = useMemo(() => {
    return icon && icon.color ? icon.color : getVarColor("--color-text-med");
  }, [getVarColor, icon]);

  const positionStyles = useMemo<StyleProp<ViewStyle>>(() => {
    const isLast = index === total - 1;

    return {
      borderBottomColor: !isLast
        ? getVarColor("--color-light-med")
        : "transparent",
      borderBottomWidth: isLast ? 0 : 1,
    };
  }, [getVarColor, index, total]);

  return (
    <TouchableOpacity onPress={click}>
      <View
        style={positionStyles}
        className="flex px-4 py-3 flex-row items-center"
      >
        {icon && icon.name && (
          <MaterialCommunityIcons
            // @ts-expect-error dynamic name for type
            name={icon.name}
            size={icon.size ?? 24}
            className={`${icon.classes}`}
            color={ic}
          />
        )}
        <ThemeText className="flex px-2 text-textmedium">{title}</ThemeText>
      </View>
    </TouchableOpacity>
  );
};

export default PopupMenuItem;
