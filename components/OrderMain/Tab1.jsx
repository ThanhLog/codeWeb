import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native-web";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Tab1({ tab1 }) {
  const [storeName, setStoreName] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiCalled = useRef(false);

  useEffect(() => {
    initializeData();
  }, []); // Dependency array empty to run only once when component mounts

  const initializeData = async () => {
    const cacheSotre = await AsyncStorage.getItem("store");

    if (cacheSotre) {
      setStoreName(JSON.parse(cacheSotre));
    } else {
      GetStore();
    }
  };

  const GetStore = useCallback(async () => {
    if (apiCalled.current) return; // Prevent API call if already called
    apiCalled.current = true;

    try {
      const q = query(collection(db, "storeName"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setStoreName(data);
      await AsyncStorage.setItem("store", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching store data:", error);
    } finally {
      setLoading(false);
    }
  });
  const renderStoreItem = ({ item }) => (
    <View style={styles.storeItem}>
      <View style={styles.storeHeader}>
        <Image source={{ uri: item.imgUrl }} style={styles.storeImage} />
        <Text style={styles.storeName}>{item.name}</Text>
      </View>
    </View>
  );

  const renderTabItem = ({ item }) => {
    const origin = item.GiaGoc * 1;
    const sale = item.GiaGoc - item.GiaGoc * (item.Sale / 100);

    return (
      <View style={styles.tabItem}>
        <View style={styles.productInfo}>
          <Image
            source={{ uri: item.imgProduct }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.nameProduct}</Text>
            <View style={styles.productTags}>
              <View style={styles.tag}>
                <Image
                  source={require("./../../assets/images/shield.png")}
                  style={styles.tagIcon}
                />
                <Text style={styles.tagText}>ช้อปอย่างมั่นใจ</Text>
              </View>
              <View style={styles.tag}>
                <Image
                  source={require("./../../assets/images/Group 2.png")}
                  style={styles.tagIcon}
                />
                <Text style={styles.tagText}>ผลตอบแทนฟรี</Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.salePrice}>฿ {sale.toLocaleString()}</Text>
              <Text style={styles.originPrice}>
                ฿ {origin.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <FlatList
            data={storeName}
            renderItem={renderStoreItem}
            keyExtractor={(item) => item.id} // Use a unique identifier
          />
          <FlatList
            data={tab1}
            renderItem={renderTabItem}
            keyExtractor={(item) => item.id} // Use a unique identifier
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: 10,
    borderColor: "#f6f6f6",
    marginTop: 15,
  },
  storeItem: {
    marginBottom: 15,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  storeImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  storeName: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  tabItem: {
    marginTop: 20,
  },
  productInfo: {
    flexDirection: "row",
    height: 100,
    gap: 10,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    color: "#616161",
  },
  productTags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  tag: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  tagIcon: {
    width: 12,
    height: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#616161",
    fontWeight: "600",
  },
  priceContainer: {
    marginTop: 5,
  },
  salePrice: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "700",
  },
  originPrice: {
    fontSize: 14,
    color: "#616161",
    textDecorationLine: "line-through",
  },
});
