import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, StyleSheet, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, AppDispatch } from '../../redux/store';
import { setClaimData } from '../../redux/slice';
import Navbar from '../../components/navbar/Navbar';
import CardBanner from '../../components/card/CardBanner';
import CardForm from '../../components/card/CardForm';
import Card from '../../components/card/Card';
import { styles } from './styles';
import { data } from '../../../Data/data';
type Props = {
  navigation: any;
};


const RegisterClaimScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState(data);
  const claimData = useSelector((state: RootState) => state.input.claimData);

  const loadMoreItems = () => {
    setItems((prevItems) => [...prevItems, ...data]);
  };

  const saveDataToStorage = async (formData: any) => {
    try {
      const jsonValue = JSON.stringify(formData);
      await AsyncStorage.setItem("submittedData", jsonValue);
      dispatch(setClaimData(formData)); // Save to Redux
    } catch (e) {
      console.error("Error saving data to AsyncStorage:", e);
    }
  };

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("submittedData");
        if (jsonValue !== null) {
          const storedData = JSON.parse(jsonValue);
          dispatch(setClaimData(storedData)); // Save to Redux
        }
      } catch (e) {
        console.error("Error fetching data from AsyncStorage:", e);
      }
    };

    fetchStoredData();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Navbar title="Registrasi Klaim" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CardBanner
                title={item.name}
                indicatorColor={item.indicatorColor}
                imageSource={item.image}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerListContainer}
            style={styles.bannerList}
            snapToInterval={160}
            decelerationRate="fast"
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
          />
          <Card style={styles.card}>
            <CardForm onSubmit={saveDataToStorage} />
          </Card>
          {claimData && (
            <Card style={styles.infoCard}>
              <View style={styles.infoCardContent}>
                <View style={styles.infoLeftColumn}>
                  <Text style={styles.infoText}>Nama Depan:</Text>
                  <Text style={styles.infoText}>Nama Belakang</Text>
                  <Text style={styles.infoText}>Biodata:</Text>
                  <Text style={styles.infoText}>Status</Text>
                  <Text style={styles.infoText}>Tanggal dan waktu kejadian:</Text>
                  <Text style={styles.infoText}>Provinsi:</Text>
                  <Text style={styles.infoText}>Kota:</Text>
                  <Text style={styles.infoText}>Kecamatan:</Text>
                  <Text style={styles.infoText}>Kelurahan:</Text>
                </View>
                <View style={styles.infoRightColumn}>
                  <Text style={styles.infoText}>{claimData.firstName}</Text>
                  <Text style={styles.infoText}>{claimData.lastName}</Text>
                  <Text style={styles.infoText}>{claimData.biodata}</Text>
                  <Text style={styles.infoText}>{claimData.status}</Text>
                  <Text style={styles.infoText}>
                    {claimData.date ? new Date(claimData.date).toLocaleString() : '-'}
                  </Text>
                  <Text style={styles.infoText}>{claimData.province}</Text>
                  <Text style={styles.infoText}>{claimData.city}</Text>
                  <Text style={styles.infoText}>{claimData.district}</Text>
                  <Text style={styles.infoText}>{claimData.subDistrict}</Text>
                </View>
              </View>
            </Card>
          )}
          <Button
            title="Go to Register Claim Photo"
            onPress={() => navigation.navigate('RegisterClaimPhoto')}
          />
        </View>
      </ScrollView>
    </View>
  );
};


export default RegisterClaimScreen;
