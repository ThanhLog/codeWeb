import { View, Text, Image } from "react-native-web";
import React from "react";

export default function Tab3() {
  return (
    <View
      style={{
        padding: 10,
        marginTop: 10,
        borderTopWidth: 10,
        borderTopColor: "#f6f6f6",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Image
              source={require("./../../assets/images/coupon.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ส่วนลดจากร้าน Tiktok
            </Text>
          </View>
          <Image
            source={require("./../../assets/images/right.png")}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 35,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#999999",
            }}
          >
            ใบสำคัญจัดส่ง{" "}
          </Text>
          <Text
            style={{
              color: "#FF1616",
            }}
          >
            แปลงแล้ว 1{" "}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          borderTopColor: "#f6f6f6",
          borderTopWidth: 2,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "90%",
          }}
        >
          <Image
            source={require("./../../assets/images/Frame 2.png")}
            style={{
              width: 24,
              height: 24,
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ยอดโบนัสคืนเงินไม่สามารถแลกสำหรับคำสั่งซื้อนี้ได้!{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
