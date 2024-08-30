import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

export default function TabLayout() {
  const navigation = useNavigation(); // Use the navigation hook here

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          paddingHorizontal: 10,
          paddingVertical: 5,
          height: 60,
          alignItems: "center",
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={[props.style, styles.storeTab]}>
              <Image
                source={require("./../../assets/images/storeIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>ร้านค้า</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="messenger"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={[props.style, styles.messengerTab]}
              disabled={true} // Vô hiệu hóa tab này
            >
              <Image
                source={require("./../../assets/images/messengerIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.iconText}>ข้อความ</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={[props.style, styles.cartTab]}
              disabled={true} // Vô hiệu hóa tab này
            >
              <Text style={styles.cartButtonText}>เพิ่มลงในรถเข็น</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={[props.style, styles.orderTab]}
              onPress={() => navigation.navigate("order")}
            >
              <Text style={styles.orderButtonText}>ซื้อ</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
  iconText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  storeTab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    maxWidth: "15%",
    maxHeight: "80%",
  },
  messengerTab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 5,
    maxHeight: "80%",
    maxWidth: "10%",
  },
  cartTab: {
    borderColor: "#FF0958",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 3,
    justifyContent: "center",
    flex: 2,
    maxWidth: "35%",
    marginLeft: 10,
    maxHeight: "80%",
  },
  cartButtonText: {
    fontSize: 14,
    color: "#FF0958",
    fontWeight: "bold",
    textAlign: "center",
  },
  orderTab: {
    backgroundColor: "#FF0958",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 3,
    justifyContent: "center",
    flex: 2,
    maxWidth: "35%",
    marginLeft: 10,
    maxHeight: "80%",
  },
  orderButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
