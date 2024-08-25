import { View, Text, Image } from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

export default function Tab1({ tab1 }) {
  const [storeName, setStoreName] = useState([]);

  useEffect(() => {
    const GetStore = async () => {
      const q = query(collection(db, "storeName"));
      const querySnapshot = await getDocs(q);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setStoreName(data);
    };

    GetStore();
  });

  return (
    <View
      style={{
        padding: 10,
        borderTopWidth: 10,
        borderColor: "#f6f6f6",
        marginTop: 15,
      }}
    >
      {storeName.map((item, index) => {
        return (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: item.imgUrl,
                }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 90,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>
        );
      })}

      {tab1.map((item, index) => {
        const Origin = item.GiaGoc * 1;
        const Sale = item.GiaGoc - item.GiaGoc * (item.Sale / 100);

        return (
          <View key={index}>
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                height: 100,
                gap: 10,
              }}
            >
              <Image
                source={{
                  uri: item.imgProduct,
                }}
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#616161",
                  }}
                >
                  {item.nameProduct}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      source={require("./../../assets/images/shield.png")}
                      style={{
                        width: 12,
                        height: 12,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#616161",
                        fontWeight: 600,
                      }}
                    >
                      ช้อปอย่างมั่นใจ
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      backgroundColor: "#f6f6f6",
                      paddingHorizontal: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      source={require("./../../assets/images/Group 2.png")}
                      style={{
                        width: 12,
                        height: 12,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#616161",
                        fontWeight: 600,
                      }}
                    >
                      ผลตอบแทนฟรี
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#333333",
                      fontWeight: 700,
                    }}
                  >
                    ฿ {Sale.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#616161",
                      textDecorationLine: "line-through",
                    }}
                  >
                    ฿ {Origin.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
