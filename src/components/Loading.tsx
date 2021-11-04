import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

interface Props {}

const Loading = ({}: Props) => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingView: {
    padding: 32,
  },
});
