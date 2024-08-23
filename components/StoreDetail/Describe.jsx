import { View, Text, Image, FlatList } from "react-native-web";
import React from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

const renderItem = ({ item }) => {
  const imageHeight = item.height ? parseInt(item.height, 10) : 250; // Mặc định height là 250 nếu không xác định
  const imageWidth = item.width ? parseInt(item.width, 10) : 150; // Mặc định height là 250 nếu không xác định
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 18, color: "#333", fontWeight: "bold" }}>
        {item.id}. {item.title}
      </Text>
      <Text style={{ fontSize: 14, marginTop: 10 }}>{item.comment}</Text>
      <View
        style={{
          alignItems: "center",
          marginTop: 15,
        }}
      >
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
    getDescribeList();
  }, []);

  const getDescribeList = async () => {
    const q = query(collection(db, "Describe"));
    const querySnapShort = await getDocs(q);
    const describeData = [];

    querySnapShort.forEach((doc) => {
      describeData.push({ id: doc.id, ...doc.data() });
    });

    setData(describeData);
  };

  return (
    <View
      style={{
        padding: 10,
        marginTop: 10,
        borderTopWidth: 10,
        borderTopColor: "#f9f9f9",
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        รายละเอียดสินค้า{" "}
      </Text>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
