import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import React from "react";
import { BlurButton } from "../components";
import EStyleSheet from "react-native-extended-stylesheet";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../context/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const Feed = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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
    <ImageBackground
      source={require("../assets/images/LoginBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.user}>
          <Text style={styles.username}>
            {user == null ? "" : user.username}
          </Text>
          <Text style={styles.email}>{user == null ? "" : user.email}</Text>
        </View>
        <View style={styles.logoutBtn}>
          <BlurButton
            onPress={() => {
              dispatch(logoutUser());
              navigation.navigate("Landing");
            }}
            title="Logout"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Feed;

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 430 });

const styles = EStyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  user: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  username: {
    color: "#fff",
    fontSize: "27rem",
    fontFamily: "Inter_600SemiBold",
  },
  email: {
    color: "#fff",
    fontSize: "28rem",
    fontFamily: "Inter_600SemiBold",
  },
  logoutBtn: {
    width: "100%",
  },
});
