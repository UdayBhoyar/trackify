import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import BottomNavBar from "./BottomNavBar";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Plus,
  Target,
  Download,
  FileText,
  Home,
  BarChart3,
  History,
  User,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Zap,
  MoreHorizontal,
} from "lucide-react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

// Type for category data
type DataItem = {
  name: string;
  amount: number;
  color: string;
  icon: React.ComponentType<{ color: string; size: number }>;
};

// Pie chart component
type CustomPieChartProps = {
  data: DataItem[];
  radius: number;
  strokeWidth: number;
  gap: number;
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  radius,
  strokeWidth,
  gap,
}) => {
  const center = radius + strokeWidth / 2;
  let cumulativePercentage = 0;

  return (
    <View>
      <Svg height={center * 2} width={center * 2}>
        {data.map((item, index) => {
          const totalAmount = data.reduce(
            (sum, item) => sum + item.amount,
            0
          );
          const slicePercentage = (item.amount / totalAmount) * 100;
          const startAngle = cumulativePercentage * 3.6;
          let endAngle = (cumulativePercentage + slicePercentage) * 3.6;
          endAngle -= gap;
          cumulativePercentage += slicePercentage;

          const startRadians = (startAngle - 90) * (Math.PI / 180);
          const endRadians = (endAngle - 90) * (Math.PI / 180);

          const x1 = center + radius * Math.cos(startRadians);
          const y1 = center + radius * Math.sin(startRadians);
          const x2 = center + radius * Math.cos(endRadians);
          const y2 = center + radius * Math.sin(endRadians);

          const largeArcFlag = slicePercentage > 50 ? 1 : 0;
          const pathData = [
            `M ${center},${center}`,
            `L ${x1},${y1}`,
            `A ${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2}`,
            "Z",
          ].join(" ");

          return (
            <G key={index}>
              <Path
                d={pathData}
                fill="white"
                stroke={item.color}
                strokeWidth={strokeWidth}
              />
            </G>
          );
        })}
        <Circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="white"
        />
      </Svg>
    </View>
  );
};

const categoryData: DataItem[] = [
  { name: "Food", amount: 4500, color: "#22c55e", icon: UtensilsCrossed },
  { name: "Transport", amount: 3500, color: "#f59e0b", icon: Car },
  { name: "Shopping", amount: 2500, color: "#3b82f6", icon: ShoppingBag },
  { name: "Others", amount: 1850, color: "#8b5cf6", icon: MoreHorizontal },
  { name: "Bills", amount: 1000, color: "#ef4444", icon: Zap },
];

const recentTransactions = [
  {
    id: 1,
    category: "Food",
    description: "Lunch at cafe",
    amount: 450,
    date: "Today",
    icon: UtensilsCrossed,
    color: "#22c55e",
  },
  {
    id: 2,
    category: "Transport",
    description: "Uber ride",
    amount: 200,
    date: "Today",
    icon: Car,
    color: "#f59e0b",
  },
  {
    id: 3,
    category: "Shopping",
    description: "Grocery shopping",
    amount: 850,
    date: "Yesterday",
    icon: ShoppingBag,
    color: "#3b82f6",
  },
  {
    id: 4,
    category: "Bills",
    description: "Electricity bill",
    amount: 1200,
    date: "2 days ago",
    icon: Zap,
    color: "#ef4444",
  },
];

const weeklyData = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 800 },
  { day: "Wed", amount: 1500 },
  { day: "Thu", amount: 900 },
  { day: "Fri", amount: 2100 },
  { day: "Sat", amount: 1800 },
  { day: "Sun", amount: 1400 },
];

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const size = 48;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference * ((100 - percentage) / 100);

  return (
    <View style={{ position: "absolute", top: 16, right: 16 }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#d1fae5"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#16a34a"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progress}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#15803d", fontWeight: "700", fontSize: 14 }}>
          {Math.round(percentage)}%
        </Text>
      </View>
    </View>
  );
};

