import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const features = [
  {
    title: 'THE MAP',
    image: require('../../assets/images/themapscreen.png'),
    description: 'Identify where sexual violence occurs most frequently in public, and find out which streets you should avoid. Keep yourself and the city safe with this digital map. 🗺️📱',
  },
  {
    title: 'THE REPORTING SYSTEM',
    image: require('../../assets/images/reportscreen.png'),
    description: 'The report system allows victims and witnesses to inform sexual violence. Just answer a few questions to complete your report. 📝✏️▶️',
  },
  {
    title: 'THE SAFEBUDDY NEWS',
    image: require('../../assets/images/newsscreen.png'),
    description: 'Keep up with the latest information that you never want to miss on international anniversaries and events on this page. 🗞️👥',
  },
  {
    title: 'THE SOS BUTTON',
    image: require('../../assets/images/sosscreen.png'),
    description: 'A simple shake of your phone or the press of the button activates the SOS button. Immediately report sexual violence. 🆘🆘',
  },
];

const FeaturesScreen = () => {
  const [fontsLoaded] = useFonts({
    'HammersmithOne': require('../../assets/fonts/Hammersmith_One/HammersmithOne-Regular.ttf'),
    'HindVadodara': require('../../assets/fonts/Hind_Vadodara/HindVadodara-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require('../../assets/images/safebuddy-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Hi!</Text>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.titlePink}>SafeBuddy</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>
          Swipe to get an explanation for the main features!
        </Text>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {features.map((feature, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.contentWrapper}>
              <View style={styles.phoneImageContainer}>
                <Image
                  source={feature.image}
                  style={styles.phoneImage}
                  contentFit="contain"
                />
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </View>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={styles.startButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.startButtonText}>START</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6D6',
  },
  header: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  welcomeContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'HammersmithOne',
    color: '#000',
  },
  titlePink: {
    fontSize: 32,
    fontFamily: 'HammersmithOne',
    color: '#FF7B7E',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'HindVadodara',
    textAlign: 'center',
    color: '#333',
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    padding: 20,
    alignItems: 'center',
  },
  contentWrapper: {
    backgroundColor: 'rgba(255, 123, 126, 0.1)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  phoneImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  phoneImage: {
    width: width * 0.35,
    height: width * 0.5,
  },
  featureTitle: {
    flex: 1,
    fontSize: 36,
    fontFamily: 'HammersmithOne',
    color: '#000',
    paddingLeft: 20,
  },
  featureDescription: {
    fontSize: 16,
    fontFamily: 'HindVadodara',
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#FF7B7E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'HammersmithOne',
  },
});

export default FeaturesScreen; 