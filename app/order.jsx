import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native-web";
import { collection, getDocs, query, doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "@/configs/FriseBaseConfig";

import OrderHeader from "./../components/CustormHeader/OrderHeader";
import { useRoute } from "@react-navigation/native";
import Tab1 from "./../components/OrderMain/Tab1";
import Tab2 from "./../components/OrderMain/Tab2";
import Tab3 from "./../components/OrderMain/Tab3";
import Tab4 from "./../components/OrderMain/Tab4";

export default function Order() {
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState(null);
  const [showAddressWarning, setShowAddressWarning] = useState(false);
  const [showQRWarning, setShowQRWarning] = useState(false);
  const [total, setTotal] = useState(0);
  const [isQRSelected, setIsQRSelected] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const route = useRoute();
  const { addressData } = route.params || {};

  useEffect(() => {
    const getProductDetail = async () => {
      const q = query(collection(db, "ProductDetail"));
      const querySnapshot = await getDocs(q);
      const data = [];

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setOrder(data);
    };
    getProductDetail();
  }, []);
  const calculateTotal = (orders) => {
    let totalAmount = 0;
    orders.forEach((order) => {
      const subtotal = order.GiaGoc - order.GiaGoc * (order.Sale / 100);
      const transport = order.phiVanChuyen || 0;
      const discount =
        phiVanChuyen - phiVanChuyen * (order.truphiVc / 100) - (order.tru || 0);
      totalAmount += subtotal + transport - discount;
    });
    setTotal(totalAmount);
  };

  const placeOrder = async () => {
    if (!addressData) {
      setShowAddressWarning(true);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      return;
    }

    if (!isQRSelected) {
      setShowQRWarning(true);
      scrollViewRef.current.scrollToEnd({ animated: true });
      return;
    }

    const orderId = addressData.fileName;

    const orderData = {
      ...addressData,
      total: total,
    };

    try {
      await setDoc(doc(db, "OrderPlacedSuccessfully", orderId), orderData);
      navigation.navigate("Qrpay");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสั่งซื้อสินค้า: ", error);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <OrderHeader />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {!addressData ? (
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={{
                height: 40,
                borderWidth: 1.5,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#ccc",
                borderRadius: 10,
              }}
              onPress={() => navigation.navigate("AddAddress")}
            >
              <Text style={{ fontSize: 15 }}>+ เพิ่มที่อยู่ใหม่</Text>
            </TouchableOpacity>
            {showAddressWarning && (
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  source={require("./../assets/images/warning.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 14, color: "red" }}>
                  กรุณาเพิ่มที่อยู่ในการจัดส่ง
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={{ padding: 15 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={require("./../assets/images/location-pin.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
              />
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {addressData.name}
                {"  "}
                <Text>{addressData.phoneNumber}</Text>
              </Text>
            </View>
            <View>
              <Text>{addressData.addressDetail}</Text>
              <Text>
                {addressData.wardName},{addressData.districtName},
                {addressData.cityName}
              </Text>
            </View>
          </View>
        )}

        {/* Các tab khác */}
        <Tab1 tab1={order} />
        <Tab2 shippingFees={order} />
        <Tab3 />
        <Tab4
          setIsQRSelected={setIsQRSelected}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          showQRWarning={showQRWarning} // Truyền giá trị showQRWarning vào
        />

        {/* Điều khoản */}
        <View
          style={{ padding: 10, borderTopWidth: 20, borderTopColor: "#f6f6f6" }}
        >
          <Text style={{ fontSize: 14 }}>
            ในการสั่งซื้อ แสดงว่าคุณยอมรับ{" "}
            <Text style={{ fontWeight: "bold" }}>
              ข้อกำหนดการใช้งานและการขายของ TikTok Shop{" "}
            </Text>
            และยืนยันว่าคุณได้อ่านแล้ว{" "}
            <Text style={{ fontWeight: "bold" }}>
              TikTok Shop นโยบายความเป็นส่วนตัว{" "}
            </Text>
            .
          </Text>
        </View>
      </ScrollView>

      <View
        style={{ padding: 10, borderTopWidth: 2, borderTopColor: "#f6f6f6" }}
      >
        <View style={{ marginVertical: 10 }}>
          {order.map((order, index) => {
            const vanchuyen =
              order.phiVanChuyen -
              order.phiVanChuyen * (1 - order.truphiVc / 100) -
              order.tru;
            const total = order.GiaGoc * (1 - order.Sale / 100) + vanchuyen;
            const save = order.GiaGoc * 1 + order.phiVanChuyen * 1 - total;
            return (
              <View key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    ทั้งหมด
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    ฿ {total.toLocaleString()}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: "right",
                    color: "#ff0985",
                  }}
                >
                  คุณบันทึกไว้แล้ว ฿{save.toLocaleString()}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={{
              backgroundColor: addressData && isQRSelected ? "#fe2b54" : "#ccc",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              borderRadius: 7,
            }}
            onPress={placeOrder}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
              คำสั่ง
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
