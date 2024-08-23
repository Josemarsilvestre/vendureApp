import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import EmptyCustomList from '../emptyList/EmptyCustomList';
import PageLoading from '../loading/PageLoading';

interface ShowWrapperProps {
  isError: boolean;
  error: any;
  refetch: () => void;
  isFetching: boolean;
  dataLength: number;
  type?: 'list' | 'detail';
  originalArgs?: any;
  isSuccess: boolean;
  emptyComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  children?: React.ReactNode;
}

const ShowWrapper: React.FC<ShowWrapperProps> = (props) => {
  const {
    isError,
    error,
    refetch,
    isFetching,
    dataLength,
    type = 'list',
    originalArgs = null,
    isSuccess,
    emptyComponent,
    loadingComponent,
    children,
  } = props;

  return (
    <>
      {isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ocorreu um erro</Text>
          <Text style={[styles.errorText, styles.errorDetails]}>{error?.error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={refetch}
          >
            <Text style={styles.retryButtonText}>Tente novamente</Text>
          </TouchableOpacity>
        </View>
      ) : isFetching ? (
        type === 'list' && originalArgs && originalArgs?.page > 1 ? (
          <>{children}</>
        ) : (
          <View style={styles.loadingContainer}>
            {loadingComponent || <PageLoading />}
          </View>
        )
      ) : isSuccess && type === 'list' && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && type === 'list' && dataLength === 0 ? (
        <>{emptyComponent || <EmptyCustomList />}</>
      ) : isSuccess && type === 'detail' ? (
        <>{children}</>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    paddingVertical: moderateScale(20, 0.1),
    paddingHorizontal: 'auto',
    alignItems: 'center',
  },
  errorText: {
    fontSize: moderateScale(14, 0.1),
    color: 'red',
  },
  errorDetails: {
    marginTop: moderateScale(8, 0.1),
  },
  retryButton: {
    marginTop: moderateScale(12, 0.1),
    paddingVertical: moderateScale(8, 0.1),
    paddingHorizontal: moderateScale(16, 0.1),
    backgroundColor: 'red',
    borderRadius: moderateScale(20, 0.1),
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: moderateScale(14, 0.1),
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
  },
});

export default ShowWrapper;
