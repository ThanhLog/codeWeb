import { View, Text, Image } from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

export default function Tab2() {
  const [shippingFees, setShippingFees] = useState([]);

  useEffect(() => {
    getShippingFee();
  }, []);

  const getShippingFee = async () => {
    const q = query(collection(db, "ShippingFee"));
    const querySnapshot = await getDocs(q);
    const fees = [];

    querySnapshot.forEach((doc) => {
      fees.push(doc.data());
    });

    setShippingFees(fees); // Set the array of fees
  };

  return (
    <View>
      {shippingFees.map((fee, index) => {
        const discountedPrice = fee.original * (fee.discount / 100);
        const originalPrice = fee.original * (100 / 100);
        return (
          <View
            key={index}
            style={{
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#999999",
                }}
              >
                จัดส่งแบบมาตรฐาน
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Image
                  source={require("./../../assets/images/fast-delivery.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >
                  ฿ {discountedPrice.toLocaleString()}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                marginBottom: 7,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Image
                    source={require("./../../assets/images/fast-delivery.png")}
                    style={{
                      width: 14,
                      height: 14,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                    }}
                  >
                    ใช้บัตรกำนัลส่วนลดการจัดส่งแล้ว
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    textDecorationLine: "line-through",
                  }}
                >
                  ฿ {originalPrice.toLocaleString()}
                </Text>
              </View>
            </View>

            <View
              style={
                {
                  // marginTop: 10,
                }
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={require("./../../assets/images/Frame 1.png")}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#999999",
                  }}
                >
                  จัดส่งจาก {fee.sentFrom}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Image
                  source={require("./../../assets/images/clock.png")}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#999999",
                  }}
                >
                  วันที่จัดส่งโดยประมาณ: 3 - 5 วัน
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
