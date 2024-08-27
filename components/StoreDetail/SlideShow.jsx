import { View, Text, Image, StyleSheet, FlatList } from "react-native-web";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../../configs/FriseBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SlideShow() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    initializeDataSlide();
  }, []); // Ensure initializeData is only called once when the component mounts

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % slides.length;
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
              index: nextIndex,
              animated: true,
            });
          }
          return nextIndex;
        });
      }, 1500);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [slides]); // Re-run this effect only when `slides` changes

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

    const countdownInterval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(countdownInterval); // Cleanup countdown interval
  }, []);

  const initializeDataSlide = async () => {
    const savedSlides = await AsyncStorage.getItem("slideData");

    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    } else {
      getSlideList();
    }
  };

  const getSlideList = useCallback(async () => {
    try {
      const q = query(collection(db, "SlideShow"));
      const querySnapshot = await getDocs(q);
      const slideList = querySnapshot.docs.map((doc) => doc.data());

      // Save the data to AsyncStorage
      await AsyncStorage.setItem("slideData", JSON.stringify(slideList));

      setSlides(slideList);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  }, []);

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
      <View style={styles.slideContainer}>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image
                source={{ uri: item.ImgUrl }}
                style={styles.image}
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
        <Text style={styles.indexText}>
          {currentIndex + 1}/{slides.length}
        </Text>
        <Image
          source={require("./../../assets/images/Group 1.png")}
          style={styles.logo}
        />
      </View>

      <LinearGradient
        colors={["rgba(255, 93, 34, 1)", "rgba(255, 125, 50, 1)"]}
        style={styles.gradient}
      >
        <View style={styles.flashSaleContainer}>
          <Image
            source={require("./../../assets/images/flash.png")}
            style={styles.flashIcon}
          />
          <Text style={styles.flashText}>Flash Sale</Text>
        </View>
        <Text style={styles.countdownText}>
          สิ้นสุดหลังจาก:{" "}
          {`${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    position: "relative",
  },
  slide: {
    width: "100%",
    aspectRatio: 1,
  },
  image: {
    width: 560,
    aspectRatio: 1,
  },
  indexText: {
    position: "absolute",
    bottom: 5,
    right: 5,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#EAEAEA",
    borderRadius: 90,
  },
  logo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 50,
    width: 110,
  },
  gradient: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flashSaleContainer: {
    flexDirection: "row",
    gap: 3,
  },
  flashIcon: {
    width: 24,
    height: 24,
  },
  flashText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  countdownText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
