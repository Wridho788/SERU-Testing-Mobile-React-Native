import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView 
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from "../../components/navbar/Navbar";
import Card from "../../components/card/Card";
import CardBanner from "../../components/card/CardBanner";
import CardDetailBanner from "../../components/card/CardDetailBanner";
import CardForm from "../../components/card/CardForm";
import { data, } from "../../Data/data";
import { dummyData } from "../../Data/dummyData";
import { styles } from "./styles";

const RegisterClaimScreen: React.FC = () => {
  const [items, setItems] = useState(data);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null); // State untuk menyimpan data yang telah di-submit
  const loadMoreItems = () => {
    // Simulate loading more data
    setItems((prevItems) => [...prevItems, ...data]);
  };

 // Fungsi untuk menyimpan data ke AsyncStorage
 const saveDataToStorage = async (formData: any) => {
  try {
    const jsonValue = JSON.stringify(formData);
    await AsyncStorage.setItem('submittedData', jsonValue);
    setSubmittedData(formData); // Simpan juga ke state untuk ditampilkan
  } catch (e) {
    console.error('Error saving data to AsyncStorage:', e);
  }
};

useEffect(() => {
  const fetchStoredData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('submittedData');
      if (jsonValue !== null) {
        const storedData = JSON.parse(jsonValue);
        setSubmittedData(storedData);
      }
    } catch (e) {
      console.error('Error fetching data from AsyncStorage:', e);
    }
  };

  fetchStoredData()},[])

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
            snapToInterval={160} // Sesuaikan dengan lebar card + margin
            decelerationRate="fast"
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
          />
           <View style={styles.infoButtonContainer}>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setShowInfoCard(!showInfoCard)}
            >
              <Text style={styles.infoButtonText}>Registrasi Klaim: {dummyData.vehicleInfo.noPolisi}</Text>
            </TouchableOpacity>
            {showInfoCard && (
              <Card style={styles.infoCard}>
                <View style={styles.infoCardContent}>
                  <View style={styles.infoLeftColumn}>
                    <Text style={styles.infoTitle}>Informasi Kendaraan</Text>
                    <Text style={styles.infoText}>Nomor Polisi:</Text>
                    <Text style={styles.infoText}>Nama Tertanggung:</Text>
                    <Text style={styles.infoText}>No Polis:</Text>
                    <Text style={styles.infoText}>Periode:</Text>
                    <Text style={styles.infoText}>Nilai Pertanggungan:</Text>
                    <Text style={styles.infoText}>Buatan/Merk:</Text>
                    <Text style={styles.infoText}>Tahun Pembuatan:</Text>
                    <Text style={styles.infoText}>No Mesin:</Text>
                    <Text style={styles.infoText}>No Rangka:</Text>
                  </View>
                  <View style={styles.infoRightColumn}>
                    <Text style={styles.infoTitle}>Props Dummy Data</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.noPolisi}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.namaTertanggung}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.noPolis}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.periode}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.nilaiPertanggungan}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.buatanMerk}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.tahunPembuatan}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.noMesin}</Text>
                    <Text style={styles.infoText}>{dummyData.vehicleInfo.noRangka}</Text>
                  </View>
                </View>
              </Card>
            )}
          </View>
          <Card style={styles.card}>
            <CardForm onSubmit={saveDataToStorage} />
          </Card>
          {submittedData && (
          <View style={styles.submittedContainer}>
            <Text style={styles.label}>Submitted Data:</Text>
            <Text style={styles.text}>First Name: {submittedData.firstName}</Text>
            <Text style={styles.text}>Last Name: {submittedData.lastName}</Text>
            <Text style={styles.text}>Biodata: {submittedData.biodata}</Text>
            <Text style={styles.text}>Status: {submittedData.status}</Text>
            <Text style={styles.text}>Date: {submittedData.date ? new Date(submittedData.date).toLocaleString() : '-'}</Text>
            <Text style={styles.text}>Province: {submittedData.province}</Text>
            <Text style={styles.text}>City: {submittedData.city}</Text>
            <Text style={styles.text}>District: {submittedData.district}</Text>
            <Text style={styles.text}>Sub-District: {submittedData.subDistrict}</Text>
          </View>
        )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterClaimScreen;
