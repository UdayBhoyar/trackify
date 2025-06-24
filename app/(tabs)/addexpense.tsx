import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const AddExpenseScreen = () => {
  const router = useRouter();

  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Proper use of Animated.Value with useRef
  const buttonScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const categories = [
  { id: 'food', name: 'Food', icon: 'restaurant', color: '#22c55e' },
  { id: 'transport', name: 'Transport', icon: 'directions-car', color: '#f59e0b' },
  { id: 'shopping', name: 'Shopping', icon: 'shopping-cart', color: '#3b82f6' },
  { id: 'bills', name: 'Bills', icon: 'home', color: '#ef4444' },
  { id: 'health', name: 'Health', icon: 'favorite', color: '#e11d48' },
  { id: 'entertainment', name: 'Entertainment', icon: 'movie', color: '#ec4899' }, // <-- Added
  { id: 'other', name: 'Other', icon: 'work', color: '#8b5cf6' },
];


  const paymentMethods = ['Cash', 'Card', 'UPI', 'Bank Transfer'];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleAmountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    setAmount(numericValue);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const validateAndSave = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      category: selectedCategory,
      description: description.trim(),
      date: date.toISOString(),
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    console.log('Saving expense:', expenseData);

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Alert.alert('Success', 'Expense saved successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
      <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
  <Icon name="arrow-back" size={24} color="#333" />
</TouchableOpacity>

          <Text style={styles.headerTitle}>Add Expense</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>

          {/* Category */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.id && styles.selectedCategory,
                    { borderColor: category.color },
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Icon name={category.icon} size={24} color="white" />
                    {selectedCategory === category.id && (
                      <View style={styles.checkIcon}>
                        <Icon name="done" size={14} color="white" />
                      </View>
                    )}
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date</Text>
            <TouchableOpacity style={styles.dateContainer} onPress={() => setShowDatePicker(true)}>
              <Icon name="calendar-today" size={20} color="#666" />
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </TouchableOpacity>
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Add notes (optional)"
              placeholderTextColor="#999"
              multiline
              maxLength={100}
            />
          </View>
        </ScrollView>

        {/* Save/Cancel */}
        <View style={styles.bottomContainer}>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity style={styles.saveButton} onPress={validateAndSave}>
              <Text style={styles.saveButtonText}>Save Expense</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop:50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    flex:1,
    textAlign: 'center',
    marginRight: 16,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  selectedCategory: {
    borderWidth: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#16a34a',
    borderRadius: 10,
    padding: 2,
    zIndex: 1,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  notesInput: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default AddExpenseScreen;
