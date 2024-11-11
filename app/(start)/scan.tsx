import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Dimensions, ActivityIndicator, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Torch from "react-native-torch";

import { CCActionTypes } from "@/actions/CommandCenterActions";
import CameraPermissionScreen from "@/components/CameraPermissionScreen";
import QRTargetOverlay from "@/components/ui/QRTargetOverlay";
import SimpleIconButton from "@/components/ui/SimpleIconButton";
import ThemeButton from "@/components/ui/ThemeButton";
import useCommandCenter from "@/hooks/useCommandCenter";
import usePartyAuthContext from "@/hooks/usePartyAuthContext";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default function ScanScreen() {
  const [facing] = useState<CameraType>("back");

  const [gotBarcode, setGotBarcode] = useState(false);

  const [torch, setTorch] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const { partyState } = usePartyAuthContext();

  const CC = useCommandCenter();

  useEffect(() => {
    if (gotBarcode && !partyState.isTryingToJoin) {
      if (partyState.isValidPartyId) {
        router.replace("/(root)/");
      } else {
        Alert.alert(
          "Invalid event code",
          "This is not a valid event code, please try again",
        );
      }

      setGotBarcode(false);
    }
  }, [partyState, gotBarcode]);

  const insets = useSafeAreaInsets();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermissionScreen requestPermission={requestPermission} />;
  }

  const toggleTorch = () => {
    const newTorch = !torch;

    const setTorchState = async () => {
      try {
        await Torch.switchState(newTorch);
        setTorch(newTorch);
      } catch {
        Alert.alert("Error with torch");
      }
    };

    setTorchState();
  };

  const fakeCode = async () => {
    if (partyState.isTryingToJoin) return;

    const fake: BarcodeScanningResult = {
      type: "qr",
      data: "P1234567890",
      raw: "P1234567890",
      bounds: {
        origin: { x: 0, y: 0 },
        size: { width: 10, height: 10 },
      },
      cornerPoints: [],
    };

    scannedBarcode(fake);
  };

  const back = () => {
    router.back();
  };

  const scannedBarcode = (scanningResult: BarcodeScanningResult) => {
    if (partyState.isTryingToJoin) return;

    console.log(scanningResult);

    //    if (scanningResult.type === "qr") {
    setGotBarcode(true);

    CC.perform({
      type: CCActionTypes.TRY_JOIN_PARTY,
      payload: {
        partyId: scanningResult.data,
      },
    });
    //  }
  };

  return (
    <View className="flex-1 h-screen bg-black">
      <CameraView
        ref={cameraRef}
        style={{ width: winWidth, height: winHeight, zIndex: 0, elevation: 0 }}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scannedBarcode}
        className="flex-1 h-screen relative"
        facing={facing}
      >
        <QRTargetOverlay
          animated={!partyState.isTryingToJoin}
        ></QRTargetOverlay>

        <View
          className="flex flex-row justify-between p-8"
          style={{ marginTop: insets.top, zIndex: 2, elevation: 2 }}
        >
          <SimpleIconButton
            backGround="p-2 bg-[#ffffff22]"
            icon={{ name: "close", color: "white" }}
            onPress={back}
          />

          <SimpleIconButton
            icon={{
              name: torch ? "flashlight-off" : "flashlight",
              color: "white",
            }}
            backGround="p-2 bg-[#ffffff22]"
            onPress={toggleTorch}
          />
        </View>

        {partyState.isTryingToJoin && (
          <ActivityIndicator
            size="large"
            className="absolute mx-auto my-auto"
            style={{
              top: winHeight / 2,
              left: winWidth / 2,
              transform: [{ translateX: -15 }, { translateY: -15 }],
            }}
          />
        )}

        <View
          style={{ marginBottom: insets.bottom }}
          className="p-8 flex-1 h-full justify-end"
        >
          <ThemeButton
            style={{ zIndex: 2, elevation: 2 }}
            title="Debug with Fake Test Code"
            onPress={fakeCode}
            className="mb-4"
          ></ThemeButton>
        </View>
      </CameraView>
    </View>
  );
}
