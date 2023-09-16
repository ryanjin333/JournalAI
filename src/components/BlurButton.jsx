import EStyleSheet from "react-native-extended-stylesheet";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

import { Text, Dimensions, Pressable } from "react-native";
import React from "react";

const BlurButton = ({ onPress, title }) => {
  const btnTapped = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  // fonts
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Pressable style={styles.btn} onPress={btnTapped}>
      <BlurView intensity={30} style={styles.btnBlur}>
        <Text style={styles.btnText}>{title}</Text>
      </BlurView>
    </Pressable>
  );
};

export default BlurButton;

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 430 });

const styles = EStyleSheet.create({
  btn: {
    height: 65,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnBlur: {
    height: 65,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: "18rem",
    fontFamily: "Inter_500Medium",
  },
});
