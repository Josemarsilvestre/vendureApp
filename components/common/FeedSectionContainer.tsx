import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

interface FeedSectionContainerProps {
  title: string;
  children?: React.ReactNode;
}

const FeedSectionContainer: React.FC<FeedSectionContainerProps> = ({
  title,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScale(20),
    marginLeft: moderateScale(6),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(15),
  },
  titleText: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    minHeight: moderateScale(100),
  },
});

export default FeedSectionContainer;
