import { View, Text, Image, ScrollView } from "react-native-web";
import React from "react";

export default function index({ Sale, month }) {
  return (
    <View>
      <View
        style={{
          marginTop: 5,
        }}
      >
        {Sale.map((item, index) => {
          const PriceSale = item.GiaGoc - item.GiaGoc * (item.Sale / 100);
          const GiaGoc = item.GiaGoc * 1;
          const phiVanChuyen = item.phiVanChuyen * 1;
          const fee =
            item.phiVanChuyen -
            item.phiVanChuyen * (item.truphiVc / 100) -
            item.tru;
          return (
            <View key={index}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 3,
                  alignItems: "flex-end",
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  ฿ {PriceSale.toLocaleString()}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#B1B1B1",
                    textDecorationLine: "line-through",
                  }}
                >
                  ฿ {GiaGoc.toLocaleString()}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#FD4642",
                    backgroundColor: "#FEEEF5",
                    paddingHorizontal: 3,
                  }}
                >
                  -{item.Sale}%
                </Text>
              </View>
              {/* Name Product */}
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {item.nameProduct}
                </Text>
                <Image
                  source={require("./../../assets/images/icons8-bookmark-512.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
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
                      source={require("./../../assets/images/star.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      4.9/5{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#2C5DBA",
                      }}
                    >
                      ({item.luotComment})
                    </Text>
                  </View>
                  <Text
                    style={{
                      marginLeft: 10,
                      paddingLeft: 5,
                      fontSize: 16,
                      borderLeftWidth: 1,
                      borderLeftColor: "#B1B1B1",
                      color: "#B1B1B1",
                    }}
                  >
                    ขายแล้ว{" "}
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {item.daBan}k
                    </Text>
                  </Text>
                </View>
              </View>

              <View>
                <View
                  style={{
                    marginTop: 15,
                    padding: 10,
                    backgroundColor: "#F9F5F2",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./../../assets/images/trophy.png")}
                      style={{
                        width: 14,
                        height: 14,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9C7131",
                        marginLeft: 5,
                        fontWeight: "bold",
                      }}
                    >
                      สินค้ายอดนิยม{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9C7131",
                        marginLeft: 5,
                      }}
                    >
                      สินค้าขายดีประจำเดือน {month}
                    </Text>
                  </View>
                  <Image
                    source={require("./../../assets/images/right-arrow.png")}
                    style={{
                      width: 16,
                      height: 16,
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: "#F9F9F9",
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
                    source={require("./../../assets/images/payMent_1.png")}
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
                    การชำระเงินที่ปลอดภัย{" "}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Image
                    source={require("./../../assets/images/removeOder_1.png")}
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
                    ยกเลิกคำสั่งซื้อได้อย่างง่ายดาย{" "}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Image
                    source={require("./../../assets/images/messenger.png")}
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
                    ทีมสนับสนุน 24/7{" "}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    จำนวนคลังสินค้า
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      backgroundColor: "#F8F8F8",
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      marginLeft: 10,
                    }}
                  >
                    นิ่ง {item.con}
                  </Text>
                </View>

                <View>
                  <View
                    style={{
                      position: "relative",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 90,
                      height: 25,
                    }}
                  >
                    <Image
                      source={require("./../../assets/images/tag-20230922023550-lber6.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Text
                      style={{
                        color: "#ED3E57",
                        fontSize: 12,
                      }}
                    >
                      ลด ฿29
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#FF0958",
                      textAlign: "center",
                      width: 90,
                    }}
                  >
                    ค่าจัดส่ง
                  </Text>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  borderTopWidth: 10,
                  borderTopColor: "#F8F8F8",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#333333",
                    fontWeight: "bold",
                  }}
                >
                  วิธีการชำระเงิน{" "}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#ffff",
                      backgroundColor: "#4FAB7E",
                      width: "auto",
                      paddingHorizontal: 3,
                      marginRight: 5,
                      borderRadius: 3,
                    }}
                  >
                    COD
                  </Text>
                  <Text>ชำระเป็นเงินสด (COD)</Text>
                </View>
              </View>

              <View
                style={{
                  padding: 10,
                  borderBottomWidth: 2,
                  borderTopWidth: 2,
                  borderBottomColor: "#F8F8F8",
                  borderTopColor: "#F8F8F8",
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
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    ขนส่ง{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#928F8F",
                        textDecorationLine: "line-through",
                      }}
                    >
                      ฿ {phiVanChuyen.toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FF0958",
                        marginLeft: 10,
                      }}
                    >
                      ฿ {fee.toLocaleString()}
                    </Text>
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 10,
                      }}
                      source={require("./../../assets/images/right.png")}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 15,
                  }}
                >
                  <View
                    style={{
                      width: 200,
                      height: 25,
                      position: "relative",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("./../../assets/images/1-20230922041846-a2w0l.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#48bebe",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      บัตรกำนัลช่วยลดต้นทุนการขนส่ง
                    </Text>
                  </View>
                  - ค่าจัดส่ง ฿1 สำหรับการสั่งซื้อมูลค่า ฿34 ขึ้นไป ขึ้นไป -
                  ค่าจัดส่ง ฿24 สำหรับการสั่งซื้อที่มีมูลค่า ฿109 ดองขึ้นไป
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          นโยบายการคืนสินค้า
        </Text>
        <Text style={{ color: "#707070", fontSize: 14 }}>
          หลังจากทำงาน 7 ปี จะมีงาน 7 ปีระหว่างคนสองคน{" "}
        </Text>
      </View>
    </View>
  );
}
