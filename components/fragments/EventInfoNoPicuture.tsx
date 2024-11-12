import { Image } from "expo-image";
import { Text, View } from "react-native";

import { images } from "@/constants/images";
import useEventAuthContext from "@/hooks/useEventAuthContext";

const EventInfoNoPicture = () => {
  const { EventState } = useEventAuthContext();

  return (
    <View className="flex-1 w-full items-center justify-center">
      <Text className="text-3xl font-Nunito text-center text-white">
        {EventState.EventInfo?.WelcomeTitle}
      </Text>
      <Image
        style={{
          aspectRatio: "1/1",
          width: "60%",
          height: undefined,
          margin: 20,
          borderRadius: 5000,
        }}
        source={images.welcomedefault}
        contentFit="cover"
      />
      <Text className="font-NunitoLight text-center text-white text-xl">
        {EventState.EventInfo?.WelcomeMessage}
      </Text>
    </View>
  );
};

export default EventInfoNoPicture;