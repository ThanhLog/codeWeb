import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native-web";
import AddressHeader from "../components/CustormHeader/AddressHeader";
import { useNavigation } from "expo-router";

export default function AddAddress() {
  const navigation = useNavigation();
  const [name, setNameUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [wardError, setWardError] = useState("");

  const checkFormCompletion = () => {
    let formFilled = true;

    if (name.trim() === "") {
      setNameError("กรอกชื่อเต็มของคุณ");
      formFilled = false;
    } else {
      setNameError("");
    }

    if (phoneNumber.trim() === "") {
      setPhoneError("ป้อนหมายเลขโทรศัพท์ที่ถูกต้อง");
      formFilled = false;
    } else {
      setPhoneError("");
    }

    if (cityName.trim() === "") {
      setCityError("เลือกเมือง");
      formFilled = false;
    } else {
      setCityError("");
    }

    if (districtName.trim() === "") {
      setDistrictError("เลือกเขต/อำเภอ");
      formFilled = false;
    } else {
      setDistrictError("");
    }

    if (wardName.trim() === "") {
      setWardError("เลือกวอร์ด/ชุมชน");
      formFilled = false;
    } else {
      setWardError("");
    }

    return formFilled;
  };

  const removeVietnameseTones = (str) => {
    const accents =
      "àáạảãâầấậẩẫäèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ";
    const noAccents = "aaaaaaaaaaeeeeeeeeeeiiiiiooooooooooooouuuuuuuuuuuyyyyyy";
    const accentMap = {};
    for (let i = 0; i < accents.length; i++) {
      accentMap[accents[i]] = noAccents[i];
    }
    return str
      .split("")
      .map((char) => accentMap[char] || char)
      .join("");
  };

  const saveAddress = async () => {
    const formIsValid = checkFormCompletion();
    if (!formIsValid) {
      Alert.alert("ผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 10);
    const nameWithoutSpaces = removeVietnameseTones(name.trim()).replace(
      /\s+/g,
      ""
    );
    const fileName = `${nameWithoutSpaces}_${phoneNumber}_${currentDate}`;

    const addressData = {
      name,
      phoneNumber,
      addressDetail,
      cityName,
      districtName,
      wardName,
      date: currentDate,
      fileName,
    };

    console.log("Address Data:", addressData);

    const userData = {
      name,
      phoneNumber,
    };

    try {
      navigation.navigate("order", { addressData, userData });
    } catch (error) {
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดขณะบันทึกที่อยู่");
      console.error(
        "ข้อผิดพลาดในการบันทึกที่อยู่: ",
        error.message || ข้อผิดพลาด
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <AddressHeader />
      <ScrollView style={{ flex: 1, padding: 10, marginTop: 10 }}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#999999" }}>
            ข้อมูลการติดต่อ
          </Text>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 15,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <TextInput
              placeholder="ชื่อเต็ม"
              placeholderTextColor="#999999"
              style={{
                fontSize: 16,
                borderBottomColor: nameError ? "#fe2b54" : "#999999",
                borderBottomWidth: 2,
                paddingBottom: 10,
                outline: "none",
              }}
              onChangeText={(text) => setNameUser(text)}
            />

            {nameError ? (
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                }}
              >
                <Image
                  source={require("./../assets/images/warning.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{ color: "red" }}> {nameError}</Text>
              </View>
            ) : null}
            <TextInput
              placeholder="กรอกหมายเลขโทรศัพท์ที่ถูกต้อง"
              placeholderTextColor="#999999"
              style={{
                fontSize: 16,
                borderBottomColor: phoneError ? "#fe2b54" : "#999999",
                borderBottomWidth: 2,
                paddingBottom: 10,
                marginTop: 20,
                outline: "none",
              }}
              keyboardType="numeric"
              onChangeText={(text) => {
                const validNumber = text.replace(/[^0-9]/g, "");
                setPhoneNumber(validNumber);
              }}
            />

            {phoneError ? (
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                }}
              >
                <Image
                  source={require("./../assets/images/warning.png")}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{ color: "red" }}> {phoneError}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "#999999" }}>
            ข้อมูลที่อยู่
          </Text>
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 15,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <TextInput
              placeholder="กรอกชื่อเมือง"
              placeholderTextColor="#999999"
              style={{
                fontSize: 16,
                borderBottomColor: cityError ? "#fe2b54" : "#999999",
                borderBottomWidth: 2,
                paddingBottom: 10,
                outline: "none",
              }}
              onChangeText={(text) => setCityName(text)}
            />

            {cityError ? (
              <Text style={{ color: "red" }}>{cityError}</Text>
            ) : null}

            <TextInput
              placeholder="กรอกชื่ออำเภอ"
              placeholderTextColor="#999999"
              style={{
                fontSize: 16,
                borderBottomColor: districtError ? "#fe2b54" : "#999999",
                borderBottomWidth: 2,
                paddingBottom: 10,
                outline: "none",
                marginTop: 20,
              }}
              onChangeText={(text) => setDistrictName(text)}
            />

            {districtError ? (
              <Text style={{ color: "red" }}>{districtError}</Text>
            ) : null}

            <TextInput
              placeholder="กรอกชื่อชุมชน"
              placeholderTextColor="#999999"
              style={{
                fontSize: 16,
                borderBottomColor: wardError ? "#fe2b54" : "#999999",
                borderBottomWidth: 2,
                paddingBottom: 10,
                outline: "none",
                marginTop: 20,
              }}
              onChangeText={(text) => setWardName(text)}
            />

            {wardError ? (
              <Text style={{ color: "red" }}>{wardError}</Text>
            ) : null}

            <TextInput
              placeholder="กรอกที่อยู่โดยละเอียด"
              placeholderTextColor="#999999"
              style={{
                fontSize: 16,
                borderBottomColor: "#999999",
                borderBottomWidth: 2,
                paddingBottom: 10,
                outline: "none",
                marginTop: 20,
              }}
              onChangeText={(text) => setAddressDetail(text)}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          backgroundColor: "#fe2b54",
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          borderRadius: 7,
        }}
        onPress={saveAddress}
      >
        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
          เสร็จสิ้น
        </Text>
      </TouchableOpacity>
    </View>
  );
}
