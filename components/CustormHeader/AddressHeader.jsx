import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native-web";
import React from "react";
import { useRouter } from "expo-router";

export default function AddressHeader() {
  const router = useRouter();

  const handleBackPress = () => {
      router.replace("/order"); // Replace with a fallback screen if no history
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 2,
          borderBottomColor: "#f6f6f6",
        }}
      >
        <TouchableOpacity
          style={{
            width: "5%",
          }}
          onPress={handleBackPress}
        >
          <Image
            source={require("./../../assets/images/arrow.png")}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            width: "95%",
            fontWeight: "bold",
          }}
        >
          เพิ่มที่อยู่ใหม่
        </Text>
      </View>
    </View>
  );
}
