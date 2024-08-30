import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  Clipboard,
} from "react-native-web";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../configs/FriseBaseConfig";
import moment from "moment";
import ORHeader from "./../components/CustormHeader/QRHeader";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "expo-router";

moment.updateLocale("th", {
  months: [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ],
  monthsShort: [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ],
  weekdays: [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ],
  weekdaysShort: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
  weekdaysMin: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
});

export default function Qrpay() {
  const navigato = useNavigation();
  const ClauseData = [
    {
      id: 1,
      tittle: `คลิกปุ่ม "บันทึก QR" หรือแคปหน้าจอ`,
    },
    {
      id: 2,
      tittle: "เปิดแอปพลิเคชันธนาคารบนอุปกรณ์ของท่าน",
    },
    {
      id: 3,
      tittle: `เลือกไปที่ปุ่ม "สแกน" หรือ "QR Code" และกดที่ "รูปภาพ"`,
    },
    {
      id: 4,
      tittle: `เลือกรูปภาพที่ท่านแคปไว้และทำการชำระเงิน โดยกรุณาเช็คชื่อ บัญชีผู้รับคือ "บริษัท ช้อปปี้เพย์ (ประเทศไทย) จำกัด"`,
    },
    {
      id: 5,
      tittle:
        "หลังจากชำระเงินเสร็จสิ้น กรุณากลับไปตรวจสอบสถานะการชำระ เงินในแอป Shopee หากสถานะยังไม่มีการอัปเดต กรุณาติดต่อ ฝ่ายลูกค้าสัมพันธ์ Shopee ที่ 02-017-8399",
    },
    {
      id: 6,
      tittle:
        "QR สามารถสแกนได้ 1 ครั้งต่อ 1 การชำระเงินเท่านั้น หาก ต้องการสแกนใหม่ โปรดรีเฟรช QR อีกครั้ง",
    },
  ];

  const [pay, setPay] = useState([]);
  const [qr, setQr] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [deadline, setDeadline] = useState("");

  const getThaiMonthAbbreviation = (month) => {
    const thaiMonths = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    return thaiMonths[month];
  };

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const cachedPay = await AsyncStorage.getItem("payData");
    const cachedQr = await AsyncStorage.getItem("qrData");

    if (cachedPay) {
      setPay(JSON.parse(cachedPay));
    } else {
      getPay();
    }

    if (cachedQr) {
      setQr(JSON.parse(cachedQr));
    } else {
      getQrpay();
    }
  };

  const getQrpay = useCallback(async () => {
    try {
      const q = query(collection(db, "ImgQrPay"));
      const querySnapshot = await getDocs(q);

      const payData = [];
      querySnapshot.forEach((doc) => {
        payData.push(doc.data());
      });

      setQr(payData);
      await AsyncStorage.setItem("qrData", JSON.stringify(payData));
      console.log(payData);
    } catch (error) {
      console.error("Error fetching QR Pay data: ", error);
    }
  }, []);

  const getPay = useCallback(async () => {
    try {
      const q = query(collection(db, "ProductDetail"));
      const querySnapshot = await getDocs(q);

      const pays = [];
      querySnapshot.forEach((doc) => {
        pays.push(doc.data());
      });

      setPay(pays);
      await AsyncStorage.setItem("payData", JSON.stringify(pays));
    } catch (error) {
      console.error("Error fetching Pay data: ", error);
    }
  }, []);

  const saveImageToDevice = async (imageUrl) => {
    try {
      const fileUri = FileSystem.documentDirectory + "myImage.jpg";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await FileSystem.writeAsStringAsync(fileUri, blob, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Alert.alert("Thông báo", "Ảnh đã được lưu thành công.");
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu ảnh.");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f0f0f0",
      }}
    >
      <ORHeader />

      <ScrollView
        style={{
          marginTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {pay.map((item, index) => {
          const subtotal = item.GiaGoc - item.GiaGoc * (item.Sale / 100);
          const transport = item.phiVanChuyen * 1;
          const discount =
            item.phiVanChuyen -
            item.phiVanChuyen * (item.truphiVc / 100) -
            item.tru;
          const total = subtotal + transport - discount;

          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                ยอดชำระเงินทั้งหมด
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#EF4C2B",
                }}
              >
                ฿{total.toLocaleString()}
              </Text>
            </View>
          );
        })}

        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            marginTop: 3,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>กรุณาชำระภายใน</Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#EF4C2B",
                textAlign: "right",
              }}
            >
              {timeRemaining}
            </Text>
            <Text style={{ fontSize: 14, color: "#6666" }}>{deadline}</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 5,
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#0D3C66",
              width: "100%",
              height: 50,
            }}
          >
            <Image
              source={require("./../assets/images/ci-qrpayment-img-01.png")}
              style={{
                width: 100,
                height: 25,
              }}
            />
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            {qr.map((itemQR, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Image
                    source={{ uri: itemQR.imgUrl }}
                    style={{
                      width: 250,
                      height: 250,
                    }}
                  />

                  {pay.map((item, index) => {
                    const subtotal =
                      item.GiaGoc - item.GiaGoc * (item.Sale / 100);
                    const transport = item.phiVanChuyen * 1;
                    const discount =
                      item.phiVanChuyen -
                      item.phiVanChuyen * (item.truphiVc / 100) -
                      item.tru;
                    const total = subtotal + transport - discount;

                    return (
                      <View key={index}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#EF4C2B",
                            marginTop: 20,
                            textAlign: "center",
                          }}
                        >
                          ฿{total.toLocaleString()}
                        </Text>
                      </View>
                    );
                  })}
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#6c6c6c",
                        marginTop: 5,
                        textAlign: "center",
                      }}
                    >
                      ชื่อ: {itemQR.nameUser}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#6c6c6c",
                        marginTop: 5,
                        textAlign: "center",
                      }}
                    >
                      บัญชี: {itemQR.stk}
                    </Text>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 20,
                      }}
                      onPress={() => Clipboard.setString(itemQR.stk)}
                    >
                      <Image
                        source={require("./../assets/images/copy.png")}
                        style={{
                          width: 14,
                          height: 14,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            {/* 
            {pay.map((item, index) => {
              const subtotal = item.GiaGoc - item.GiaGoc * (item.Sale / 100);
              const transport = item.phiVanChuyen * 1;
              const discount =
                item.phiVanChuyen -
                item.phiVanChuyen * (item.truphiVc / 100) -
                item.tru;
              const total = subtotal + transport - discount;

              return (
                <View key={index}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#EF4C2B",
                      marginTop: 20,
                    }}
                  >
                    ฿{total.toLocaleString()}
                  </Text>
                </View>
              );
            })} */}
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            backgroundColor: "white",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              padding: 10,
            }}
          >
            กรุณาทำตามขั้นตอนที่แนะนำ
          </Text>

          <FlatList
            data={ClauseData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#6666",
                    padding: 5,
                    width: 11,
                    height: 11,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 90,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    {item.id}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    color: "#6666",
                  }}
                >
                  {item.tittle}
                </Text>
              </View>
            )}
          />
        </View>
        <Text
          style={{
            fontSize: 14,
            color: "#666",
            padding: 10,
          }}
        >
          หมายเหตุ: ช่องทางชำระเงินพร้อมเพย์ใช้ได้กับแอปพลิเคชันธนาคารเท่านั้น
          ไม่ สามารถชำระผ่านสาขาธนาคารหรือตู้เอทีเอ็ม
        </Text>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          padding: 5,
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: "#EF4C2B",
            height: 40,
            borderRadius: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            // Giả sử bạn muốn lưu ảnh đầu tiên trong danh sách QR
            if (qr.length > 0) {
              saveImageToDevice(qr[0].imgUrl);
            } else {
              Alert.alert("Lỗi", "Không có ảnh để lưu");
            }
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#EF4C2B",
              fontWeight: "500",
            }}
          >
            บันทึก QR
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#EF4C2B",
            height: 40,
            borderRadius: 3,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
          onPress={() => navigato.navigate("success")}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              fontWeight: "500",
            }}
          >
            ตกลง
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
