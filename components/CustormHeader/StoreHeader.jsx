import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native-web";
import React from "react";
import { useFonts } from "expo-font";

export default function StoreHeader({
  onScrollToDescribe,
  onScrollToEvaluate,
  activeTab,
}) {
  useFonts({
    "Roboto-Regular": require("./../../assets/fonts/Roboto-Regular.ttf"),
  });

  return (
    <View>
      <View style={styles.headerContainer}>
        {/* Search Box */}
        <View style={styles.searchBox}>
          <Image
            source={require("./../../assets/images/searchIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.searchText}>Ip.Iphone XS MAX...</Text>
        </View>

        {/* Share Box */}
        <View style={styles.iconBox}>
          <Image
            source={require("./../../assets/images/shareIcon.png")}
            style={styles.icon}
          />
        </View>

        {/* Cart Box */}
        <View style={styles.iconBox}>
          <Image
            source={require("./../../assets/images/cartIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.cartBadge}>12</Text>
        </View>

        {/* Option Box */}
        <View style={styles.iconBox}>
          <Image
            source={require("./../../assets/images/option.png")}
            style={styles.icon}
          />
        </View>
      </View>

      {/* Menu Product Detail */}
      <View style={styles.menuContainer}>
        {/* Button Tổng quan */}
        <TouchableOpacity>
          <Text
            style={[
              styles.tabText,
              activeTab === "overview" && styles.activeTab,
            ]}
          >
            ภาพรวม
          </Text>
          {activeTab === "overview" && <View style={styles.activeLine} />}
        </TouchableOpacity>

        {/* Button Đánh giá */}
        <TouchableOpacity onPress={onScrollToEvaluate}>
          <Text
            style={[
              styles.tabText,
              activeTab === "evaluate" && styles.activeTab,
            ]}
          >
            ประเมิน{" "}
          </Text>
          {activeTab === "evaluate" && <View style={styles.activeLine} />}
        </TouchableOpacity>

        {/* Button Mô tả */}
        <TouchableOpacity onPress={onScrollToDescribe}>
          <Text
            style={[
              styles.tabText,
              activeTab === "describe" && styles.activeTab,
            ]}
          >
            อธิบาย{" "}
          </Text>
          {activeTab === "describe" && <View style={styles.activeLine} />}
        </TouchableOpacity>

        {/* Button Đề xuất */}
        <TouchableOpacity>
          <Text
            style={[
              styles.tabText,
              activeTab === "suggest" && styles.activeTab,
            ]}
          >
            เสนอ{" "}
          </Text>
          {activeTab === "suggest" && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    gap: 3,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F1F1F3",
    width: "78%",
  },
  icon: {
    width: 25,
    height: 25,
  },
  searchText: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  iconBox: {
    width: "8%",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F13F57",
    color: "#fff",
    fontWeight: "500",
    fontSize: 10,
    paddingHorizontal: 4,
    borderRadius: 20,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#F1F1F3",
  },
  tabText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Roboto-Regular",
  },
  activeTab: {
    color: "#111", // Active tab color
  },
  activeLine: {
    position: "absolute",
    bottom: -1,
    width: "100%",
    height: 2,
    backgroundColor: "#111", // Active line color
  },
});
