import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Switch,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router } from 'expo-router';

type RootStackParamList = {
  AccountSettings: undefined;
  Login: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

type ProfileOption = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  onPress?: () => void;
  hasSwitch?: boolean;
  switchValue?: boolean;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
  });

  // Remember currency selection here:
  const [settings, setSettings] = useState({
    currency: 'INR',
    theme: 'Light',
    appLock: false,
    biometric: false,
  });

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const currencies: Currency[] = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  ];

  const handleCurrencySelect = (currency: Currency) => {
    console.log(`Currency selected: ${currency.code} - ${currency.name}`);
    setSettings(prev => ({ ...prev, currency: currency.code })); // Update currency state
    setShowCurrencyModal(false);
  };

  const handleThemePress = () => {
    console.log('Theme settings pressed');
    Alert.alert('Theme Settings', 'Choose your preferred theme', [
      { text: 'Light', onPress: () => console.log('Theme set to Light') },
      { text: 'Dark', onPress: () => console.log('Theme set to Dark') },
      { text: 'System', onPress: () => console.log('Theme set to System') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleBackupPress = () => {
    console.log('Backup pressed');
    Alert.alert('Data Backup', 'Choose backup option', [
      { text: 'Backup to Cloud', onPress: () => console.log('Cloud backup') },
      { text: 'Local Backup', onPress: () => console.log('Local backup') },
      { text: 'Restore Data', onPress: () => console.log('Restore data') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleExportPress = () => {
    console.log('Export pressed');
    Alert.alert('Export Data', 'Choose export format', [
      { text: 'Export as CSV', onPress: () => console.log('Export CSV') },
      { text: 'Export as PDF', onPress: () => console.log('Export PDF') },
      { text: 'Email Report', onPress: () => console.log('Email report') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleAppLockPress = () => {
    console.log('App Lock toggled');
    Alert.alert('App Lock', 'Feature toggled (dummy)');
  };

  const handleAboutPress = () => {
    console.log('About pressed');
    Alert.alert(
      'About Trackify',
      'Trackify - Personal Expense Tracker\n\nVersion: 1.0.0\nDeveloped with ❤️\n\n© 2024 Trackify. All rights reserved.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          console.log('User logged out');
          // navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  const profileOptions: ProfileOption[] = [
    {
      id: 'currency',
      title: 'Currency Settings',
      subtitle: `${settings.currency} - ${currencies.find(c => c.code === settings.currency)?.symbol}`,
      icon: 'attach-money',
      onPress: () => setShowCurrencyModal(true),
    },
    {
      id: 'account',
      title: 'Account',
      subtitle: 'Manage your account settings',
      icon: 'person',
      onPress: () => console.log('Navigate to Account Settings (not implemented)'),
    },
    {
      id: 'theme',
      title: 'Theme',
      subtitle: settings.theme,
      icon: 'palette',
      onPress: handleThemePress,
    },
    {
      id: 'backup',
      title: 'Data Backup & Restore',
      subtitle: 'Backup your expense data',
      icon: 'cloud-upload',
      onPress: handleBackupPress,
    },
    {
      id: 'export',
      title: 'Export Data',
      subtitle: 'Export expenses to CSV/PDF',
      icon: 'file-download',
      onPress: handleExportPress,
    },
    {
      id: 'applock',
      title: 'App Lock',
      subtitle: 'Secure your app with PIN/Biometric',
      icon: 'lock',
      onPress: handleAppLockPress,
      hasSwitch: true,
      switchValue: settings.appLock,
    },
    {
      id: 'about',
      title: 'About Trackify',
      subtitle: 'Version 1.0.0',
      icon: 'info',
      onPress: handleAboutPress,
    },
  ];

  const renderProfileOption = (option: ProfileOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionItem}
      onPress={option.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <View style={styles.optionIcon}>
          <Icon name={option.icon} size={20} color="#666" />
        </View>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
        </View>
      </View>

      <View style={styles.optionRight}>
        {option.hasSwitch ? (
          <Switch
            value={option.switchValue}
            onValueChange={handleAppLockPress}
            trackColor={{ false: '#e5e7eb', true: '#22c55e' }}
            thumbColor={option.switchValue ? '#ffffff' : '#f4f3f4'}
          />
        ) : (
          <Icon name="chevron-right" size={20} color="#ccc" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)')}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Icon name="edit" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="person" size={40} color="#999" />
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {profileOptions.map(renderProfileOption)}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Currency Modal */}
      <Modal
        visible={showCurrencyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity
                onPress={() => setShowCurrencyModal(false)}
                style={styles.modalCloseButton}
              >
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.currencyList}>
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.code}
                  style={[
                    styles.currencyItem,
                    settings.currency === currency.code && styles.selectedCurrency,
                  ]}
                  onPress={() => handleCurrencySelect(currency)}
                >
                  <Text style={styles.currencySymbol}>{currency.symbol}</Text>
                  <View style={styles.currencyInfo}>
                    <Text style={styles.currencyName}>{currency.name}</Text>
                    <Text style={styles.currencyCode}>{currency.code}</Text>
                  </View>
                  {settings.currency === currency.code && (
                    <Icon name="check" size={20} color="#22c55e" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  optionsContainer: {
    backgroundColor: 'white',
    marginBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  optionRight: {
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalCloseButton: {
    padding: 4,
  },
  currencyList: {
    paddingHorizontal: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  selectedCurrency: {
    backgroundColor: '#f0fdf4',
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    width: 40,
    textAlign: 'center',
    marginRight: 12,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  currencyCode: {
    fontSize: 12,
    color: '#666',
  },
});

export default ProfileScreen;
