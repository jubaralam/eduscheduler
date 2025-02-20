/* eslint-disable no-unused-vars */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  courses: [],
  assignCourse: {},
  instructors: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload.user;
      const token = action.payload.token;
      state.user = user;
      state.token = token;
    },
    removeUser: (state, action) => {
      state.user = {};
      state.token = "";
      state.courses = {};
    },
    addCourses: (state, action) => {
      state.courses = action.payload.courses;
    },
    addAssignCourse: (state, action) => {
      state.assignCourse = state.courses.filter(
        (course) => course._id === action.payload.id
      );
    },
    addInstructors: (state, action) => {
      state.instructors = action.payload.instructors;
    },
  },
});

export const {
  addUser,
  removeUser,
  addCourses,
  addAssignCourse,
  addInstructors,
} = userSlice.actions;

export default userSlice.reducer;
