import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  Text,
  View,
} from "react-native";
import Form from "../components/Form";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  id: Yup.string()
    .required()
    .matches(/(F|W|S)\d{3,}/, "Must be a term and 3-digit number")
    .label("ID"),
  meets: Yup.string()
    .required()
    .matches(
      /(M|Tu|W|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/,
      "Must be weekdays followed by start and end time"
    )
    .label("Meeting times"),
  title: Yup.string().required().label("Title"),
});

const CourseEditScreen = ({ route }) => {
  const course = route.params.course;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={
          Platform.OS === "ios" || Platform.OS === "android"
            ? styles.formContainer
            : null
        }
      >
        <Form
          initialValues={{
            id: course.id,
            meets: course.meets,
            title: course.title,
          }}
          validationSchema={validationSchema}
        >
          <Form.Field
            name="id"
            leftIcon="identifier"
            placeholder="F110"
            autoCapitalize="none"
            autoFocus={true}
          />
          <Form.Field
            name="meets"
            leftIcon="calendar-range"
            placeholder="MThu 12:00-13:50"
            autoCapitalize="none"
          />
          <Form.Field
            name="title"
            leftIcon="format-title"
            placeholder="Introduction to programming"
          />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8cd3ff",
  },
  formContainer: {
    width: "60%",
  },
});

export default CourseEditScreen;
