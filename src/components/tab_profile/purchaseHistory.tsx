import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useQuery } from '@apollo/client';
import formatData from '../../../utils/formatData';
import { PURCHASE_HISTORY } from '../../api/mutation/purchaseHistory';
import formatNumber from '../../../utils/formatNumber';

type OrderItem = {
  id: string;
  code: string;
  createdAt: string;
  totalWithTax: number;
};

export default function UserHistoryScreen() {
  const { loading, error, data } = useQuery(PURCHASE_HISTORY);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data.activeCustomer || !data.activeCustomer.orders) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.flatList}
      data={data.activeCustomer.orders.items}
      keyExtractor={(item: OrderItem) => item.id}
      renderItem={({ item }) => (
        <View style={styles.orderContainer}>
          <Text style={styles.orderID}>Order ID: {item.id}</Text>
          <Text style={styles.orderCode}>Order number: {item.code}</Text>
          <Text style={styles.total}>Total Sum: {formatNumber(item.totalWithTax)}€</Text>
          <Text style={styles.createdAt}>
            Date placed: {formatData(item.createdAt)}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  orderContainer: {
    padding: moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  orderID: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
  },
  orderCode: {
    fontSize: moderateScale(14),
    marginBottom: moderateScale(5),
  },
  total: {
    fontSize: moderateScale(14),
    marginBottom: moderateScale(5),
  },
  createdAt: {
    fontSize: moderateScale(12),
    color: '#666',
  },
});
