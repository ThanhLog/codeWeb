import { View, Text, Image, TouchableOpacity } from "react-native-web";
import React from "react";
import { useRouter } from "expo-router";

export default function OrderHeader() {
  const router = useRouter();

  const handleBackPress = () => {
    router.replace("(tabs)"); // Replace with a fallback screen if no history 
  };

  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: "#f6f6f6",
      }}
    >
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require("./../../assets/images/arrow.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: "95%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            สรุปข้อกำหนด
          </Text>
          <Text style={{ color: "#03D100", fontSize: 12, textAlign: "center" }}>
            <Image
              source={require("./../../assets/images/verified.png")}
              style={{ width: 12, height: 12 }}
            />{" "}
            ข้อมูลของคุณจะถูกเก็บไว้อย่างปลอดภัยและเข้ารหัส
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "#c8f7f5",
        }}
      >
        <Image
          source={require("./../../assets/images/fast-delivery.png")}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text>{" "}จัดส่งฟรีเมื่อสั่งซื้อนี้!</Text>
      </View>
    </View>
  );
}
