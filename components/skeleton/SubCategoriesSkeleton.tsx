import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import Skeleton from '../common/skeleton';

const SubCategoriesSkeleton = () => {
  return (
    <>
      <Skeleton.Item animated="background" height={20} width={96} style={styles.title} />
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Skeleton.Skeleton count={5}>
          <Skeleton.Items style={styles.skeletonItem}>
            <Skeleton.Item animated="background" height={56} width={56} style={styles.image} />
            <Skeleton.Item animated="background" height={16} width={48} style={styles.text} />
          </Skeleton.Items>
        </Skeleton.Skeleton>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
  },
  scrollView: {
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonItem: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#EEE',
    borderRadius: 6,
  },
  image: {
    marginBottom: 8,
    borderRadius: 28,
  },
  text: {
    marginTop: 4,
  },
});

export default SubCategoriesSkeleton;
