import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useQuery } from "@apollo/client";

import formatData from "../../../utils/formatData";
import formatNumber from "../../../utils/formatNumber";
import PageLoading from "../loading/PageLoading";
import { PURCHASE_HISTORY } from "../../api/mutation/purchaseHistory";
import ProductPrice from "../product/ProductPrice";

type OrderItem = {
  id: string;
  code: string;
  createdAt: string;
  totalWithTax: number;
  state: string;
  lines: {
    id: string;
    featuredAsset: {
      source: string;
    };
    productVariant: {
      name: string;
      priceWithTax: number;
    };
  }[];
};

export default function UserHistoryScreen() {
  const { loading, error, data } = useQuery(PURCHASE_HISTORY);
  const [expandedOrders, setExpandedOrders] = useState<{
    [key: string]: boolean;
  }>({});

  if (loading) return <PageLoading />;

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  if (
    !data ||
    !data.activeCustomer ||
    !data.activeCustomer.orders ||
    !data.activeCustomer.orders.items ||
    data.activeCustomer.orders.items.length === 0
  ) {
    return (
      <View style={styles.container}>
        <Text>No orders found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.activeCustomer.orders.items.map((item: OrderItem) => (
        <View key={item.id}>
          <TouchableOpacity
            style={styles.orderContainer}
            onPress={() =>
              setExpandedOrders({
                ...expandedOrders,
                [item.id]: !expandedOrders[item.id],
              })
            }
          >
            <View style={styles.row}>
              <Text style={styles.orderID}>
                Date placed: {formatData(new Date(item.createdAt))}
              </Text>
              <Text style={styles.total}>
                Total Sum: {formatNumber(item.totalWithTax)}€
              </Text>
              <Text style={styles.orderCode}>Order num.: {item.code}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.createdAt}>State: {item.state}</Text>
            </View>
          </TouchableOpacity>

          {expandedOrders[item.id] && (
            <View style={styles.menu}>
              {item.lines.map((line) => (
                <View style={styles.productItem} key={line.id}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: line.featuredAsset?.source || "" }}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.title}
                    >
                      {line.productVariant?.name}
                    </Text>
                    <ProductPrice price={line.productVariant?.priceWithTax} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    marginBottom: moderateScale(30),
  },
  orderContainer: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(10),
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(5),
  },
  orderID: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  orderCode: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  total: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  createdAt: {
    fontSize: moderateScale(12),
    color: "#666",
    flex: 1,
  },
  menu: {
    marginTop: moderateScale(-20),
    marginBottom: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productItem: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: "#f0f0f0",
    marginBottom: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: "40%",
    aspectRatio: 1,
    marginRight: moderateScale(10),
  },
  image: {
    width: "80%",
    height: "80%",
    borderRadius: moderateScale(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: moderateScale(10),
    marginTop: -moderateScale(70),
  },
  title: {
    fontSize: moderateScale(16),
    paddingBottom: moderateScale(5),
    color: "#333",
    textAlign: "right",
  },
});
