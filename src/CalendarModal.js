import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CalendarModal = ({ visible, onClose, onDateSelect }) => {
  const [selected, setSelected] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (date) => {
    setCurrentDate(new Date(date.year, date.month - 1, 1));
  };

  const changeYear = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + offset);
    setCurrentDate(newDate);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Header with Year Controls */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => changeYear(-1)}>
              <Text style={styles.yearButton}>◀ Year</Text>
            </TouchableOpacity>
            <Text style={styles.currentYear}>{currentDate.getFullYear()}</Text>
            <TouchableOpacity onPress={() => changeYear(1)}>
              <Text style={styles.yearButton}>Year ▶</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar */}
          <Calendar
            current={currentDate.toISOString().split("T")[0]}
            onDayPress={(day) => {
              setSelected(day.dateString);
              onDateSelect(day.dateString);
              onClose();
            }}
            markedDates={{
              [selected]: { selected: true, selectedColor: "#007BFF" },
            }}
            onMonthChange={handleMonthChange}
            enableSwipeMonths
            theme={{
              selectedDayBackgroundColor: "#007BFF",
              arrowColor: "#007BFF",
              todayTextColor: "#FF5722",
            }}
          />

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  yearButton: {
    fontSize: 16,
    color: "#007BFF",
  },
  currentYear: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeText: {
    color: "red",
    fontSize: 16,
  },
});
