import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/configs/FriseBaseConfig";

export default function Tab4({
  setIsQRSelected,
  setSelectedPaymentMethod,
  showQRWarning,
  order,
}) {
  // const [order, setOrder] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  // This effect will be called only once
  // useEffect(() => {
  //   const fetchOrderSummary = async () => {
  //     try {
  //       const q = query(collection(db, "OrderSummary"));
  //       const querySnapshot = await getDocs(q);
  //       const orders = [];
  //       querySnapshot.forEach((doc) => {
  //         orders.push(doc.data());
  //       });
  //       setOrder(orders);
  //     } catch (error) {
  //       console.error("Error getting order summary:", error);
  //     }
  //   };

  //   fetchOrderSummary();
  // }, []); // Empty dependency array ensures it runs only once

  const handlePaymentSelection = (method) => {
    setSelectedMethod(method);
    setSelectedPaymentMethod(method);
    setIsQRSelected(method === "QR");
  };

  return (
    <View>
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>สรุปข้อกำหนด</Text>
        {order.map((item, index) => {
          const subtotal =
            (item.orgin || 0) - (item.orgin || 0) * ((item.sale || 0) / 100);
          const transport = (item.transport || 0) * 1;
          const discount =
            transport -
            (transport * (item.discount || 0)) / 100 -
            (item.tru || 0);
          const total = subtotal + transport - discount;
          return (
            <View key={index} style={styles.orderDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ผลรวมย่อย</Text>
                <Text style={styles.detailValue}>
                  ฿ {subtotal.toLocaleString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ขนส่ง</Text>
                <Text style={styles.detailValue}>
                  ฿ {transport.toLocaleString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ส่วนลดค่าจัดส่ง</Text>
                <Text style={styles.discountValue}>
                  -฿ {discount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ทั้งหมด</Text>
                <Text style={styles.detailValue}>
                  ฿ {total.toLocaleString()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.title}>วิธีการชำระเงิน</Text>

        {/* COD */}
        <View style={styles.paymentOption}>
          <View style={styles.paymentContent}>
            <View style={styles.codIndicator}>
              <Text style={styles.codText}>COD</Text>
            </View>
            <Text style={styles.paymentText}>ชำระเงินเมื่อได้รับ</Text>
          </View>
        </View>

        {/* Mobile Banking */}
        <View style={styles.paymentOption}>
          <View style={styles.paymentContent}>
            <Image
              source={require("./../../assets/images/mobile-banking.png")}
              style={styles.paymentIcon}
              alt="Mobile Banking Icon"
            />
            <Text style={styles.paymentText}>Mobile Banking</Text>
          </View>
        </View>

        {/* Credit/Debit Card */}
        <View style={styles.paymentOption}>
          <View style={styles.paymentContent}>
            <Image
              source={require("./../../assets/images/payment.png")}
              style={styles.paymentIcon}
              alt="Payment Icon"
            />
            <Text style={styles.paymentText}>บัตรเครดิต/บัตรเดบิต</Text>
          </View>
        </View>

        {/* QR Payment */}
        <View style={styles.paymentOption}>
          <View style={styles.paymentContent}>
            <Image
              source={require("./../../assets/images/thaiQRImg.png")}
              style={styles.qrIcon}
              alt="QR Code Icon"
            />
            <Text>QR พร้อมเพย์</Text>
          </View>
          <TouchableOpacity
            onPress={() => handlePaymentSelection("QR")}
            style={[
              styles.radioButton,
              {
                borderColor: selectedMethod === "QR" ? "#FF0985" : "#616161",
                borderWidth: selectedMethod === "QR" ? 5 : 1,
              },
            ]}
          />
        </View>

        {/* QR Warning */}
        {showQRWarning && (
          <View style={styles.warningContainer}>
            <Image
              source={require("./../../assets/images/warning.png")}
              style={styles.warningIcon}
              alt="Warning Icon"
            />
            <Text style={styles.warningText}>
              กรุณาเลือกวิธีการชำระเงินด้วย QR Code
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    borderTopColor: "#f6f6f6",
    borderTopWidth: 10,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderDetails: {
    marginTop: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
  },
  discountValue: {
    fontSize: 14,
    color: "#ff1616",
  },
  paymentContainer: {
    padding: 10,
    borderTopWidth: 10,
    borderColor: "#f6f6f6",
  },
  paymentOption: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  codIndicator: {
    padding: 2,
    backgroundColor: "#6666",
    marginRight: 5,
    borderRadius: 2,
  },
  codText: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
  },
  paymentText: {
    color: "#6666",
  },
  paymentIcon: {
    width: 20,
    height: 20,
  },
  qrIcon: {
    width: 30,
    height: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  warningIcon: {
    width: 20,
    height: 20,
  },
  warningText: {
    fontSize: 14,
    color: "red",
  },
});
