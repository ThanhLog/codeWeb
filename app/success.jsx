import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native-web";
import React from "react";
import { useNavigation } from "expo-router";

const data = [
  {
    id: 1,
    imgUrl:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSh6mlMNoF6_V0IBPszNTIZz2SDaNTJpiM9wFlsRUDB3Zgze80BNjfXA8CYHXBQR0bWQ4c7ZPijFzg9KCqw337OMyv8JVh3PPy-7b6i1UIpQExs7mED3eEYwc-hJs3m3kZUKyl1SsQKbg&usqp=CAc",
    name: "กระดาษเช็ดปาก Apple Mylan Premium 4 ชั้น 1 กล่อง (20 แพ็ค) (แบบหดได้) (400 แผ่น/แพ็ค) - เทคโนโลยีญี่ปุ่น - เหนียวพิเศษ นุ่ม และเรียบเนียน",
    price: "158,59",
  },
  {
    id: 2,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRdhrmNfi6UPjdPQjQAyhAbrJZUB4PJNkedWcSzTTfbKcaR2vd4zuhaeoQahy50LS8lrWllW-Ws4jwd9beqObETtnP-S0zVzFoqVtjs6fM6np8NzRwW96ehwA&usqp=CAc",
    name: "กางเกงสไตล์ตะวันตกบิ๊กไซส์",
    price: "165,45",
  },
  {
    id: 3,
    imgUrl:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQdgIV4hKgYY2CM32GN4I5Udmnbj34MhhSKkooX-k1I7Nh9BEGc66ZNqc526hBxaw48vXui4HpJbO3HGo1w_nm8WR7i3nrgU4q-DGoRY5HXD73uuvxWvLDshvFJwqBGaw&usqp=CAc",
    name: "ยาสีฟันสมุนไพรสาวไทยดวง 150กรัม - สาวไทยดวง",
    price: "68,94",
  },
  {
    id: 4,
    imgUrl:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRRkChYX7ChJIXtykDkxu6gHwi28AhREOoy0Ie9RaZevTmqUaXS_g1qajL3rp_KV9g2U4XSXiLe6jJ7JvXktSBckMzWvgyjcNyqKEGcbyO48GkFLy7LAd3a85NeH5yVIWSXxMZcfRIE&usqp=CAc",
    name: "คอมโบเสื้อเหย้าเด็กชายแขนกุดพิมพ์ลาย 2 ตัว",
    price: "246,79",
  },
];

export default function Success() {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={{ borderBottomColor: "#f6f6f6", borderBottomWidth: 2 }}>
        <Image
          source={require("./../assets/images/left.png")}
          style={{ width: 24, height: 24 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 35,
            borderBottomColor: "#6666",
            borderBottomWidth: 1,
            paddingBottom: 45,
          }}
        >
          <Image
            source={require("./../assets/images/check.png")}
            style={{ width: 72, height: 72 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "600" }}>
            ส่งออเดอร์แล้ว
          </Text>
          <Text>คำสั่งซื้อของคุณได้รับการจัดส่งแล้ว</Text>
          <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
            <TouchableOpacity
              style={{
                borderColor: "#6666",
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 5,
              }}
              onPress={() => navigation.navigate("order")}
            >
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                การเปลี่ยนแปลงที่อยู่
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderColor: "#6666",
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 15,
                paddingVertical: 5,
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={require("./../assets/images/shopping-cart (2).png")}
                style={{ width: 24, height: 24 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#ff1616",
                }}
              >
                View Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "100%", padding: 10, marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              รับข้อมูลทางอีเมล์
            </Text>
            <View
              style={{
                backgroundColor: "#f0f0f0",
                width: 75,
                height: 35,
                borderRadius: 90,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: "white",
                  borderRadius: 90,
                  marginLeft: 5,
                }}
              />
            </View>
          </View>
          <Text style={{ fontSize: 14, marginTop: 10 }}>
            เมื่อคุณเปิดใช้งานตัวเลือกนี้ แสดงว่าคุณตกลงที่จะรับอีเมลที่มีข้อมูล
            สั่งซื้อข้อมูลอัปเดตและโปรโมชั่นผ่านอีเมลที่เชื่อมโยงกับบัญชี
            บัญชีติ๊กต๊อกของคุณ
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 60 }}>
            คุณอาจจะชอบมันด้วย
          </Text>

          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  overflow: "hidden",
                  width: "50%",
                }}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  style={{ width: "100%", height: 200 }}
                />
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      marginBottom: 5,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 10,
                    }}
                  >
                    ฿ {item.price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./../assets/images/fast-delivery.png")}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#1CBFC0",
                      }}
                    >
                      Freeship
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Hiển thị mỗi dòng 2 item
          />
        </View>
      </ScrollView>
    </View>
  );
}
