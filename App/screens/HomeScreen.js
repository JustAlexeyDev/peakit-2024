import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import Banner from '../components/Banner';
import FeedItem from '../components/FeedItem';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categories}>
          <CategoryCard title="Pizza" />
          <CategoryCard title="Burgers" />
          <CategoryCard title="Sushi" />
          <CategoryCard title="Salads" />
        </View>
        <Text style={styles.sectionTitle}>Banners</Text>
        <View style={styles.banners}>
          <Banner />
          <Banner />
        </View>
        <Text style={styles.sectionTitle}>Feed</Text>
        <View style={styles.feed}>
          <FeedItem title="Special Offer" description="20% off on all pizzas!" />
          <FeedItem title="New Arrival" description="Try our new sushi rolls!" />
        </View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  banners: {
    paddingHorizontal: 16,
  },
  feed: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;