export default function Index() {
  const router = useRouter();

  const totalSpent = 12350;
  const budget = 19000;
  const budgetUsed = (totalSpent / budget) * 100;

  const maxWeeklyAmount = Math.max(...weeklyData.map((d) => d.amount));
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    const heights = weeklyData.map(
      (day) => (day.amount / maxWeeklyAmount) * 100 + Math.random() * 5
    );
    setBarHeights(heights);
  }, []);

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.headerGreetingText}>Hello User!</Text>
        <Text style={styles.headerSummaryText}>Here's your spending summary</Text>

        <View style={styles.card}>
          <CircularProgress percentage={budgetUsed} />

          <Text style={styles.headerSubText}>Total Spent This Month</Text>
          <Text style={styles.headerAmount}>₹{totalSpent.toLocaleString()}</Text>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${Math.min(budgetUsed, 100)}%` }]} />
          </View>

          <Text style={styles.progressText}>
            ₹{totalSpent.toLocaleString()} of ₹{budget.toLocaleString()} budget used
          </Text>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => router.push("./addexpense")}
          >
            <Plus color="white" size={16} />
            <Text style={styles.buttonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
            <Target color="#4b5563" size={16} />
            <Text style={[styles.buttonText, { color: "#4b5563" }]}>View Goals</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
            <Download color="#4b5563" size={16} />
            <Text style={[styles.buttonText, { color: "#4b5563" }]}>Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
            <FileText color="#4b5563" size={16} />
            <Text style={[styles.buttonText, { color: "#4b5563" }]}>Invoices</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Category Breakdown</Text>
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            <CustomPieChart data={categoryData} radius={80} strokeWidth={10} gap={12} />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            {categoryData.map((cat) => (
              <View
                key={cat.name}
                style={{ flexDirection: "row", alignItems: "center", margin: 6 }}
              >
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: cat.color,
                    marginRight: 6,
                  }}
                />
                <Text style={{ fontSize: 12 }}>
                  {cat.name} - ₹{cat.amount.toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Overview</Text>
          <View style={styles.weeklyChart}>
            {weeklyData.map((day, index) => (
              <TouchableOpacity
                key={day.day}
                style={styles.weeklyBarContainer}
                onPress={() => handleDayPress(day.day)}
              >
                <View style={styles.weeklyBarWrapper}>
                  <View
                    style={[
                      styles.weeklyBar,
                      {
                        height: Math.min(barHeights[index], 80),
                        backgroundColor: "#16a34a",
                      },
                    ]}
                  />
                  <Text style={styles.weeklyAmount}>₹{day.amount}</Text>
                </View>
                <Text style={styles.weeklyDay}>{day.day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Transactions</Text>
          {recentTransactions.map((t) => {
            const IconComponent = t.icon;
            return (
              <View key={t.id} style={styles.transactionRow}>
                <View style={[styles.iconCircle, { backgroundColor: `${t.color}33` }]}>
                  <IconComponent color={t.color} size={20} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.transactionCategory}>{t.category}</Text>
                  <Text style={styles.transactionDescription}>{t.description}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.transactionAmount}>₹{t.amount}</Text>
                  <Text style={styles.transactionDate}>{t.date}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Home color="#16a34a" size={24} />
          <Text style={[styles.navText, { color: "#16a34a" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Target color="#6b7280" size={24} />
          <Text style={[styles.navText, { color: "#6b7280" }]}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonCenter]}
          onPress={() => router.push("./addexpense")}
        >
          <Plus color="white" size={28} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}
        onPress={() => router.push("./ExpenseHistory")}>
          <History color="#6b7280" size={24} />
          <Text style={[styles.navText, { color: "#6b7280" }]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <User color="#6b7280" size={24} />
          <Text style={[styles.navText, { color: "#6b7280" }]}>Profile</Text>
        </TouchableOpacity>
      </View> */}
       <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", paddingTop: 40 },
  headerSubText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 4,
  },
  headerAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    justifyContent: "center",
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: "#16a34a",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#6b7280",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    position: "relative",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  progressBarBackground: {
    height: 12,
    width: "100%",
    backgroundColor: "#d1fae5",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#16a34a",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  weeklyChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 150,
    alignItems: "flex-end",
    paddingTop: 20,
  },
  weeklyBarContainer: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  weeklyBarWrapper: {
    alignItems: "center",
    marginBottom: 4,
  },
  weeklyBar: {
    width: 20,
    borderRadius: 4,
    minHeight: 8,
    marginBottom: 4,
  },
  weeklyAmount: {
    fontSize: 12,
    color: "#16a34a",
    marginBottom: 4,
  },
  weeklyDay: {
    fontSize: 12,
    color: "#6b7280",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionCategory: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },
  transactionDescription: {
    fontSize: 12,
    color: "#6b7280",
  },
  transactionAmount: {
    fontWeight: "700",
    fontSize: 16,
    color: "#111827",
  },
  transactionDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonCenter: {
    backgroundColor: "#16a34a",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
  },
  headerGreetingText: {
    fontSize: 30,
    marginLeft: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  headerSummaryText: {
    fontSize: 16,
    marginLeft: 20,
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: 8,
  },
});
