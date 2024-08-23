import { View, Text, Image } from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

export default function Tab1() {
  const [tab1, setTab1] = useState([]);
  useEffect(() => {
    const getTab1List = async () => {
      const q = query(collection(db, "Tab1"));
      const querySnapshot = await getDocs(q);

      const data = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setTab1(data);
    };

    getTab1List();
  }, []);

  return (
    <View
      style={{
        padding: 10,
        borderTopWidth: 10,
        borderColor: "#f6f6f6",
        marginTop: 15,
      }}
    >
      {tab1.map((item, index) => {
        const Origin = item.origin * 1;
        const Sale = item.origin - item.origin * (item.discount / 100);

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
                  uri: item.imgStore,
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
                {item.nameStore}
              </Text>
            </View>

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
      {/* <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/27/65/70/276570c09730775f6765a81445471fab.jpg",
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
          DVCMOBILE
        </Text>
      </View>

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
            uri: "https://i.pinimg.com/474x/4b/b2/97/4bb29716dea5e8828d1043b1f96e16f0.jpg",
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
            APPLE IPHONE XS MAX 512 GB
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
                Tự tin mua sắm
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
                Trả hàng miễn phí
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
              399.000đ
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#616161",
                textDecorationLine: "line-through",
              }}
            >
              6.238.000đ
            </Text>
          </View>
        </View>
      </View> */}
    </View>
  );
}
