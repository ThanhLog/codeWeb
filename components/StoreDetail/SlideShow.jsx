import { View, Text, FlatList, Image } from "react-native-web";
import React, { useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../../configs/FriseBaseConfig";

export default function SlideShow() {
  const [slide, setSlide] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    getSlideList();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slide.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [slide]);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );
      const timeLeft = Math.max(0, Math.floor((endOfDay - now) / 1000));
      setCountdown(timeLeft);
    };

    calculateCountdown();

    const countdownInterval = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const getSlideList = async () => {
    try {
      const q = query(collection(db, "SlideShow"));
      const querySnapshot = await getDocs(q);
      const slideList = querySnapshot.docs.map((doc) => doc.data());
      setSlide(slideList);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    if (slide.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % slide.length; // Quay lại đầu khi đến cuối
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            }); // Cuộn đến ảnh tiếp theo
          }
          return nextIndex;
        });
      }, 1500); // Thay đổi ảnh sau mỗi 1.5 giây

      return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }
  }, [slide]); // Chỉ thiết lập interval khi slide thay đổi

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return {
      hours,
      minutes,
      secs,
    };
  };

  const { hours, minutes, secs } = formatTime(countdown);

  return (
    <View>
      <View style={{ position: "relative" }}>
        <View>
          <FlatList
            ref={flatListRef}
            data={slide}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ width: "100%", aspectRatio: 1 }}>
                <Image
                  source={{ uri: item.ImgUrl }}
                  style={{ width: 560, aspectRatio: 1 }}
                  resizeMode="cover"
                  onError={(error) =>
                    console.log("Error loading image:", error.nativeEvent.error)
                  }
                />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            fontSize: 14,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#EAEAEA",
            borderRadius: 90,
          }}
        >
          {currentIndex + 1}/{slide.length}
        </Text>
        <Image
          source={require("./../../assets/images/Group 1.png")}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 50,
            width: 110,
          }}
        />
      </View>

      {/* Sử dụng LinearGradient */}
      <LinearGradient
        colors={["rgba(255, 93, 34, 1)", "rgba(255, 125, 50, 1)"]} // Màu sắc gradient
        style={{
          height: 50,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 3 }}>
          <Image
            source={require("./../../assets/images/flash.png")}
            style={{
              width: 24,
              height: 24,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Flash Sale
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          สิ้นสุดหลังจาก:{" "}
          {`${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
        </Text>
      </LinearGradient>
    </View>
  );
}
