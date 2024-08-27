import { View, Text, FlatList, StyleSheet } from "react-native-web";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RenderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.parameterText}>{item.parameter}:</Text>
    <Text style={styles.detailText}>{item.detail}</Text>
  </View>
);

export default function Introduce() {
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    initializeDataIntroduct(); // Gọi API một lần khi component mount
  }, []); // Dependency array rỗng, chỉ gọi một lần

  const initializeDataIntroduct = async () => {
    const cachedParameter = await AsyncStorage.getItem("parameter");

    if (cachedParameter) {
      setParameters(JSON.parse(cachedParameter));
    } else {
      getParameterList();
    }
  };
  const getParameterList = useCallback(async () => {
    try {
      const q = query(collection(db, "Specifications"));
      const querySnapshot = await getDocs(q);

      const parameterList = [];
      querySnapshot.forEach((doc) => {
        parameterList.push(doc.data());
      });

      setParameters(parameterList);
      await AsyncStorage.setItem("parameter", JSON.stringify(parameterList));
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>เกี่ยวกับผลิตภัณฑ์นี้</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>รายละเอียด</Text>

          <FlatList
            data={parameters}
            renderItem={RenderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e9e9e9",
  },
  headerText: {
    paddingTop: 20,
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },
  detailsContainer: {
    paddingTop: 10,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  parameterText: {
    width: "50%",
    fontWeight: "bold",
    fontSize: 16,
  },
  detailText: {
    width: "50%", // Adjusted width for consistency
    fontSize: 15,
  },
});
