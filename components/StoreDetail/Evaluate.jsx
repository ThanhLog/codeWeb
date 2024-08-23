import { View, Text, Image, FlatList } from "react-native-web";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../../configs/FriseBaseConfig";

const renderItem = ({ item }) => (
  <View
    style={{
      marginTop: 15,
    }}
  >
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: item.imgUrl }}
          style={{ width: 40, height: 40, borderRadius: 90 }}
        />
        <Text
          style={{
            fontSize: 14,
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={require("./../../assets/images/star.png")}
              style={{
                width: 12,
                height: 12,
              }}
            />
          ))}
        </View>
        <Text
          style={{
            color: "#666",
            fontSize: 14,
          }}
        >
          Xác nhận đã mua hàng
        </Text>
      </View>
    </View>
    <View>
      <Text>{item.comment}</Text>
      <Image
        source={{ uri: item.imgProduct }}
        style={{ width: 150, height: 150 }}
      />
    </View>
  </View>
);

export default function Evaluate() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    GetCommentList();
  }, []);

  const GetCommentList = async () => {
    const q = query(collection(db, "Comments"));
    const querySnapShot = await getDocs(q);

    const commentsList = [];
    querySnapShot.forEach((doc) => {
      commentsList.push(doc.data());
    });
    setComments(commentsList);
  };

  return (
    <View
      style={{
        padding: 10,
        borderTopWidth: 15,
        borderTopColor: "#F9F9F9",
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
            fontSize: 15,
            color: "#333",
            fontWeight: "bold",
          }}
        >
          ความคิดเห็นของลูกค้า (1245 ความคิดเห็น){" "}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          ดูเพิ่มเติม{" "}
          <Image
            source={require("./../../assets/images/right.png")}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </Text>
      </View>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          4.9
          <Text
            style={{
              fontWeight: "500",
            }}
          >
            /5
          </Text>
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={require("./../../assets/images/star.png")}
              style={{
                width: 15,
                height: 15,
              }}
            />
          ))}
        </View>
      </View>

      <View>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text
          style={{
            fontSize: 15,
            color: "#818181",
            paddingVertical: 20,
          }}
        >
          มีรีวิวอื่นๆ มากกว่า 423 รายการ...{" "}
        </Text>
      </View>

      <View
        style={{
          paddingTop: 20,
          borderTopWidth: 2,
          borderTopColor: "#f6f6f6",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          รีวิวจากลูกค้าสำหรับร้านค้า(687){" "}
        </Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              gap: 5,
            }}
          >
            <Image
              source={require("./../../assets/images/img.png")}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              (124)
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              5
            </Text>
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
                fontWeight: 500,
              }}
            >
              (256)
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              4
            </Text>
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
                fontWeight: 500,
              }}
            >
              (57)
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              gap: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              3
            </Text>
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
                fontWeight: 500,
              }}
            >
              (5)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
