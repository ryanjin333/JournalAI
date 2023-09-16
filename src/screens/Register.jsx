import {
  Pressable,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import EStyleSheet from "react-native-extended-stylesheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { BlurInput, BlurButton } from "../components";
import { registerUser, loginUser } from "../context/userSlice";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = ({ navigation }) => {
  const [values, setValues] = useState(initialState);
  const user = useSelector((state) => state.user.user);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = () => {
    const { username, email, password, isMember } = values;
    if (!email || !password || (!isMember && !username)) {
      // display alert
      return;
    }
    const currentUser = { username, email, password };

    try {
      if (isMember) {
        // login user
        dispatch(loginUser(currentUser));
      } else {
        // register user
        dispatch(registerUser(currentUser));
      }
    } catch (error) {
      console.error("The error");
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("Feed");
    }
  }, [user]);

  // redux
  const message = useSelector((state) => state.register);
  const dispatch = useDispatch();
  // fonts
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <ImageBackground
      source={
        values.isMember
          ? require("../assets/images/LoginBackground.png")
          : require("../assets/images/RegisterBackground.png")
      }
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {false && (
          <View style={styles.errorBtn}>
            <Text style={styles.errorBtnText}>Error Message</Text>
          </View>
        )}
        <Text style={styles.title}>
          {values.isMember ? "Log in" : "Sign up"}
        </Text>
        <View style={styles.form}>
          {!values.isMember && (
            <BlurInput
              name="Username"
              placeholder="Create a username"
              handleChange={handleChange}
              value={values.username}
            />
          )}
          <BlurInput
            name="Email"
            placeholder="Enter your email"
            handleChange={handleChange}
            value={values.email}
          />
          <BlurInput
            name="Password"
            placeholder={
              values.isMember
                ? "Enter your password"
                : "Create a password (Minimum 6 characters)"
            }
            isPassword={true}
            handleChange={handleChange}
            value={values.password}
          />
        </View>
        <BlurButton
          title={values.isMember ? "Log in" : "Create Account"}
          onPress={onSubmit}
        />
        <View style={styles.toggleMember}>
          <Text
            style={{
              color: "#D6D6D6",
              fontFamily: "Inter_400Regular",
              fontSize: 14,
            }}
          >
            {values.isMember ? "Not a member yet? " : "Already a member? "}
          </Text>
          <Pressable onPress={toggleMember}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Inter_700Bold",
                fontSize: 14,
              }}
            >
              {values.isMember ? "Register" : "Login"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 430 });

const styles = EStyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: "40rem",
    fontFamily: "Inter_600SemiBold",
    marginTop: 108,
    width: "100%",
  },
  form: {
    width: "100%",
    rowGap: 45,
    marginVertical: 45,
  },
  toggleMember: {
    marginTop: 25,
    flexDirection: "row",
  },
  errorBtn: {
    height: 65,
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    overflow: "hidden",
    marginTop: 45,
    paddingHorizontal: 20,
    backgroundColor: "#BE0000",
    position: "absolute",
  },
  errorBtnText: {
    color: "#fff",
    fontSize: "15rem",
    fontFamily: "Inter_500Medium",
  },
});
