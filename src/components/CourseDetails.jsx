import React from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  Award,
  CheckCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function CourseDetails({ course, setCurrentView }) {
  const { state, dispatch } = useAppContext();

  const isEnrolled = state.enrollments.some(
    (e) => e.studentId === state.auth.user?.id && e.courseId === course.id
  );

  const enrollment = state.enrollments.find(
    (e) => e.studentId === state.auth.user?.id && e.courseId === course.id
  );

  const handleEnroll = () => {
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
      payload: { studentId: state.auth.user.id, courseId: course.id }
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const courseModules = [
    {
      title: 'Introduction to the Course',
      duration: '15 min',
      lessons: [
        'Welcome & Course Overview',
        "What You'll Learn",
        'Prerequisites',
        'Setting Up Your Environment'
      ]
    },
    {
      title: 'Core Concepts',
      duration: '2h 30min',
      lessons: [
        'Fundamental Principles',
        'Key Terminology',
        'Best Practices',
        'Common Patterns',
        'Hands-on Exercises'
      ]
    },
    {
      title: 'Practical Applications',
      duration: '3h 15min',
      lessons: [
        'Real-world Examples',
        'Case Studies',
        'Building Your First Project',
        'Debugging Techniques',
        'Performance Optimization'
      ]
    },
    {
      title: 'Advanced Topics',
      duration: '2h 45min',
      lessons: [
        'Advanced Techniques',
        'Integration with Other Tools',
        'Scalability Considerations',
        'Security Best Practices'
      ]
    }
  ];

  const courseFeatures = [
    'Lifetime access to course materials',
    'Downloadable resources and code',
    'Interactive coding exercises',
    'Certificate of completion',
    'Direct instructor support',
    'Mobile and tablet friendly',
    '30-day money-back guarantee'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setCurrentView('courses')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Courses</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                      course.difficulty
                    )}`}
                  >
                    {course.difficulty}
                  </span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
                    {course.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center space-x-8 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-sm">
                      ({course.enrolledStudents} students)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{course.enrolledStudents} enrolled</span>
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Meet Your Instructor
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {course.instructor.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {course.instructor}
                    </h4>
                    <p className="text-gray-600">
                      Expert Instructor & Industry Professional
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>5+ years experience</span>
                      <span>•</span>
                      <span>10,000+ students taught</span>
                      <span>•</span>
                      <span>4.8 avg rating</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Course Content
                </h3>
                <div className="space-y-4">
                  {courseModules.map((module, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">
                            {index + 1}. {module.title}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {module.duration}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center space-x-3"
                            >
                              <div className="flex items-center justify-center w-6 h-6">
                                {isEnrolled ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Play className="h-4 w-4 text-gray-400" />
                                )}
                              </div>
                              <span
                                className={`text-sm ${
                                  isEnrolled
                                    ? 'text-gray-700'
                                    : 'text-gray-500'
                                }`}
                              >
                                {lesson}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  What You'll Learn
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Master the fundamental concepts and principles',
                    'Build real-world projects from scratch',
                    'Understand best practices and common patterns',
                    'Learn advanced techniques and optimization',
                    'Get hands-on experience with practical exercises',
                    'Prepare for industry certifications',
                    'Develop portfolio-worthy projects',
                    'Gain confidence to tackle complex challenges'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Skills You'll Gain
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                {/* Course Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                {/* Progress */}
                {isEnrolled && enrollment && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        Your Progress
                      </span>
                      <span className="font-bold text-blue-600">
                        {enrollment.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    {enrollment.completedAt && (
                      <div className="flex items-center space-x-2 mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <Award className="h-5 w-5 text-green-600" />
                        <span className="text-green-700 font-medium">
                          Course Completed!
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Price and Enroll */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${course.price}
                  </div>
                  <p className="text-gray-600">One-time payment</p>
                </div>

                {!isEnrolled && state.auth.user?.role !== 'instructor' && (
                  <button
                    onClick={handleEnroll}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
                  >
                    Enroll Now
                  </button>
                )}

                {isEnrolled && (
                  <button className="w-full bg-green-100 text-green-700 py-4 rounded-lg font-bold text-lg border border-green-200 mb-6 cursor-default">
                    <div className="flex items-center justify-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Enrolled - Continue Learning</span>
                    </div>
                  </button>
                )}

                {/* Course Features */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">
                    This course includes:
                  </h4>
                  <ul className="space-y-3">
                    {courseFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* End Sidebar */}
          </div>
        </div>
      </div>
    </div>
  );
}
