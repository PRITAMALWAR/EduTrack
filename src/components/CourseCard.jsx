import React from 'react';
import { Star, Clock, Users, Edit, Trash2, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function CourseCard({ course, onViewDetails, setCurrentView }) {
  const { state, dispatch } = useAppContext();

  const isEnrolled = state.enrollments.some(
    (e) => e.studentId === state.auth.user?.id && e.courseId === course.id
  );

  const isOwnCourse =
    state.auth.user?.role === 'instructor' &&
    course.instructorId === state.auth.user?.id;

  const handleEnroll = (e) => {
    e.stopPropagation();

    if (!state.auth.isAuthenticated) {
      alert('Please sign in to enroll in courses');
      return;
    }

    if (state.auth.user?.role !== 'student') {
      alert('Only students can enroll in courses');
      return;
    }

    dispatch({
      type: 'ENROLL_COURSE',
      payload: { studentId: state.auth.user.id, courseId: course.id },
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this course?')) {
      dispatch({ type: 'DELETE_COURSE', payload: course.id });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
              course.difficulty
            )}`}
          >
            {course.difficulty}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
        </div>
        {isOwnCourse && (
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert('Edit functionality would be implemented here');
              }}
              className="p-2 bg-white bg-opacity-90 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-white bg-opacity-90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {course.title}
        </h3>

        <p className="text-gray-600 mb-4 text-sm line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-medium">
              {course.instructor.charAt(0)}
            </span>
          </div>
          <span className="text-gray-700 font-medium">{course.instructor}</span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.enrolledStudents}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="text-gray-500 text-xs font-medium">
              +{course.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-blue-600">${course.price}</div>

          <div className="flex space-x-2">
            <button
              onClick={onViewDetails}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium"
            >
              Details
            </button>

            {!isOwnCourse && (
              <button
                onClick={handleEnroll}
                disabled={isEnrolled}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isEnrolled
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-md hover:shadow-lg'
                }`}
              >
                {isEnrolled ? (
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Enrolled</span>
                  </div>
                ) : (
                  'Enroll Now'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
