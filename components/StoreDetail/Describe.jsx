import { View, Text, Image, FlatList, StyleSheet } from "react-native-web";
import React, { useCallback } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const renderItem = ({ item }) => {
  const imageHeight = item.height ? parseInt(item.height, 10) : 250; // Mặc định height là 250 nếu không xác định
  const imageWidth = item.width ? parseInt(item.width, 10) : 150; // Mặc định width là 150 nếu không xác định

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>
        {item.id}. {item.title}
      </Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imgUrl }}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />
      </View>
    </View>
  );
};

export default function Describe() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    initializeDataDes();
  }, []); // Empty dependency array ensures it runs only once

  const initializeDataDes = async () => {
    const cacheDescribe = await AsyncStorage.getItem("describe");

    if (cacheDescribe) {
      setData(JSON.parse(cacheDescribe));
    } else {
      getDescribeList();
    }
  };
  const getDescribeList = useCallback(async () => {
    try {
      const q = query(collection(db, "Describe"));
      const querySnapshot = await getDocs(q);
      const describeData = [];

      querySnapshot.forEach((doc) => {
        describeData.push(doc.data());
      });

      setData(describeData);
      await AsyncStorage.setItem("describe", JSON.stringify(describeData));
    } catch (error) {
      console.error("Error getting describe list:", error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>รายละเอียดสินค้า</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    borderTopWidth: 10,
    borderTopColor: "#f9f9f9",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  comment: {
    fontSize: 14,
    marginTop: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 15,
  },
});
