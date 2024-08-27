import { View, Text, Image, FlatList, StyleSheet } from "react-native-web";
import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../../configs/FriseBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Render từng item trong FlatList
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.headerContainer}>
      <Image source={{ uri: item.imgUrl }} style={styles.avatar} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
    <View style={styles.reviewContainer}>
      <View style={styles.starContainer}>
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            source={require("./../../assets/images/star.png")}
            style={styles.star}
          />
        ))}
      </View>
      <Text style={styles.reviewText}>Xác nhận đã mua hàng</Text>
    </View>
    <View style={styles.commentContainer}>
      <Text>{item.comment}</Text>
      <Image source={{ uri: item.imgProduct }} style={styles.productImage} />
    </View>
  </View>
);

export default function Evaluate() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    initializeDataCmt();
  }, []); // Chỉ gọi một lần khi component được mount

  const initializeDataCmt = async () => {
    const cachedComment = await AsyncStorage.getItem("comment");

    if (cachedComment) {
      setComments(JSON.parse(cachedComment));
    } else {
      GetCommentList();
    }
  };
  const GetCommentList = useCallback(async () => {
    try {
      const q = query(collection(db, "Comments"));
      const querySnapshot = await getDocs(q);

      const commentsList = [];
      querySnapshot.forEach((doc) => {
        commentsList.push(doc.data());
      });
      setComments(commentsList);
      await AsyncStorage.setItem("comment", JSON.stringify(commentsList));
    } catch (error) {
      console.error("Error getting comments list:", error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          ความคิดเห็นของลูกค้า (1245 ความคิดเห็น)
        </Text>
        <Text style={styles.viewMore}>
          ดูเพิ่มเติม
          <Image
            source={require("./../../assets/images/right.png")}
            style={styles.rightArrow}
          />
        </Text>
      </View>

      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>
          4.9
          <Text style={styles.ratingOutOf}>/5</Text>
        </Text>
        <View style={styles.ratingStars}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={require("./../../assets/images/star.png")}
              style={styles.ratingStar}
            />
          ))}
        </View>
      </View>

      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.moreReviews}>มีรีวิวอื่นๆ มากกว่า 423 รายการ...</Text>

      <View style={styles.storeReviews}>
        <Text style={styles.storeReviewsTitle}>
          รีวิวจากลูกค้าสำหรับร้านค้า(687)
        </Text>
        <View style={styles.reviewsSummary}>
          {[
            { label: "(124)", count: 124 },
            { label: "5", count: 256 },
            { label: "4", count: 57 },
            { label: "3", count: 5 },
          ].map(({ label, count }, index) => (
            <View key={index} style={styles.reviewSummaryItem}>
              <Text style={styles.reviewLabel}>{label}</Text>
              <Image
                source={require("./../../assets/images/star.png")}
                style={styles.reviewStar}
              />
              <Text style={styles.reviewCount}>({count})</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: 15,
    borderTopColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
  },
  viewMore: {
    fontSize: 12,
  },
  rightArrow: {
    width: 12,
    height: 12,
  },
  ratingContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rating: {
    fontSize: 15,
    fontWeight: "bold",
  },
  ratingOutOf: {
    fontWeight: "500",
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingStar: {
    width: 15,
    height: 15,
  },
  itemContainer: {
    marginTop: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 90,
  },
  name: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  reviewContainer: {
    marginTop: 5,
  },
  starContainer: {
    flexDirection: "row",
    gap: 5,
  },
  star: {
    width: 12,
    height: 12,
  },
  reviewText: {
    color: "#666",
    fontSize: 14,
  },
  commentContainer: {
    marginTop: 10,
  },
  productImage: {
    width: 150,
    height: 150,
  },
  moreReviews: {
    fontSize: 15,
    color: "#818181",
    paddingVertical: 20,
  },
  storeReviews: {
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: "#f6f6f6",
  },
  storeReviewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewsSummary: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewSummaryItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    gap: 5,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  reviewStar: {
    width: 20,
    height: 20,
  },
  reviewCount: {
    fontSize: 16,
    fontWeight: "500",
  },
});
