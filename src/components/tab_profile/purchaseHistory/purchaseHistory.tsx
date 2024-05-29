import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useQuery } from "@apollo/client";

import formatData from "../../../../utils/formatData";
import formatNumber from "../../../../utils/formatNumber";
import PageLoading from "../../loading/PageLoading";
import { PURCHASE_HISTORY } from "../../../api/mutation/purchaseHistory";
import ProductPrice from "../../product/ProductPrice";
import styles from "./style.purchaseHistory";

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
              <Text style={styles.state}>State: <Text style={{color: "#666", fontWeight: 'normal'}}>{item.state}</Text></Text>
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
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={styles.title}
                    >
                      Price without shipping fee
                    </Text>
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