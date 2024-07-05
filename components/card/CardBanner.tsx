import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface CardBannerProps {
  title: string;
  indicatorColor: string;
  imageSource: ImageSourcePropType;
}

const CardBanner: React.FC<CardBannerProps> = ({ title, indicatorColor, imageSource }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: indicatorColor }]} />
      <Image source={imageSource} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '100%',
    height: '100%',
    marginHorizontal: 7
  },
  indicator: {
    width: '7%',
    height: '100%',
    marginRight: 8,
    borderRadius: 4,
  },
  icon: {
    flex: 3,
    width: '60%',
    height: '60%',
    padding: 20,
    resizeMode: 'cover',
    marginRight: 10,
  },
  textContainer: {
    flex: 0,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 5
  },
});

export default CardBanner;
