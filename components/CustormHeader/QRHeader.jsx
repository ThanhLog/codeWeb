import { View, Text, Image, TouchableOpacity } from "react-native-web";
import React from "react";
import { useNavigation } from "expo-router";
export default function QRHeader() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{
          width: "5%",
        }}
        onPress={() => navigation.navigate("order")}
      >
        <Image
          source={require("./../../assets/images/arrow (1).png")}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          width: "95%",
        }}
      >
        ข้อมูลการชำระเงิน
      </Text>
    </View>
  );
}
