import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './stylesForm';

interface CardFormProps {
  onSubmit: (formData: any) => void;
}

const locationData = [
  {
    province: 'DKI Jakarta',
    cities: [
      {
        city: 'Jakarta Selatan',
        districts: [
          {
            district: 'Setiabudi',
            subDistricts: ['Karet', 'Kuningan']
          },
          {
            district: 'Kebayoran Baru',
            subDistricts: ['Gandaria', 'Blok M']
          }
        ]
      }
    ]
  },
  {
    province: 'Jawa Barat',
    cities: [
      {
        city: 'Bandung',
        districts: [
          {
            district: 'Coblong',
            subDistricts: ['Dago', 'Lebak Siliwangi']
          },
          {
            district: 'Sukajadi',
            subDistricts: ['Pasteur', 'Cipedes']
          }
        ]
      }
    ]
  }
];

const statusOptions = [
  { label: 'Pekerja', value: 'Pekerja' },
  { label: 'Pelajar', value: 'Pelajar' },
  { label: 'Pengusaha', value: 'Pengusaha' },
  { label: 'Lain-lain', value: 'Lain-lain' }
];

const CardForm: React.FC<CardFormProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [biodata, setBiodata] = useState('');
  const [status, setStatus] = useState('Lain-lain');
  const [date, setDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [subDistrict, setSubDistrict] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleSubmit = () => {
    const formData = {
      firstName,
      lastName,
      biodata,
      status,
      date,
      province,
      city,
      district,
      subDistrict,
    };
    onSubmit(formData);
  };

  const getProvinces = () => {
    return locationData.map(item => ({ label: item.province, value: item.province }));
  };

  const getCities = () => {
    const selectedProvince = locationData.find(item => item.province === province);
    return selectedProvince ? selectedProvince.cities.map(item => ({ label: item.city, value: item.city })) : [];
  };

  const getDistricts = () => {
    const selectedProvince = locationData.find(item => item.province === province);
    const selectedCity = selectedProvince?.cities.find(item => item.city === city);
    return selectedCity ? selectedCity.districts.map(item => ({ label: item.district, value: item.district })) : [];
  };

  const getSubDistricts = () => {
    const selectedProvince = locationData.find(item => item.province === province);
    const selectedCity = selectedProvince?.cities.find(item => item.city === city);
    const selectedDistrict = selectedCity?.districts.find(item => item.district === district);
    return selectedDistrict ? selectedDistrict.subDistricts.map(item => ({ label: item, value: item })) : [];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nama Depan:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="input nama depan"
      />

      <Text style={styles.label}>Nama Belakang:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="input nama belakang"
      />

      <Text style={styles.label}>Biodata:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={biodata}
        onChangeText={setBiodata}
        placeholder="Enter biodata"
        multiline
      />

      <Text style={styles.label}>Status:</Text>
      <Dropdown
        style={styles.dropdown}
        data={statusOptions}
        search
        labelField="label"
        valueField="value"
        placeholder="Select status"
        value={status}
        onChange={(item) => setStatus(item.value)}
      />

      <Text style={styles.label}>Tanggal dan Waktu Kejadian:</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString() : 'Select Date and Time'}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>Provinsi:</Text>
      <Dropdown
        style={styles.dropdown}
        data={getProvinces()}
        search
        labelField="label"
        valueField="value"
        placeholder="Select province"
        value={province}
        onChange={(item) => {
          setProvince(item.value);
          setCity('');
          setDistrict('');
          setSubDistrict('');
        }}
      />

      <Text style={styles.label}>Kota:</Text>
      <Dropdown
        style={styles.dropdown}
        data={getCities()}
        search
        labelField="label"
        valueField="value"
        placeholder="Select city"
        value={city}
        onChange={(item) => {
          setCity(item.value);
          setDistrict('');
          setSubDistrict('');
        }}
      />

      <Text style={styles.label}>Kecamatan:</Text>
      <Dropdown
        style={styles.dropdown}
        data={getDistricts()}
        search
        labelField="label"
        valueField="value"
        placeholder="Select district"
        value={district}
        onChange={(item) => {
          setDistrict(item.value);
          setSubDistrict('');
        }}
      />

      <Text style={styles.label}>Kelurahan:</Text>
      <Dropdown
        style={styles.dropdown}
        data={getSubDistricts()}
        search
        labelField="label"
        valueField="value"
        placeholder="Select sub-district"
        value={subDistrict}
        onChange={(item) => setSubDistrict(item.value)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CardForm;
