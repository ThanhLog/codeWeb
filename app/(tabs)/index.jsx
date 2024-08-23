import { View, ScrollView, StyleSheet } from "react-native-web";
import React, { useRef, useState } from "react";
import OverView from "../../components/StoreDetail/index";
import Introduce from "../../components/StoreDetail/Introduce";
import Describe from "@/components/StoreDetail/Describe";
import StoreName from "@/components/StoreDetail/StoreName";
import Evaluate from "@/components/StoreDetail/Evaluate";
import StoreHeader from "@/components/CustormHeader/StoreHeader";
import SlideShow from "./../../components/StoreDetail/SlideShow";

export default function Index() {
  const scrollViewRef = useRef(null);
  const describeRef = useRef(null);
  const evaluateRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");

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

    // Adjust these thresholds as needed for your layout
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
        {/* OverView */}
        <View ref={evaluateRef}>
          <OverView />
        </View>

        {/* Evaluate */}
        <View ref={evaluateRef}>
          <Evaluate />
        </View>

        {/* Store Name */}
        <StoreName />

        {/* Introduce */}
        <View>
          <Introduce />
        </View>

        {/* Describe */}
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
