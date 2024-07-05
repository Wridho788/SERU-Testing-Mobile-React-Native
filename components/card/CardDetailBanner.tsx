import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardDetailBannerProps {
  detail: string;
}

const CardDetailBanner: React.FC<CardDetailBannerProps> = ({ detail }) => {
  return (
    <View style={styles.detailBanner}>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailBanner: {
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    color: '#333',
  },
});

export default CardDetailBanner;
