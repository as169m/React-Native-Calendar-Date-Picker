import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomCalendarModal from "./src/CalendarModal"; // Adjust the import path as necessary

const CalendarScreen = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Date: {selectedDate || "None"}</Text>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setCalendarVisible(true)}
      >
        <Text style={styles.openText}>Pick a Date</Text>
      </TouchableOpacity>

      <CustomCalendarModal
        visible={isCalendarVisible}
        onClose={() => setCalendarVisible(false)}
        onDateSelect={(date) => setSelectedDate(date)}
      />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  openButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  openText: {
    color: "#fff",
    fontSize: 16,
  },
});
