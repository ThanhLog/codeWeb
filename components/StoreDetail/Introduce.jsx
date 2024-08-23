import { View, Text, FlatList } from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

const renderItem = ({ item }) => (
  <View
    style={{
      flexDirection: "row",
      gap: 5,
      marginTop: 10,
    }}
  >
    <Text
      style={{
        width: "50%",
        fontWeight: "bold",
        fontSize: 16,
      }}
    >
      {item.parameter}:
    </Text>
    <Text
      style={{
        width: "40%",
        fontSize: 15,
      }}
    >
      {item.detail}
    </Text>
  </View>
);

export default function Introduce() {
  const [Parameter, setParameter] = useState([]);

  useEffect(() => {
    getParameterList();
  }, []);

  const getParameterList = async () => {
    try {
      const q = query(collection(db, "Specifications"));
      const querySnapshot = await getDocs(q);

      const ParameterList = [];
      querySnapshot.forEach((doc) => {
        ParameterList.push(doc.data());
      });

      setParameter(ParameterList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#e9e9e9",
        }}
      >
        <Text
          style={{
            paddingTop: 20,
            fontSize: 20,
            color: "#333",
            fontWeight: "bold",
          }}
        >
          เกี่ยวกับผลิตภัณฑ์นี้{" "}
        </Text>
        <View
          style={{
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            รายละเอียด
          </Text>

          <FlatList
            data={Parameter}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
}
