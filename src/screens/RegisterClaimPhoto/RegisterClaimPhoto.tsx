import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../../components/navbar/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterClaimPhoto: React.FC = () => {
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [ktpImage, setKtpImage] = useState<string | null>(null);
  const [freeImage, setFreeImage] = useState<string | null>(null);

  useEffect(() => {
    const loadStoredImages = async () => {
      try {
        const storedSelfieImage = await AsyncStorage.getItem('selfieImage');
        if (storedSelfieImage) {
          setSelfieImage(storedSelfieImage);
        }

        const storedKtpImage = await AsyncStorage.getItem('ktpImage');
        if (storedKtpImage) {
          setKtpImage(storedKtpImage);
        }

        const storedFreeImage = await AsyncStorage.getItem('freeImage');
        if (storedFreeImage) {
          setFreeImage(storedFreeImage);
        }
      } catch (error) {
        console.error('Error loading stored images:', error);
      }
    };

    loadStoredImages();
  }, []);

  const pickImage = async (type: 'selfie' | 'ktp' | 'free') => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      switch (type) {
        case 'selfie':
          setSelfieImage(uri);
          await AsyncStorage.setItem('selfieImage', uri);
          break;
        case 'ktp':
          setKtpImage(uri);
          await AsyncStorage.setItem('ktpImage', uri);
          break;
        case 'free':
          setFreeImage(uri);
          await AsyncStorage.setItem('freeImage', uri);
          break;
        default:
          break;
      }
    }
  };

  const handleReupload = async (type: 'selfie' | 'ktp' | 'free') => {
    switch (type) {
      case 'selfie':
        setSelfieImage(null);
        await AsyncStorage.removeItem('selfieImage');
        break;
      case 'ktp':
        setKtpImage(null);
        await AsyncStorage.removeItem('ktpImage');
        break;
      case 'free':
        setFreeImage(null);
        await AsyncStorage.removeItem('freeImage');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title='Registrasi Foto' />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('selfie')}>
            <Text style={styles.label}>Foto Selfie</Text>
            {selfieImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selfieImage }} style={styles.imagePreview} />
                <TouchableOpacity onPress={() => handleReupload('selfie')} style={styles.reuploadButton}>
                  <Icon name="refresh" size={20} color="#fff" />
                  <Text style={styles.reuploadText}>Reupload</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Icon name="camera" size={50} color="#888" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('ktp')}>
            <Text style={styles.label}>Foto KTP</Text>
            {ktpImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: ktpImage }} style={styles.imagePreview} />
                <TouchableOpacity onPress={() => handleReupload('ktp')} style={styles.reuploadButton}>
                  <Icon name="refresh" size={20} color="#fff" />
                  <Text style={styles.reuploadText}>Reupload</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Icon name="id-card" size={50} color="#888" />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadArea} onPress={() => pickImage('free')}>
            <Text style={styles.label}>Foto Bebas</Text>
            {freeImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: freeImage }} style={styles.imagePreview} />
                <TouchableOpacity onPress={() => handleReupload('free')} style={styles.reuploadButton}>
                  <Icon name="refresh" size={20} color="#fff" />
                  <Text style={styles.reuploadText}>Reupload</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Icon name="image" size={50} color="#888" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  uploadArea: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  reuploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reuploadText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default RegisterClaimPhoto;
