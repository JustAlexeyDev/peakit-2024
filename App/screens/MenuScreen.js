import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Menu Screen</Text>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MenuScreen;