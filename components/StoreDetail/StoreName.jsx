import { View, Text, Image } from "react-native-web";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FriseBaseConfig";

export default function StoreName() {
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
    <View style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {storeName.map((item, index) => {
          return (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <Image
                  source={{
                    uri: item.imgUrl,
                    // uri: "https://i.pinimg.com/736x/27/65/70/276570c09730775f6765a81445471fab.jpg",
                  }}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 3,
                      borderWidth: 1,
                      borderColor: "#43b07c",
                      marginTop: 5,
                      alignSelf: "flex-start",
                      borderRadius: 3,
                      backgroundColor: "#b8f0d5",
                    }}
                  >
                    <Entypo
                      name="star"
                      size={18}
                      color="#43b07c"
                      style={{ marginRight: 3 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      4.9
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        
        <Text
          style={{
            borderWidth: 0.5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 18,
            borderRadius: 5,
          }}
        >
          เข้าถึง
        </Text>
      </View>

      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            borderRightWidth: 1,
            borderRightColor: "#dddddd", // Màu sắc của đường viền
            paddingRight: 10, // Khoảng cách giữa nội dung và đường viền
            marginRight: 10, // Khoảng cách giữa các View
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            25
          </Text>
          <Text
            style={{
              color: "#616161",
              fontSize: 12,
            }}
          >
            รายการ{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            borderRightWidth: 1,
            borderRightColor: "#dddddd",
            paddingRight: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            1.1k
          </Text>
          <Text
            style={{
              color: "#616161",
              fontSize: 12,
            }}
          >
            ขายแล้ว{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            borderRightWidth: 1,
            borderRightColor: "#dddddd",
            paddingRight: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            95%{" "}
            <Text
              style={{
                color: "#ff0985",
                fontSize: 8,
                backgroundColor: "#FCE8E3",
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}
            >
              High
            </Text>
          </Text>
          <Text
            style={{
              color: "#616161",
              fontSize: 12,
            }}
          >
            อัตราการตอบกลับตลอด 24 ชั่วโมง{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            93%
          </Text>
          <Text
            style={{
              color: "#616161",
              fontSize: 12,
            }}
          >
            จัดส่งภายใน 48 ชั่วโมง{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
