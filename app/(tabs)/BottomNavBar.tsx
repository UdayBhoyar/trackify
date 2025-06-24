import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Target, Plus, History, User } from "lucide-react-native";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push("/")}>
        <Home color={isActive("/") ? "#16a34a" : "#6b7280"} size={24} />
        <Text style={[styles.navText, { color: isActive("/") ? "#16a34a" : "#6b7280" }]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton} >
        <Target color={isActive("/goals") ? "#16a34a" : "#6b7280"} size={24} />
        <Text style={[styles.navText, { color: isActive("/goals") ? "#16a34a" : "#6b7280" }]}>
          Goals
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.navButtonCenter]}
        onPress={() => router.push("/addexpense")}
      >
        <Plus color="white" size={28} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => router.push("/ExpenseHistory")}
      >
        <History color={isActive("/ExpenseHistory") ? "#16a34a" : "#6b7280"} size={24} />
        <Text
          style={[styles.navText, { color: isActive("/ExpenseHistory") ? "#16a34a" : "#6b7280" }]}
        >
          History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}
      onPress={() => router.push("/ProfileScreen")}>
        <User color={isActive("/profile") ? "#16a34a" : "#6b7280"} size={24} />
        <Text style={[styles.navText, { color: isActive("/profile") ? "#16a34a" : "#6b7280" }]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// (styles same as before)


const styles = StyleSheet.create({
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
});
