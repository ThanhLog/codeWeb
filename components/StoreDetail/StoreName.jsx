import { View, Text, Image, StyleSheet } from "react-native-web";
import React, { useCallback, useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FriseBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StoreName() {
  const [storeName, setStoreName] = useState([]);

  useEffect(() => {
    initializeDataStore();
  }, []);

  const initializeDataStore = async () => {
    const cachedStore = await AsyncStorage.getItem("store");

    if (cachedStore) {
      setStoreName(JSON.parse(cachedStore));
    } else {
      getStore();
    }
  };
  const getStore = useCallback(async () => {
    const q = query(collection(db, "StoreName"));
    const query = await getDocs(q);

    const data = [];
    query.forEach((doc) => {
      data.push(doc.data());
    });

    setStoreName(data);
    await AsyncStorage.setItem("store", JSON.stringify(data));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {storeName.map((item, index) => (
          <View key={index} style={styles.storeItem}>
            <Image
              source={{ uri: item.imgUrl }}
              style={styles.image}
              onError={(error) =>
                console.log("Error loading image:", error.nativeEvent.error)
              }
            />
            <View style={styles.textContainer}>
              <Text style={styles.storeName}>{item.name}</Text>
              <View style={styles.rating}>
                <Entypo
                  name="star"
                  size={18}
                  color="#43b07c"
                  style={styles.star}
                />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
          </View>
        ))}
        <Text style={styles.accessButton}>เข้าถึง</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>25</Text>
          <Text style={styles.statsLabel}>รายการ</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>1.1k</Text>
          <Text style={styles.statsLabel}>ขายแล้ว</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>
            95% <Text style={styles.highRating}>High</Text>
          </Text>
          <Text style={styles.statsLabel}>อัตราการตอบกลับตลอด 24 ชั่วโมง</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>93%</Text>
          <Text style={styles.statsLabel}>จัดส่งภายใน 48 ชั่วโมง</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storeItem: {
    flexDirection: "row",
    gap: 5,
  },
  image: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flexDirection: "column",
  },
  storeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    borderWidth: 1,
    borderColor: "#43b07c",
    marginTop: 5,
    alignSelf: "flex-start",
    borderRadius: 3,
    backgroundColor: "#b8f0d5",
  },
  star: {
    marginRight: 3,
  },
  ratingText: {
    fontWeight: "bold",
  },
  accessButton: {
    borderWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  statsContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsItem: {
    flexDirection: "column",
    borderRightWidth: 1,
    borderRightColor: "#dddddd",
    paddingRight: 10,
    marginRight: 10,
  },
  statsNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
  statsLabel: {
    color: "#616161",
    fontSize: 12,
  },
  highRating: {
    color: "#ff0985",
    fontSize: 8,
    backgroundColor: "#FCE8E3",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
