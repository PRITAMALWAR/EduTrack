import React, { createContext, useContext, useReducer } from 'react';
import { mockUsers, mockCourses, mockEnrollments } from '../data/mockData';

const initialState = {
  auth: {
    user: null,
    isAuthenticated: false
  },
  courses: mockCourses,
  enrollments: mockEnrollments,
  filters: {
    category: 'All Categories',
    difficulty: 'All Levels',
    minPrice: 0,
    maxPrice: 200,
    minRating: 0
  },
  sort: {
    field: 'createdAt',
    direction: 'desc'
  },
  currentPage: 1
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: true
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false
        }
      };
    case 'ADD_COURSE':
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case 'UPDATE_COURSE':
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.id ? action.payload : course
        )
      };
    case 'DELETE_COURSE':
      return {
        ...state,
        courses: state.courses.filter(course => course.id !== action.payload)
      };
    case 'ENROLL_COURSE':
      const newEnrollment = {
        id: Date.now().toString(),
        studentId: action.payload.studentId,
        courseId: action.payload.courseId,
        progress: 0,
        enrolledAt: new Date().toISOString()
      };
      return {
        ...state,
        enrollments: [...state.enrollments, newEnrollment],
        courses: state.courses.map(course =>
          course.id === action.payload.courseId
            ? { ...course, enrolledStudents: course.enrolledStudents + 1 }
            : course
        )
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
        currentPage: 1
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext(null);

// Context provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

export { mockUsers };
