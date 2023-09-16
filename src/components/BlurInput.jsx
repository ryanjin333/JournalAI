import { View, TextInput, Dimensions } from "react-native";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { BlurView } from "expo-blur";
import EStyleSheet from "react-native-extended-stylesheet";

const BlurInput = ({ name, placeholder, value, isPassword, handleChange }) => {
  // fonts
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <BlurView intensity={30}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#7C7C7C"
          placeholder={placeholder}
          secureTextEntry={isPassword ? true : false}
          onChangeText={(value) =>
            handleChange(value, name.charAt(0).toLowerCase() + name.slice(1))
          }
          value={value}
        />
      </BlurView>
    </View>
  );
};

export default BlurInput;

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 430 });

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  input: {
    height: 65,
    fontSize: "15rem",
    backgroundColor: "transparent",
    color: "#fff",
    paddingHorizontal: 20,
    fontFamily: "Inter_400Regular",
  },
});
