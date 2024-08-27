import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native-web";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FriseBaseConfig";
import OverView from "../../components/StoreDetail/index";
import Introduce from "../../components/StoreDetail/Introduce";
import Describe from "./../../components/StoreDetail/Describe";
import StoreName from "./../../components/StoreDetail/StoreName";
import Evaluate from "./../../components/StoreDetail/Evaluate";
import StoreHeader from "./../../components/CustormHeader/StoreHeader";
import SlideShow from "./../../components/StoreDetail/SlideShow";
import AsyncStorage from "@react-native-async-storage/async-storage";

const monthNames = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

export default function Index() {
  const scrollViewRef = useRef(null);
  const describeRef = useRef(null);
  const evaluateRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [sale, setSale] = useState([]);
  const [month, setMonth] = useState("");

  const scrollToSection = (ref, tab) => {
    ref.current?.measureLayout(
      scrollViewRef.current,
      (x, y, width, height) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
        setActiveTab(tab);
      },
      () => {}
    );
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;

    const evaluateTop = evaluateRef.current?.offsetTop || 0;
    const describeTop = describeRef.current?.offsetTop || 0;

    if (scrollY < evaluateTop) {
      setActiveTab("overview");
    } else if (scrollY < describeTop) {
      setActiveTab("evaluate");
    } else {
      setActiveTab("describe");
    }
  };

  useEffect(() => {
    const getMonth = () => {
      const currentMonth = monthNames[new Date().getMonth()];
      setMonth(currentMonth);
    };

    getMonth();

    initializeDataPro();

    const intervalId = setInterval(() => {
      fetchSaleDataIfNeeded();
    }, 10 * 60 * 1000); // Update every 10 minutes

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const initializeDataPro = async () => {
    const cacheProduct = await AsyncStorage.getItem("product");
    const cacheTime = await AsyncStorage.getItem("cacheTime");
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    if (cacheProduct && cacheTime && now - parseInt(cacheTime) < tenMinutes) {
      setSale(JSON.parse(cacheProduct));
    } else {
      fetchSaleData();
    }
  };

  const fetchSaleData = useCallback(async () => {
    try {
      const q = query(collection(db, "ProductDetail"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());

      setSale(data);
      await AsyncStorage.setItem("product", JSON.stringify(data));
      await AsyncStorage.setItem("cacheTime", Date.now().toString());
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  }, []);

  const fetchSaleDataIfNeeded = () => {
    initializeDataPro();
  };

  return (
    <View style={styles.container}>
      <StoreHeader
        onScrollToDescribe={() => scrollToSection(describeRef, "describe")}
        onScrollToEvaluate={() => scrollToSection(evaluateRef, "evaluate")}
        activeTab={activeTab}
      />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SlideShow />
        <View>
          <OverView Sale={sale} month={month} />
        </View>
        <View ref={evaluateRef}>
          <Evaluate />
        </View>
        <StoreName />
        <Introduce />
        <View ref={describeRef}>
          <Describe />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
