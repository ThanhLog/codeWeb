import { View, Text, TouchableOpacity, Image } from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

export default function Tab4({
  setIsQRSelected,
  setSelectedPaymentMethod,
  showQRWarning, // nhận giá trị showQRWarning từ component cha
}) {
  const [order, setOrder] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    getOrderSummary();
  }, []);

  const getOrderSummary = async () => {
    try {
      const q = query(collection(db, "OrderSummary"));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
      setOrder(orders);
    } catch (error) {
      console.error("Error getting order summary:", error);
    }
  };

  const handlePaymentSelection = (method) => {
    setSelectedMethod(method);
    setSelectedPaymentMethod(method);
    setIsQRSelected(method === "QR");
  };

  return (
    <View>
      <View
        style={{ borderTopColor: "#f6f6f6", borderTopWidth: 10, padding: 10 }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>สรุปข้อกำหนด </Text>
        {order.map((order, index) => {
          const subtotal =
            (order.orgin || 0) - (order.orgin || 0) * ((order.sale || 0) / 100);
          const transport = (order.transport || 0) * 1;
          const discount =
            transport -
            (transport * (order.discount || 0)) / 100 -
            (order.tru || 0);
          const total = subtotal + transport - discount;
          return (
            <View key={index} style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14 }}>ผลรวมย่อย</Text>
                <Text style={{ fontSize: 14 }}>
                  ฿ {subtotal.toLocaleString()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14 }}>ขนส่ง</Text>
                <Text style={{ fontSize: 14 }}>
                  ฿ {transport.toLocaleString()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14 }}>ส่วนลดค่าจัดส่ง</Text>
                <Text style={{ fontSize: 14, color: "#ff1616" }}>
                  -฿ {discount.toLocaleString()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 14 }}>ทั้งหมด</Text>
                <Text style={{ fontSize: 14 }}>฿ {total.toLocaleString()}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ padding: 10, borderTopWidth: 10, borderColor: "#f6f6f6" }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          วิธีการชำระเงิน{" "}
        </Text>

        {/* Thanh toán khi nhận hàng */}
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                padding: 2,
                backgroundColor: "#6666",
                marginRight: 5,
                borderRadius: 2,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "700", color: "white" }}>
                COD
              </Text>
            </View>
            <Text style={{ color: "#6666" }}>ชำระเงินเมื่อได้รับ</Text>
          </View>
        </View>

        {/* Mobile Banking */}
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                padding: 2,
                marginRight: 5,
                borderRadius: 2,
              }}
            >
              <Image
                source={require("./../../assets/images/mobile-banking.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={{ color: "#6666" }}>Mobile Banking</Text>
          </View>
        </View>

        {/* PayMent */}
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                padding: 2,
                marginRight: 5,
                borderRadius: 2,
              }}
            >
              <Image
                source={require("./../../assets/images/payment.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={{ color: "#6666" }}>บัตรเครดิต/บัตรเดบิต</Text>
          </View>
        </View>

        {/* Thanh toán bằng QR */}
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image
              source={require("./../../assets/images/thaiQRImg.png")}
              style={{ width: 30, height: 20 }}
            />
            <Text>QR พร้อมเพย์</Text>
          </View>
          <TouchableOpacity
            onPress={() => handlePaymentSelection("QR")}
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderColor: selectedMethod === "QR" ? "#FF0985" : "#616161",
              borderWidth: selectedMethod === "QR" ? 5 : 1,
            }}
          />
        </View>

        {/* Thêm thông báo lỗi */}
        {showQRWarning && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={require("./../../assets/images/warning.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text style={{ fontSize: 14, color: "red" }}>
              กรุณาเลือกวิธีการชำระเงินด้วย QR Code
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
