import React, { useState, useEffect } from 'react';
import BottomNavBar from "./BottomNavBar";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { router } from 'expo-router';

// Define props if you're using native stack
type RootStackParamList = {
  ExpenseHistory: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ExpenseHistory'>;

type ExpenseItem = {
  id: number;
  category: string;
  description: string;
  amount: number;
  time: string;
  paymentMethod: string;
  icon: string;
  color: string;
};

type ExpenseSections = {
  [key: string]: ExpenseItem[];
};

const ExpenseHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const expenseData: ExpenseSections = {
    Today: [
      {
        id: 1,
        category: 'Shopping',
        description: 'Grocery shopping',
        amount: 450,
        time: '2:30 PM',
        paymentMethod: 'Credit Card',
        icon: 'shopping-bag',
        color: '#3b82f6',
      },
      {
        id: 2,
        category: 'Food',
        description: 'Lunch with friends',
        amount: 120,
        time: '1:15 PM',
        paymentMethod: 'Cash',
        icon: 'restaurant',
        color: '#22c55e',
      },
    ],
    Yesterday: [
      {
        id: 3,
        category: 'Transport',
        description: 'Taxi fare',
        amount: 80,
        time: '5:45 PM',
        paymentMethod: 'Digital Wallet',
        icon: 'directions-car',
        color: '#f59e0b',
      },
      {
        id: 4,
        category: 'Home',
        description: 'Monthly rent',
        amount: 2500,
        time: '10:00 AM',
        paymentMethod: 'Bank Transfer',
        icon: 'home',
        color: '#ef4444',
      },
    ],
    'This Week': [
      {
        id: 5,
        category: 'Shopping',
        description: 'Electronics',
        amount: 750,
        time: 'Mon, 3:20 PM',
        paymentMethod: 'Credit Card',
        icon: 'shopping-cart',
        color: '#3b82f6',
      },
      {
        id: 6,
        category: 'Entertainment',
        description: 'Gaming subscription',
        amount: 300,
        time: 'Mon, 1:00 PM',
        paymentMethod: 'Digital Wallet',
        icon: 'videogame-asset',
        color: '#8b5cf6',
      },
    ],
    Earlier: [
      {
        id: 7,
        category: 'Food',
        description: 'Coffee shop',
        amount: 150,
        time: '15 Jun',
        paymentMethod: 'Credit Card',
        icon: 'local-cafe',
        color: '#22c55e',
      },
      {
        id: 8,
        category: 'Travel',
        description: 'Flight tickets',
        amount: 12000,
        time: '10 Jun',
        paymentMethod: 'Bank Transfer',
        icon: 'flight',
        color: '#f97316',
      },
    ],
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getPaymentMethodIcon = (method: string): string => {
    switch (method) {
      case 'Credit Card':
        return 'credit-card';
      case 'Cash':
        return 'money';
      case 'Digital Wallet':
        return 'account-balance-wallet';
      case 'Bank Transfer':
        return 'account-balance';
      default:
        return 'payment';
    }
  };

  const renderExpenseItem = (expense: ExpenseItem, index: number) => {
    const itemAnim = new Animated.Value(0);

    Animated.timing(itemAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        key={expense.id}
        style={[
          styles.expenseItem,
          {
            opacity: itemAnim,
            transform: [
              {
                translateY: itemAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity style={styles.expenseContent}>
          <View style={[styles.categoryIcon, { backgroundColor: expense.color }]}>
            <Icon name={expense.icon} size={20} color="white" />
          </View>

          <View style={styles.expenseDetails}>
            <Text style={styles.categoryName}>{expense.category}</Text>
            <Text style={styles.expenseDescription}>{expense.description}</Text>
            {/* <View style={styles.paymentMethodContainer}>
              <Icon name={getPaymentMethodIcon(expense.paymentMethod)} size={12} color="#999" />
              <Text style={styles.paymentMethodText}>{expense.paymentMethod}</Text>
            </View> */}
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.expenseAmount}>₹{expense.amount}</Text>
            <Text style={styles.expenseTime}>{expense.time}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderSection = (sectionTitle: string, expenses: ExpenseItem[]) => (
    <View key={sectionTitle} style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {expenses.map((expense, index) => renderExpenseItem(expense, index))}
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
  <Icon name="arrow-back" size={24} color="#333" />
</TouchableOpacity>

        <Text style={styles.headerTitle}>Expense History</Text>
        {/* <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={24} color="#333" />
        </TouchableOpacity> */}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {Object.entries(expenseData).map(([sectionTitle, expenses]) =>
          renderSection(sectionTitle, expenses)
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.summaryFooter}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Expenses</Text>
          <Text style={styles.summaryAmount}>
            ₹
            {Object.values(expenseData)
              .flat()
              .reduce((sum, expense) => sum + expense.amount, 0)
              .toLocaleString()}
          </Text>
        </View>
      </View>
       <BottomNavBar />
    </Animated.View>
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
    height: 60,
    marginTop:35,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    
    padding: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
    flex: 1,
    marginRight:39,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    paddingLeft: 4,
  },
  expenseItem: {
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  expenseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  expenseDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  expenseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 4,
  },
  expenseTime: {
    fontSize: 12,
    color: '#999',
  },
  summaryFooter: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
   marginBottom:60,
    borderTopColor: '#e5e7eb',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
  },
  bottomPadding: {
    height: 20,
  },
});

export default ExpenseHistoryScreen;