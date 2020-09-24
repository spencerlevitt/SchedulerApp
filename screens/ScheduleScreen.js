import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import CourseList from "../components/CourseList";
import UserContext from "../UserContext";
import { firebase } from "../firebase";

const Banner = ({ title }) => (
  <Text style={styles.bannerStyle}>{title || "[loading...]"}</Text>
);

const fixCourses = (json) => ({
  ...json,
  courses: Object.values(json.courses),
});

const ScheduleScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const canEdit = user && user.role === "admin";
  const [schedule, setSchedule] = useState({ title: "", courses: [] });

  const view = (course) => {
    navigation.navigate(canEdit ? "CourseEditScreen" : "CourseDetailScreen", {
      course,
    });
  };

  useEffect(() => {
    const db = firebase.database().ref();
    db.on(
      "value",
      (snap) => {
        if (snap.val()) setSchedule(fixCourses(snap.val()));
      },
      (error) => console.log(error)
    );
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
});

export default ScheduleScreen;
