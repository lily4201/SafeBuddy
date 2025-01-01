import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Alert } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  
  const [fontsLoaded] = useFonts({
    'HammersmithOne': require('../../assets/fonts/Hammersmith_One/HammersmithOne-Regular.ttf'),
    'HindVadodara': require('../../assets/fonts/Hind_Vadodara/HindVadodara-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGPSPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setStep(1);
      } else {
        Alert.alert(
          'Permission Required',
          'GPS access is needed for safety features',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const handleNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        router.push('/features');
      } else {
        Alert.alert(
          'Permission Required',
          'Notifications are needed for safety alerts',
          [
            { 
              text: 'Skip', 
              onPress: () => router.push('/features')
            },
            { 
              text: 'Try Again', 
              onPress: handleNotificationPermission 
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/safebuddy-logo.png')}
        style={styles.logo}
        contentFit="contain"
      />
      
      {step === 0 && (
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>What is</Text>
            <Text style={styles.titlePink}>SafeBuddy</Text>
          </View>
          <Text style={styles.description}>
            SafeBuddy is a universal platform for sexual misconduct prevention
          </Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.permissionText}>
              Please allow full access to GPS info so that you can swiftly report cases in case of emergency
            </Text>
            <Text style={styles.promise}>
              We, SafeBuddy, promise to not exploit this data
            </Text>
            <Pressable
              style={styles.button}
              onPress={handleGPSPermission}
            >
              <Text style={styles.buttonText}>Agree to GPS info</Text>
            </Pressable>
          </View>
        </View>
      )}

      {step === 1 && (
        <View style={styles.content}>
          <View style={styles.stepIndicator}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.description}>
            If you would like personalized notifications of your nearest danger hot spots, please agree to the notifications
          </Text>
          <Pressable
            style={styles.button}
            onPress={handleNotificationPermission}
          >
            <Text style={styles.buttonText}>Agree to notifications</Text>
          </Pressable>
          <Pressable onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.skipText}>Skip for now</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD6D6',
    padding: 20,
  },
  logo: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'HammersmithOne',
    color: '#000',
  },
  titlePink: {
    fontSize: 32,
    fontFamily: 'HammersmithOne',
    color: '#FF7B7E',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'HindVadodara',
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'HindVadodara',
    color: '#333',
  },
  promise: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'HindVadodara',
    color: '#666',
  },
  button: {
    backgroundColor: '#FF7B7E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: width * 0.8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'HindVadodara',
    fontWeight: '600',
  },
  skipText: {
    color: '#FF7B7E',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'HindVadodara',
  },
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF7B7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'HammersmithOne',
  },
});

export default OnboardingScreen; 